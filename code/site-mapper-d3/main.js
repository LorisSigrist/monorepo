import './styles.css';
import * as d3 from 'd3';
import data from './hohenegg.json';

/** @type {import('../site-mapper/src/crawl').Crawl} */
const crawlData = data;

const app = document.getElementById('app');

// Specify the dimensions of the chart.
const width = window.innerWidth;
const height = window.innerHeight;

// Specify the color scale.
const color = d3.scaleOrdinal(d3.schemeCategory10);

// The force simulation mutates links and nodes, so create a copy
// so that re-evaluating this cell produces the same result.
const links = crawlData.edges.map((d) => ({
	source: d.from,
	target: d.to,
	value: { link: 1, nav: 0.1, external: 0.2 }[d.type]
}));

const nodes = crawlData.nodes.map((d) => {
	return {
		id: d.url,
		group: d.type,
		backlinks: links.filter((l) => l.target === d.url).length
	};
});

// Create a simulation with sevseral forces.
const simulation = d3
	.forceSimulation(nodes)
	.force(
		'link',
		d3
			.forceLink(links)
			.id((node) => node.id)
			.distance(200)
	)
	.force(
		'charge',
		d3.forceManyBody().strength((node) => (node.group === 'page' ? -40 : -10))
	)
	.force(
		'collide',
		d3
			.forceCollide()
			.radius((node) => ({ page: 15, external: 4 })[node.group] + Math.sqrt(node.backlinks))
	)
	.force('center', d3.forceCenter(width / 2, height / 2).strength(1))
	.alphaDecay(0.01)
	.on('tick', ticked);

// Create the SVG container.
const svg = d3
	.create('svg')
	.attr('width', width)
	.attr('height', height)
	.attr('viewBox', [0, 0, width, height])
	.attr('style', 'max-width: 100%; height: auto;');

// Add a line for each link, and a circle for each node.
const link = svg
	.append('g')
	.attr('stroke', '#999')
	.attr('stroke-opacity', 0.1)
	.selectAll()
	.data(links)
	.join('line')
	.attr('stroke-width', (d) => Math.sqrt(d.value));

const node = svg
	.append('g')
	.attr('stroke', '#fff')
	.attr('stroke-width', 1.5)
	.selectAll()
	.data(nodes)
	.join('circle')

	//increase radius for pages with more backlinks at a decreasing rate
	.attr('r', (d) => Math.sqrt(Math.sqrt(d.backlinks)) + 2)
	.attr('fill', (d) => color(d.group));

node.append('title').text((d) => d.id);

// Add a drag behavior.
node.call(d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended));

// Set the position attributes of links and nodes each time the simulation ticks.
function ticked() {
	link
		.attr('x1', (d) => d.source.x)
		.attr('y1', (d) => d.source.y)
		.attr('x2', (d) => d.target.x)
		.attr('y2', (d) => d.target.y);

	node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
}

// Reheat the simulation when drag starts, and fix the subject position.
function dragstarted(event) {
	if (!event.active) simulation.alphaTarget(0.3).restart();
	event.subject.fx = event.subject.x;
	event.subject.fy = event.subject.y;
}

// Update the subject (dragged node) position during drag.
function dragged(event) {
	event.subject.fx = event.x;
	event.subject.fy = event.y;
}

// Restore the target alpha so the simulation cools after dragging ends.
// Unfix the subject position now that it’s no longer being dragged.
function dragended(event) {
	if (!event.active) simulation.alphaTarget(0);
	event.subject.fx = null;
	event.subject.fy = null;
}

app?.appendChild(svg.node());
