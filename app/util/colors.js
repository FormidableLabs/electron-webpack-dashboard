import * as d3 from 'd3';

export function getColor(obj, showRoot) {
  let colors;
  const d = obj;

  if (!d.parent) {
    colors = d3.scaleOrdinal(d3.schemeCategory20);
    d.color = showRoot ? colors(-1) : 'transparent';
  } else if (d.data.name === 'node_modules') {
    colors = d3.scaleOrdinal(d3.schemeCategory20);
  } else if (d.children) {
    const startColor = d3.hcl(d.color).darker();
    const endColor = d3.hcl(d.color).brighter();

    colors = d3
      .scaleLinear()
      .interpolate(d3.interpolateHcl)
      .range([startColor.toString(), endColor.toString()])
      .domain([0, d.children.length + 1]);
  }

  if (d.children) {
    d.children
      .map((child, i) => ({ value: child.value, idx: i }))
      .sort((a, b) => b.value - a.value)
      .forEach((child, i) => {
        d.children[child.idx].color = colors(i);
      });
  }

  return d.color;
}
