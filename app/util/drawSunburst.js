import * as d3 from 'd3';
import { getColor } from './colors';
import { markDuplicates, getAllChildren } from './partitionedDataUtils';
import formatSize from './formatSize';

export const drawSunburst = function (data) {
  const width = 1000;
  const height = 1000;
  const radius = Math.min(width, height) / 2;
  const FADE_OPACITY = 0.5;

  const x = d3.scaleLinear().range([0, 2 * Math.PI]);
  const y = d3.scaleSqrt().range([0, radius]);

  const partition = d3.partition();

  const arc = d3
    .arc()
    .startAngle(d => Math.max(0, Math.min(2 * Math.PI, x(d.x0))))
    .endAngle(d => Math.max(0, Math.min(2 * Math.PI, x(d.x1))))
    .innerRadius(d => Math.max(0, y(d.y0)))
    .outerRadius(d => Math.max(0, y(d.y1)));

  d3.select('#viz').selectAll('svg').remove();
  d3.select('#d3-tooltip').style('visibility', 'hidden');

  const svg = d3
    .select('#viz')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('style', 'height: 100%; width: 100%;')
    .attr('viewBox', '0 0 1000 1000')
    .append('g')
    .attr('id', 'group')
    .attr('transform', `translate(${width / 2},${height / 2})`);

  const root = d3
    .hierarchy(data)
    .sum(d => (d.children ? 0 : d.size))
    .sort((a, b) => b.value - a.value);

  const nodes = partition(root).descendants().filter(d => d.x1 - d.x0 > 0.005);

  markDuplicates(nodes);

  const paths = svg
    .selectAll('path')
    .data(nodes)
    .enter()
    .append('path')
    .attr('d', arc)
    .style('fill', d => getColor(d))
    .style('stroke-width', '2')
    .style('stroke', 'white')
    .text(d => d);

  const click = function (d) {
    svg
      .transition()
      .duration(750)
      .tween('scale', () => {
        const xd = d3.interpolate(x.domain(), [d.x0, d.x1]);
        const yd = d3.interpolate(y.domain(), [d.y0, 1]);
        const yr = d3.interpolate(y.range(), [d.y0 ? 100 : 0, radius]);
        return t => {
          x.domain(xd(t));
          y.domain(yd(t)).range(yr(t));
        };
      })
      .selectAll('path')
      .attrTween('d', e => () => arc(e));
    d3.select('#d3-tooltip').style('visibility', 'hidden');
  };

  const mouseover = function (object) {
    const childrenArray = getAllChildren(object);
    svg
      .selectAll('path')
      .style('opacity', FADE_OPACITY)
      .style('stroke-width', FADE_OPACITY);

    svg
      .selectAll('path')
      .filter(node => childrenArray.indexOf(node) >= 0)
      .style('opacity', 1)
      .style('stroke-width', 2);

    const percentage = (100 *
      object.value /
      paths.node().__data__.value).toFixed(1); // eslint-disable-line no-underscore-dangle
    let percentageString = `${percentage}%`;
    if (percentage < 0.1) {
      percentageString = '< 0.1%';
    }

    const tooltipText = `${object.data.name} - ${formatSize(
      object.value
    )} (${percentageString})`;

    d3.select('#d3-tooltip-text').text(tooltipText);
    d3.select('#d3-tooltip').style('visibility', '');
  };

  const mouseleave = function () {
    paths.style('opacity', 1).style('stroke-width', 2);
    d3.select('#d3-tooltip').style('visibility', 'hidden');
  };

  d3.select('#group').on('mouseleave', object => {
    mouseleave(object);
  });

  paths
    .on('click', click)
    .on('mouseover', mouseover);

  d3.select(self.frameElement).style('height', `${height}px`);
}
