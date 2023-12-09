import { load } from 'cheerio';
import { Result } from '@sigrist.dev/result';

/**
 * @param {URL} url
 * @returns {Promise<import('./nodes.js').Crawl>}
 */
export async function crawl(url) {
	// A set of full urls that have already been visited
	const visited = new Set();
	const queue = [url];

	/** @type {import('./nodes').PageNode[]} */
	const pages = [];

	/** @type {Set<import('./nodes').ExternalNode>} */
	const externalLinks = new Set();

	/**
	 * A list of directed edges between hrefs
	 *
	 * @type {import('./nodes').Edge[]}
	 */
	const edges = [];

	while (queue.length > 0) {
		const url = queue.shift();
		if (!url) {
			continue;
		}

		const href = getCanonicalHref(url);
		if (visited.has(href)) {
			continue;
		}

		const result = await getPage(url);
		visited.add(href);
		pages.push({
			type: 'page',
			status: 'ok',
			url: href
		});

		if (!result.ok) {
			console.log(`Skipping ${url.href} because ${result.error}`);
			continue;
		}

		const page = result.value;

		// Add edges from this page to all the internal links
		for (const internalLink of page.internalLinks) {
			const internalHref = getCanonicalHref(internalLink);
			if (href === internalHref) continue; // Skip self links
			edges.push({
				from: href,
				to: internalHref,
				type: 'link'
			});
		}

		queue.push(...page.internalLinks);
	}

	/** @type {import('./nodes').Node[]} */
	const nodes = [...pages, ...externalLinks];

	return {
		nodes,
		edges
	};
}

/**
 * @param {URL} url
 * @returns {Promise<
 * 	Result<
 * 		{ url: URL; internalLinks: URL[]; externalLinks: URL[]; nonHttpLinks: URL[] },
 * 		{ badResponse: Response; notHTML: undefined }
 * 	>
 * >}
 */
async function getPage(url) {
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

		const linkUrl = new URL(hrefAttribute.value, url);

		// Skip links that are not http(s)
		if (!linkUrl.protocol.startsWith('http')) {
			nonHttpLinks.push(linkUrl);
			continue;
		}

		// Skip links that are not on the same host
		if (linkUrl.host !== url.host) {
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
 * @returns {string}
 */
function getCanonicalHref(url) {
	const canonicalUrl = new URL(url);
	canonicalUrl.hash = '';
	canonicalUrl.search = '';
	return canonicalUrl.href;
}
