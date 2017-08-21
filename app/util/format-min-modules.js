'use strict';

const path = require('path');
const _ = require('lodash/fp');
const filesize = require('filesize');

const PERCENT_MULTIPLIER = 100;
const PERCENT_PRECISION = 3;
const SCOPED_PACKAGE_INDEX = 2;

function formatModulePercentage(module, pseudoBundleSize) {
  const moduleSize = _.get('size.minGz')(module);

  if (!moduleSize || !pseudoBundleSize) {
    return '--';
  }
  return (moduleSize / pseudoBundleSize * PERCENT_MULTIPLIER).toPrecision(
    PERCENT_PRECISION
  );
}

function getModuleName(module) {
  const nameReg = /node_modules\/(@.\w*\/{1}.\w*|\w*).*$/;
  const matches = nameReg.exec(module.baseName);
  if (matches) {
    return matches[1];
  }
  return '<self>';
}

function groupModules(bundle) {
  return _.flow(
    _.filter(module => module.type === 'code'),
    _.filter(module => module.baseName.indexOf('external "') === -1),
    _.groupBy(getModuleName),
    _.toPairs,
    _.map(moduleGroupPairs => {
      const moduleGroup = _.zipObject(
        ['baseName', 'children'],
        moduleGroupPairs
      );

      return Object.assign({}, moduleGroup, {
        size: {
          minGz: moduleGroup.children.reduce(
            (acc, module) => acc + module.size.minGz,
            0
          ),
        },
      });
    }),
    _.orderBy(_.get('size.minGz'), 'desc')
  )(bundle.metrics.sizes);
}

const getPseudoBundleSize = _.flow(
  groupModules,
  _.mapValues(group =>
    group.children.reduce((total, module) => total + module.size.minGz, 0)
  ),
  _.values,
  _.reduce((total, groupSize) => total + groupSize, 0)
);

export function getTotalMinModuleSize(sizes) {
  let size = 0;

  const bundles = _.flow(
    _.groupBy('path'),
    _.mapValues(_.reduce((acc, bundle) => Object.assign({}, acc, bundle), {}))
  )(sizes);

  Object.keys(bundles).forEach(bundle => {
    groupModules(bundles[bundle]).forEach(moduleGroup => {
      size += moduleGroup.size.minGz;
    });
  });

  return filesize(size);
}

export function formatMinModules(sizes) {
  const bundles = _.flow(
    _.groupBy('path'),
    _.mapValues(_.reduce((acc, bundle) => Object.assign({}, acc, bundle), {}))
  )(sizes);

  Object.keys(bundles).forEach(bundle => {
    bundles[bundle] = groupModules(bundles[bundle]).map(moduleGroup => [
      moduleGroup.baseName,
      filesize(moduleGroup.size.minGz),
      formatModulePercentage(moduleGroup, getPseudoBundleSize(bundles[bundle])),
    ]);
  });

  return bundles;
}
