import { crawl } from './crawl.js';
import fs from 'fs/promises';

const url = new URL('https://finasaagency.com/onlyfans-wiki');
const crawlData = await crawl(url);

console.info(`Crawled ${crawlData.nodes.length} pages`);
console.info(`Found ${crawlData.edges.length} edges`);

await fs.writeFile('./data.json', JSON.stringify(crawlData, null, 2));
