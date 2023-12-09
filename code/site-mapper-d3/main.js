import './styles.css';
import * as d3 from 'd3';
import data from './data/inlang.json';

const app = document.getElementById('app');

// Specify the dimensions of the chart.
const width = window.innerWidth;
const height = window.innerHeight;

// Specify the color scale.
const color = d3.scaleOrdinal(d3.schemeCategory10);

// The force simulation mutates links and nodes, so create a copy
// so that re-evaluating this cell produces the same result.
const links = data.edges.map((d) => ({ source: d[0], target: d[1], value: 1 }));
const nodes = data.pages.map((d) => {
	console.log(d);
	return { id: d, group: d.includes('n') ? '1' : '2' };
});

// Create a simulation with sevseral forces.
const simulation = d3
	.forceSimulation(nodes)
	.force(
		'link',
		d3
			.forceLink(links)
			.id((d) => d.id)
			.distance(150)
	)
	.force('charge', d3.forceManyBody().strength(30))
	.force('collide', d3.forceCollide().radius(15))
	.force('center', d3.forceCenter(width / 2, height / 2))
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
	.attr('r', 5)
	.attr('fill', (d) => color(d.group));

node.append('title').text((d) => d.id);

// Add a drag behavior.
node.call(d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended));

const div = d3.select('body').append('div').attr('class', 'tooltip').style('opacity', 0);

//Add click behavior
node.on('mouseover', function (d) {
	div.transition().duration(200).style('opacity', 0.9);
	div
		.html(d.id + '<br/>' + d.close)
		.style('left', d3.event.pageX + 'px')
		.style('top', d3.event.pageY - 28 + 'px');
});

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
