/**
 *
 * @param paths
 * @param passThroughPaths
 * @param keep
 * @returns {Object}
 */
function prunePaths(paths, passThroughPaths, keep) {
  const replacement = {};

  for (let i = 0; i < passThroughPaths.length; i++) {
    // eslint-disable-next-line prefer-const
    let [path, ...methods] = passThroughPaths[i].split(' ').reverse();

    if (methods.length) {
      methods = methods.map(x => x.toLowerCase());

      methods.forEach(m => {
        if (keep && replacement[path]) {
          replacement[path][m] = paths[path][m];
        } else if (keep) {
          replacement[path] = replacement[path] || {};
          replacement[path][m] = paths[path][m];
        } else {
          delete paths[path][m];
        }
      });
    } else if (keep) {
      replacement[path] = paths[path];
    } else {
      delete paths[path];
    }
  }

  return keep ? replacement : paths;
}

module.exports = prunePaths;
