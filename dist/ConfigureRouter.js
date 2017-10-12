'use strict';

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = ConfigureRouter;

var _routes = require('routes');

var _routes2 = _interopRequireDefault(_routes);

var _MockData = require('./MockData');

var _MockData2 = _interopRequireDefault(_MockData);

function correctPath(path) {
  var uri = path.replace(/^\/?|\/?$/, '');
  var segments = uri.split('/');

  return '/' + segments.map(function (s) {
    var segment = s;
    if (segment.charAt(0) === '{' && segment.charAt(segment.length - 1) === '}') {
      segment = segment.slice(1, -1);
      segment = segment.replace(/(\-|\?|\*)/g, ''); //remove wildcards
      return ':' + segment;
    }

    return segment;
  }).join('/');
}

// wrapped MockData to satisfy eslint's no funciton definitions inside of loops
function mock(schema, configMock) {
  return (0, _MockData2['default'])(schema, configMock);
}

function generateResponse(responseCode, generateBody) {
  return { statusCode: responseCode, body: generateBody() };
}

function generateResponseBuilder(potentialResponses, configMock) {
  var keys = _Object$keys(potentialResponses);

  keys.sort(); //use 200 example

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _getIterator(keys), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var k = _step.value;

      if (k === 'default') continue;

      var responseSchema = potentialResponses[k];
      var responseCode = parseInt(k, 10);
      if (responseCode > 199 && responseCode < 400) {
        return generateResponse.bind(null, responseCode, mock.bind(null, responseSchema, configMock));
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (potentialResponses['default']) {
    return generateResponse.bind(null, 200, mock.bind(null, potentialResponses['default'], configMock));
  }
}

function ConfigureRouter(paths, configMock) {
  var router = new _routes2['default']();

  for (var pk in paths) {
    if (!paths.hasOwnProperty(pk)) continue;

    var path = paths[pk];
    var route = correctPath(pk);

    for (var mk in path) {
      if (!path.hasOwnProperty(mk) || mk == "parameters") {
        continue;
      }

      var method = path[mk];

      if (process.env.debug) {
        console.log('ADDING ROUTE: ', mk.toUpperCase() + ' ' + pk);
      }

      var builder = generateResponseBuilder(method.responses, configMock);
      router.addRoute('/' + mk + route, builder);
    }
  }

  return router;
}

module.exports = exports['default'];