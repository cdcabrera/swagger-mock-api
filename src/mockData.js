const Parser = require('./parsers/parser');

/**
 *
 * @param definition
 * @returns {*}
 */
function mockData(definition) {
  const schema = definition.schema || null;

  return schema ? new Parser().parse(schema) : schema;
}

module.exports = mockData;
