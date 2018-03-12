const Routes = require('routes');
const mockData = require('./mockData');

/**
 *
 * @param path
 * @returns {string}
 */
function correctPath(path) {
  const uri = path.replace(/^\/?|\/?$/, '');
  const segments = uri.split('/');

  return (
    '/' +
    segments
      .map(segment => {
        if (
          segment.charAt(0) === '{' &&
          segment.charAt(segment.length - 1) === '}'
        ) {
          return `:${segment.slice(1, -1)}`;
        }

        return segment;
      })
      .join('/')
  );
}

/**
 *
 * @param potentialResponses
 * @returns {function}
 */
function generateResponse(potentialResponses) {
  // eslint-disable-next-line prefer-const
  for (let key of Object.keys(potentialResponses)) {
    if (key === 'default') {
      continue;
    }

    const responseCode = parseInt(key, 10);

    if (responseCode > 199 && responseCode < 500) {
      return mockData.bind(null, potentialResponses[key]);
    }
  }

  if (potentialResponses.default) {
    return mockData.bind(null, potentialResponses.default);
  }
}

/**
 *
 * @param paths
 * @returns {Router}
 */
function configureRouter(paths) {
  const router = new Routes();

  // eslint-disable-next-line prefer-const
  for (let pk in paths) {
    if (!paths.hasOwnProperty(pk)) {
      continue;
    }

    const path = paths[pk];
    const route = correctPath(pk);

    // eslint-disable-next-line prefer-const
    for (let mk in path) {
      if (!path.hasOwnProperty(mk)) {
        continue;
      }

      if (process.env.debug) {
        console.log('ADDING ROUTE: ', `${mk.toUpperCase()} ${pk}`);
      }

      const tempResponse = generateResponse(path[mk].responses, pk);

      router.addRoute(`/${mk}${route}`, tempResponse);
    }
  }

  return router;
}

module.exports = configureRouter;
