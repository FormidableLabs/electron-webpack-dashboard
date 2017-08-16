import ansiHTML from 'ansi-html';
import { getAssetsData } from './stat-utils';
import buildHierarchy from './buildHierarchy';

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

export default function handleSocketData(data, effects) {
  let state = {};
  data.forEach(d => {
    if (d.type === 'log') {
      state = {
        ...state,
        log: ansiHTML(d.value),
      };
    }

    if (d.type === 'sizes') {
      state = {
        ...state,
        sizes: d.value,
        assetsLoading: false,
      };
    }

    if (d.type === 'problems') {
      state = {
        ...state,
        problems: d.value,
        problemsLoading: false,
      };
    }

    if (d.type === 'status') {
      if (d.value === 'Invalidated') {
        state = {
          ...state,
          modulesLoading: true,
          assetsLoading: true,
          problemsLoading: true,
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
        assets: getAssetsData(d.value.data.assets, d.value.data.chunks),
        chartData: buildHierarchy(d.value.data.modules),
        stats: d.value,
        status: 'idle',
        modulesLoading: false,
      };
    }
  });
  return state;
}
