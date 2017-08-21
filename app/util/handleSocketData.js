import ansiHTML from 'ansi-html';
import _ from 'lodash/fp';
import { getAssetsData } from './stat-utils';
import buildHierarchy from './buildHierarchy';
import { formatModules, getTotalModuleSize } from '../util/format-modules';
import {
  formatMinModules,
  getTotalMinModuleSize,
} from '../util/format-min-modules';
import {
  formatAssets,
  getTotalAssetSize,
  getAssetsFormat,
} from '../util/format-assets';
import { formatProblems } from '../util/format-problems';

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

export default function handleSocketData(prevState, data) {
  let state = prevState;
  data.forEach(d => {
    if (d.type === 'log') {
      state = {
        ...state,
        log: ansiHTML(d.value),
      };
    }

    if (d.type === 'sizes') {
      state = d.error
        ? {
            ...state,
            assetsLoading: false,
            modulesLoading: false,
            sizesError: d.value,
          }
        : {
            ...state,
            assetSizes: formatAssets(state.stats.data, d.value),
            moduleSizes: formatMinModules(d.value),
            assetsLoading: false,
            modulesLoading: false,
            totalAssetMinSizes: getTotalAssetSize(
              getAssetsFormat(state.stats, d.value)
            ),
            totalModuleMinSizes: getTotalMinModuleSize(d.value),
            sizesError: false,
          };
    }

    if (d.type === 'problems') {
      if (d.error) {
        state = {
          ...state,
          problems: null,
          problemsLoading: false,
          problemsError: d.value,
        };
      } else {
        let result;
        const grouped = (result = _.flow(
          _.groupBy('path'),
          _.mapValues(
            _.reduce((acc, bundle) => Object.assign({}, acc, bundle), {})
          ),
          _.mapValues(bundle => formatProblems(bundle))
        )(d.value));

        result = Object.keys(grouped)
          .map(r => {
            const formatted = ansiHTML(grouped[r]);
            return `${r}

  ${formatted}

  `;
          })
          .join('');

        state = {
          ...state,
          problems: result,
          problemsLoading: false,
          problemsError: false,
        };
      }
    }

    if (d.type === 'status') {
      if (d.value === 'Compiling') {
        state = {
          ...state,
          assets: null,
          modules: null,
          problems: null,
          modulesLoading: true,
          assetsLoading: true,
          problemsLoading: true,
          totalAssetSizes: null,
          totalModuleSizes: null,
          totalAssetMinSizes: null,
          totalModuleMinSizes: null,
        };
      }
      state = {
        ...state,
        status: d.value,
      };
    }

    if (d.type === 'operations') {
      state = {
        ...state,
        operations: d.value,
      };
    }

    if (d.type === 'progress') {
      state = {
        ...state,
        progress: d.value,
      };
    }

    if (d.type === 'stats') {
      state = {
        ...state,
        assets: formatAssets(d.value.data),
        chartAssets: getAssetsData(d.value.data.assets, d.value.data.chunks),
        chartData: buildHierarchy(d.value.data.modules),
        stats: d.value,
        modules: formatModules(d.value.data),
        status: 'idle',
        totalAssetSizes: getTotalAssetSize(d.value.data.assets),
        totalModuleSizes: getTotalModuleSize(d.value.data.modules),
      };
    }
  });
  return state;
}
