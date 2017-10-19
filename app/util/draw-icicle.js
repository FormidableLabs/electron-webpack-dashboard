import * as d3 from 'd3';
import { getColor } from './colors';
import { markDuplicates, getAllChildren } from './partitioned-data-utils';

export const drawIcicle = function (data) {
  const width = 960;
  const height = 500;
  const FADE_OPACITY = 0.5;

  const x = d3.scaleLinear().range([0, width]);

  const y = d3.scaleLinear().range([0, height]);

  const partition = d3.partition().size([width, height]).padding(0).round(true);

  d3.select('#viz').selectAll('svg').remove();

  const svg = d3
    .select('#viz')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('style', 'height: 100%; width: 100%;')
    .attr('viewBox', '0 0 960 500');

  const root = d3
    .hierarchy(data)
    .sum(d => (d.children ? 0 : d.size))
    .sort((a, b) => b.value - a.value);

  const nodes = partition(root).descendants().filter(d => d.x1 - d.x0 > 0.005);

  markDuplicates(nodes);

  const paths = svg
    .selectAll('.node')
    .data(nodes)
    .enter()
    .append('rect')
    .attr('class', 'node')
    .attr('x', d => d.x0)
    .attr('y', d => d.y0)
    .attr('width', d => d.x1 - d.x0)
    .attr('height', d => d.y1 - d.y0)
    .style('fill', d => getColor(d, true));

  const click = function (d) {
    x.domain([d.x0, d.x1]);
    y.domain([d.y0, height]).range([d.depth ? 20 : 0, height]);

    paths
      .transition()
      .duration(750)
      .attr('x', a => x(a.x0))
      .attr('y', a => y(a.y0))
      .attr('width', a => x(a.x1) - x(a.x0))
      .attr('height', a => y(a.y1) - y(a.y0));
  };


  const mouseover = function (object) {
    const childrenArray = getAllChildren(object);
    svg
      .selectAll('rect')
      .style('opacity', FADE_OPACITY)
      .style('stroke-width', 0);

    svg
      .selectAll('rect')
      .filter(node => childrenArray.indexOf(node) >= 0)
      .style('opacity', 1)
      .style('stroke-width', 1);
  };

  paths
    .on('click', click)
    .on('mouseover', mouseover);

  const mouseleave = function () {
    paths.style('opacity', 1).style('stroke-width', 0);
  };

  d3.select('#group').on('mouseleave', object => {
    mouseleave(object);
  });

  d3.select(self.frameElement).style('height', `${height}px`);
}
