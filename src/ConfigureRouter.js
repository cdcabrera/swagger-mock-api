import Routes from 'routes';
import MockData from './MockData';

function correctPath(path) {
  let uri = path.replace(/^\/?|\/?$/, '');
  let segments = uri.split('/');

  return '/' +
    segments
    .map(s => {
      let segment = s;
      if (segment.charAt(0) === '{' && segment.charAt(segment.length - 1) === '}') {
        segment = segment.slice(1, -1);
        segment = segment.replace(/(\-|\?|\*)/g, ''); //remove wildcards
        return ':' + segment;
      }

      return segment;
    })
    .join('/');
}

// wrapped MockData to satisfy eslint's no funciton definitions inside of loops
function mock(schema, configMock) {
  return MockData(schema, configMock);
}

function generateResponse(responseCode, generateBody) {
  return { statusCode: responseCode, body: generateBody() };
}

function generateResponseBuilder(potentialResponses, configMock) {
  let keys = Object.keys(potentialResponses);

  keys.sort(); //use 200 example

  for (const k of keys) {
    if (k === 'default') continue;

    let responseSchema = potentialResponses[k];
    let responseCode = parseInt(k, 10);
    if (responseCode > 199 && responseCode < 300) {
      return generateResponse.bind(null, responseCode, mock.bind(null, responseSchema, configMock));
    }
  }

  if (potentialResponses.default) {
    return generateResponse.bind(null, 200, mock.bind(null, potentialResponses.default, configMock));
  }
}

export default function ConfigureRouter(paths, configMock) {
  let router = new Routes();

  for (let pk in paths) {
    if (!paths.hasOwnProperty(pk)) continue;

    let path = paths[pk];
    let route = correctPath(pk);

    for (let mk in path) {
      if (!path.hasOwnProperty(mk) || mk == "parameters") {
        continue;
      }

      let method = path[mk];

      if (process.env.debug) {
        console.log('ADDING ROUTE: ', mk.toUpperCase() + ' ' + pk);
      }

      let builder = generateResponseBuilder(method.responses, configMock);
      router.addRoute('/' + mk + route, builder);
    }
  }

  return router;
}
