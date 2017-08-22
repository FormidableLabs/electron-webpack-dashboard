const filesize = require('filesize');
const path = require('path');

export function getTotalModuleSize(modules) {
  return filesize(modules.reduce((total, module) => total + module.size, 0));
}

function getPosition(string, needle, i) {
  return string.split(needle, i).join(needle).length;
}

function getModulePath(identifier) {
  const loaderRegex = /.*!/;
  return identifier.replace(loaderRegex, '');
}

// eslint-disable-next-line max-statements
function printDependencySizeTree(node, depth, outputFn) {
  const childrenBySize = node.children.sort((a, b) => b.size - a.size);

  const totalSize = node.size;
  let remainder = totalSize;

  let prefix = '';
  for (let i = 0; i < depth; i++) {
    prefix += '';
  }

  for (const child of childrenBySize) {
    const percentage = (child.size / totalSize * 100).toPrecision(3);
    outputFn([
      `${prefix + child.packageName}`,
      prefix + filesize(child.size),
      percentage,
    ]);

    remainder -= child.size;

    if (remainder < 0.01 * totalSize) {
      break;
    }
  }

  if (depth === 0 || remainder !== totalSize) {
    const percentage = (remainder / totalSize * 100).toPrecision(3);
    outputFn([
      `${prefix}<self>`,
      prefix + filesize(remainder),
      `${prefix + percentage}%`,
    ]);
  }
}

function printTrees(trees) {
  const output = [];
  trees.forEach(tree => {
    printDependencySizeTree(tree, 0, data => {
      output.push(data);
    });
  });
  return output;
}

function bundleSizeTree(stats) {
  const statsTree = {
    packageName: '<root>',
    packageVersion: '',
    size: 0,
    children: [],
  };

  if (stats.name) {
    statsTree.bundleName = stats.name;
  }

  const modules = stats.modules.map(mod => ({
    path: getModulePath(mod.identifier),
    size: mod.size,
  }));

  modules.sort((a, b) => {
    if (a === b) {
      return 0;
    }
    return a < b ? -1 : 1;
  });

  modules.forEach(mod => {
    const packages = mod.path.split(
      new RegExp(`\\${path.sep}node_modules\\${path.sep}`)
    );
    if (packages.length > 1) {
      const lastSegment = packages.pop();

      let lastPackageName = '';
      if (lastSegment.indexOf('@')) {
        lastPackageName = lastSegment.slice(
          0,
          lastSegment.search(new RegExp(`\\${path.sep}|$`))
        );
      } else {
        lastPackageName = lastSegment.slice(
          0,
          getPosition(lastSegment, path.sep, 2)
        );
      }

      packages.push(lastPackageName);
    }
    packages.shift();

    let parent = statsTree;
    parent.size += mod.size;
    packages.forEach(pkg => {
      const existing = parent.children.filter(
        child => child.packageName === pkg
      );
      let packageVersion = '';
      if (existing.length > 0) {
        existing[0].size += mod.size;
        parent = existing[0];
      } else {
        try {
          packageVersion = '';
        } catch (err) {
          packageVersion = '';
        }
        const newChild = {
          packageName: pkg,
          packageVersion,
          size: mod.size,
          children: [],
        };
        parent.children.push(newChild);
        parent = newChild;
      }
    });
  });

  return statsTree;
}

export function formatModules(data) {
  let trees;
  if (!data.hasOwnProperty('modules')) {
    trees = data.children.map(bundleSizeTree);
  } else {
    trees = [bundleSizeTree(data)];
  }
  return printTrees(trees);
}
