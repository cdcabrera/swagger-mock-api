const Chance = require('chance');
const chance = new Chance();

/**
 * Create an array value.
 */
class ArrayParser {
  constructor(parser) {
    this.parser = parser;
  }

  canParse(node) {
    return node.type === 'array';
  }

  parse(node) {
    return this.generateArray(node);
  }

  generateArray(node) {
    const items = node.items;
    const options = node['x-type-options'] || {};
    // eslint-disable-next-line prefer-const
    let ret = [];

    options.min = options.min || node.minItems || 0;
    options.max = options.max || node.maxItems || 10;

    for (let i = 0; i < chance.integer(options); i++) {
      ret.push(this.parser.parse(items));
    }

    return ret;
  }
}

module.exports = ArrayParser;
