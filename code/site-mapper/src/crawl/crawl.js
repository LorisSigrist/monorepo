import { load } from 'cheerio';
import { Result } from '@sigrist.dev/result';

/**
 * @param {URL} entryUrl
 * @returns {Promise<import('../crawl.js').Crawl>}
 */
export async function crawl(entryUrl) {
	entryUrl = getCanonicalURL(entryUrl);
	// A set of full urls that have already been visited
	const visited = new Set();

	// A queue of urls to visits
	const queue = new Set([entryUrl]);

	/** @type {import('../crawl.js').PageNode[]} */
	const pages = [];

	// A set of external urls that have already been seen
	const externalSeen = new Set();

	/** @type {Set<import('../crawl.js').ExternalNode>} */
	const externalLinks = new Set();

	/**
	 * A list of directed edges between hrefs
	 *
	 * @type {import('../crawl.js').Edge[]}
	 */
	const edges = [];

	while (queue.size > 0) {
		const url = queue.values().next().value;
		if (!url) {
			continue;
		}
		queue.delete(url);

		const href = getCanonicalURL(url).href;
		if (visited.has(href)) {
			continue;
		}

		const result = await getPage(url, entryUrl);
		visited.add(href);
		pages.push({
			type: 'page',
			status: 'ok',
			url: href
		});

		if (!result.ok) {
			switch (result.error) {
				case 'notHTML': {
					break;
				}
				case 'badResponse': {
					break;
				}
			}
			continue;
		}

		const page = result.value;

		// Add edges from this page to all the internal links
		for (const internalLink of page.internalLinks) {
			const internalHref = getCanonicalURL(internalLink).href;
			if (href === internalHref) continue; // Skip self links
			edges.push({
				from: href,
				to: internalHref,
				type: 'link'
			});
		}

		for (const externalLink of page.externalLinks) {
			const externalHref = getCanonicalURL(externalLink).href;
			if (href === externalHref) continue; // Skip self links

			// Add edges from this page to all the external links
			edges.push({
				from: href,
				to: externalHref,
				type: 'external'
			});

			if (!externalSeen.has(externalHref)) {
				// Add external links to the set of external links
				externalLinks.add({
					type: 'external',
					url: externalHref
				});
				externalSeen.add(externalHref);
			}
		}

		page.internalLinks = page.internalLinks.filter((link) => !visited.has(link.href));
		page.internalLinks.forEach((link) => queue.add(link));
		console.log(`Crawled ${pages.length} pages - ${queue.size} in queue`);
	}

	/** @type {import('../crawl.js').Node[]} */
	const nodes = [...pages, ...externalLinks];

	return {
		entry: entryUrl.href,
		nodes,
		edges
	};
}

/**
 * @param {URL} url
 * @param {URL} entryUrl
 * @returns {Promise<
 * 	Result<
 * 		{ url: URL; internalLinks: URL[]; externalLinks: URL[]; nonHttpLinks: URL[] },
 * 		{ badResponse: Response; notHTML: undefined }
 * 	>
 * >}
 */
async function getPage(url, entryUrl) {
	const response = await fetch(url);
	if (!response.ok) {
		return Result.bad('badResponse', response);
	}

	//if the response is not html then we cannot parse it
	const contentType = response.headers.get('content-type');
	if (!contentType || !contentType.includes('text/html')) {
		return Result.bad('notHTML', undefined);
	}

	const html = await response.text();

	//Get all the links from the page
	const $ = load(html);
	const linkElements = $('a');

	const internalLinks = [];
	const externalLinks = [];
	const nonHttpLinks = [];

	for (const linkElement of linkElements) {
		const hrefAttribute = linkElement.attributes.find((attr) => attr.name === 'href');
		if (!hrefAttribute) continue;

		const linkUrl = getCanonicalURL(new URL(hrefAttribute.value, url));

		// Skip links that are not http(s)
		if (!linkUrl.protocol.startsWith('http')) {
			nonHttpLinks.push(linkUrl);
			continue;
		}

		// Skip links that are not children of the entry url
		if (!linkUrl.href.startsWith(entryUrl.href)) {
			externalLinks.push(linkUrl);
			continue;
		}

		internalLinks.push(linkUrl);
	}

	return Result.ok({
		url,
		internalLinks,
		externalLinks,
		nonHttpLinks
	});
}

/**
 * Returns the canonical href for a given url
 *
 * - Protocol is included
 * - Host is included
 * - Path is included
 * - Hash is removed
 * - Search is removed
 *
 * @param {URL} url
 * @returns {URL}
 */
function getCanonicalURL(url) {
	const canonicalUrl = new URL(url);
	canonicalUrl.hash = '';
	canonicalUrl.search = '';

	//if it's an apex domain then, replace it with the www subdomain
	if (canonicalUrl.host.split('.').length === 2) {
		canonicalUrl.host = `www.${canonicalUrl.host}`;
	}

	return canonicalUrl;
}
