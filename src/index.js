const url = require('url');
const fs = require('fs');
const parser = require('swagger-parser');
const configureRouter = require('./configureRouter');
const prunePaths = require('./prunePaths');

/**
 * Initialize API.
 */
class MockApi {
  constructor(config) {
    this.config = Object.assign(
      {
        swaggerFile: null,
        watch: true,
        ignorePaths: null,
        mockRoutes: null
      },
      config
    );

    if (!this.config.swaggerFile) {
      throw new Error(`Config is missing 'swaggerFile' parameter`);
    }

    if (this.config.ignorePaths && this.config.mockRoutes) {
      throw new Error(
        'Cannot specify both ignorePaths and mockPaths in config'
      );
    }

    return this.start();
  }

  /**
   * Start the API.
   */
  start() {
    const swaggerFile = this.config.swaggerFile;
    const watch = this.config.watch;
    const ignorePaths = this.config.ignorePaths;
    const mockRoutes = this.config.mockRoutes;
    let basePath;
    let router;

    const dereference = callback => {
      parser.dereference(swaggerFile, (err, api) => {
        if (err) {
          throw err;
        }

        [basePath, router] = this.constructor.init(
          api,
          ignorePaths,
          mockRoutes
        );

        if (callback) {
          callback.call(this);
        }
      });
    };

    const parserPromise = new Promise(resolve => dereference(resolve));

    if (watch) {
      fs.watchFile(swaggerFile, () => dereference());
    }

    return function(req, res, next) {
      parserPromise.then(() => {
        const method = req.method.toLowerCase();
        let path = url.parse(req.url).pathname.replace(`${basePath}/`, '');
        let matchingRoute;
        let response;

        if (path.charAt(0) !== '/') {
          path = `/${path}`;
        }

        // eslint-disable-next-line prefer-const
        matchingRoute = router.match(`/${method}${path}`);

        if (!matchingRoute) {
          return next();
        }

        if (process.env.debug) {
          console.log(`Request: ${req.method} ${path}`);
        }

        try {
          response = matchingRoute.fn();

          res.setHeader('Content-Type', 'application/json');
          res.write(response !== null ? JSON.stringify(response) : '');
        } catch (e) {
          res.statusCode = 500;
          res.write(JSON.stringify({ message: e.message }, null, 4));
        }

        res.end();
      });
    };
  }

  /**
   * Process ignored paths and mocked routes/paths.
   *
   * @param api
   * @param ignorePaths
   * @param mockRoutes
   * @returns {*} values forming [basePath, router]
   */
  static init(api, ignorePaths, mockRoutes) {
    if (ignorePaths) {
      api.paths = prunePaths(api.paths, ignorePaths);
    } else if (mockRoutes) {
      api.paths = prunePaths(api.paths, mockRoutes, true);
    }

    return [api.basePath || '', configureRouter(api.paths)];
  }
}

module.exports = config => new MockApi(config);
