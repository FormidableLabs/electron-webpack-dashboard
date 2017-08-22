import ansiHTML from 'ansi-html';
import _ from 'lodash/fp';
import chalk from 'chalk';

import formatDuplicates from './format-duplicates';
import formatVersions from './format-versions';

ansiHTML.setColors({
  reset: ['fff', '1d212d'],
  black: 'fff',
  red: 'f36666',
  green: '00f2ff',
  yellow: '00f2ff',
  blue: '00bdff',
  magenta: 'f47eff',
  cyan: '00f2ff',
  lightgrey: '888',
  darkgrey: '777',
});

export function formatProblems(bundle) {
  const duplicates = formatDuplicates(bundle.duplicates);
  const versions = formatVersions(bundle.versions);
  if (!duplicates && !versions) {
    return chalk.green('No problems detected!\n');
  }
  if (duplicates && !versions) {
    return `${chalk.green('No version skews!\n')}\n${duplicates}`;
  }
  if (!duplicates && versions) {
    return `${chalk.green('No duplicate files!')}\n${versions}`;
  }
  return `${duplicates}\n${versions}`;
}

export function formatBundleProblems(value) {
  const grouped = _.flow(
    _.groupBy('path'),
    _.mapValues(_.reduce((acc, bundle) => Object.assign({}, acc, bundle), {})),
    _.mapValues(bundle => formatProblems(bundle))
  )(value);

  return Object.keys(grouped)
    .map(r => {
      const formatted = ansiHTML(grouped[r]);
      return `${r}

${formatted}

`;
    })
    .join('');
}
