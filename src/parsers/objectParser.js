/**
 * Create an object value.
 */
class ObjectParser {
  constructor(parser) {
    this.parser = parser;
  }

  canParse(node) {
    return !!node.properties;
  }

  parse(node) {
    return this.generateObject(node);
  }

  generateObject(node) {
    const ret = {};
    let schema = Object.assign({}, node);

    schema = schema.properties || schema;

    // eslint-disable-next-line prefer-const
    for (let key of Object.keys(schema)) {
      ret[key] = this.parser.parse(schema[key]);
    }

    return ret;
  }
}

module.exports = ObjectParser;
