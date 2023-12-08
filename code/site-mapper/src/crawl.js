import { load } from 'cheerio';

/** @param {URL} url */
export async function crawl(url) {
	const visited = new Set();
	const queue = [url];

	const edges = new Map();

	const response = await fetch(url);
	const html = await response.text();

	//Get all the links from the page
	const $ = load(html);
	const links = $('a');

	for (const link of links) {
		const hrefAttribute = link.attributes.find((attr) => attr.name === 'href');
		if (!hrefAttribute) continue;
		const linkUrl = new URL(hrefAttribute.value, url);
		console.log(linkUrl.href);
	}
}
