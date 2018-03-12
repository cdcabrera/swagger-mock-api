const path = require('path');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerParser = require('swagger-parser');
const YAML = require('yamljs');
const mockApi = require('../src/index');

const app = express();
const router = express.Router();
const yamlFile = process.env.FILE || path.join(__dirname, './swagger.yaml');
const port = process.env.PORT || 8000;
const swaggerDoc = YAML.load(yamlFile);

const corsMiddleware = function(req, res, next) {
  const hasOrigin = req.headers.origin != null;
  const requestHeaders = req.headers['access-control-request-headers'];

  res.setHeader('Access-Control-Allow-Origin', hasOrigin ? req.headers.origin : '*');
  res.setHeader('Access-Control-Allow-Credentials', !hasOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD, OPTIONS, PATCH');

  if (requestHeaders != null) {
    res.setHeader('Access-Control-Allow-Headers', requestHeaders);
  }

  if (req.method === 'OPTIONS') {
    res.end();
  }

  next();
};

const middleware = function() {
  let middlewares = [];

  middlewares.push(corsMiddleware);

  middlewares.push(
    mockApi({
      swaggerFile: yamlFile,
      watch: true
    })
  );

  return middlewares;
};

router.use(middleware());

app.use('/docs/api', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use('/', router);

app.listen(port, function() {
  console.log(
    `\nYou can now view the API & docs in the browser.\n  Open: http://localhost:${port}\n  Open: http://localhost:${port}/docs/api\n`
  );

  swaggerParser.validate(yamlFile, err => {
    if (err) {
      console.error(`  \x1b[31m${err.name}\n  \x1b[31m${err.message}\x1b[0m\n`);
    }
  });
});
