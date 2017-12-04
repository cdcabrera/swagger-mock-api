const Chance = require('chance');
const chance = new Chance();

/**
 * Create a boolean value.
 */
class BooleanParser {
  canParse(node) {
    return node.type === 'boolean';
  }

  parse(node) {
    return chance.bool(node['x-type-options']);
  }
}

module.exports = BooleanParser;
