export const ERROR_CHUNK_MODULES =
  "Unfortunately, it looks like your stats don't include chunk-specific module data. See below for details.";

export const getAssetsData = function (assets, chunks) {
  const chunksMap = {};
  chunks.forEach(chunk => {
    chunksMap[chunk.id] = chunk;
  });

  return assets
    .filter(asset => asset.name.indexOf('.js') === asset.name.length - 3)
    .map(asset => {
      const chunkIndex = asset.chunks[0];

      return {
        ...asset,
        chunk: chunksMap[chunkIndex],
      };
    });
}

export const getBundleDetails = function ({ assets, selectedAssetIndex }) {
  if (selectedAssetIndex === 0) {
    if (assets.length === 1) {
      return {
        type: 'normal',
        assetName: assets[0].name,
        actual: assets[0].size,
        raw: assets.reduce(
          (total, thisAsset) => total + thisAsset.chunk.size,
          0
        ),
      };
    }
    return {
      type: 'collection',
      assetName: 'All Modules',
      actual: '',
      raw: '',
    };
  }
  const asset = assets[selectedAssetIndex - 1];

  return {
    type: 'normal',
    assetName: asset.name,
    actual: asset.size,
    raw: asset.chunk.size,
  };
}
