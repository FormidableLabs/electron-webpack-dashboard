const _ = require('lodash/fp');
const filesize = require('filesize');

export function getAssets(stats) {
  return stats.assets;
}

export function getAssetSize(asset) {
  return `${filesize(asset.size)}${(asset.minGz && ' (min+gz)') || ''}`;
}

export function getTotalAssetSize(assets) {
  return filesize(assets.reduce((total, asset) => total + asset.size, 0));
}

export function getAssetsFormat(data, bundles) {
  let tree;
  if (!data.data.hasOwnProperty('assets')) {
    tree = data.data.children.map(getAssets);
  } else {
    tree = [getAssets(data.data)];
  }
  return resolveAssets(tree, bundles);
}

export function resolveAssets(tree, bundles) {
  return _.flatMap(assets =>
    assets.filter(asset => asset.name.indexOf('hot-update') < 0).map(asset => {
      const realBundleMatch = _.find({ path: asset.name })(bundles);
      return realBundleMatch
        ? {
            name: realBundleMatch.path,
            size: realBundleMatch.metrics.meta.bundle.minGz,
            minGz: true,
          }
        : asset;
    })
  )(tree);
}

export function printAssets(tree, bundles) {
  const assets = resolveAssets(tree, bundles);

  return assets.map(asset => [asset.name, asset.size, getAssetSize(asset)]);
}

export function formatAssets(data, bundles) {
  let tree;
  if (!data.hasOwnProperty('assets')) {
    tree = data.children.map(getAssets);
  } else {
    tree = [getAssets(data)];
  }
  return printAssets(tree, bundles);
}
