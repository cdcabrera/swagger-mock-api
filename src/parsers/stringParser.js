const RandExp = require('randexp');
const Chance = require('chance');
const chance = new Chance();

/**
 * Create a string value.
 */
class StringParser {
  canParse(node) {
    return node.type === 'string';
  }

  parse(node) {
    return this.parseString(node);
  }

  parseString(node) {
    if (node.pattern) {
      return new RandExp(node.pattern).gen();
    }

    return chance.string(this.resolveChanceOptions(node));
  }

  resolveChanceOptions(node) {
    const options = node['x-type-options'] || {};

    if (node.maxLength && node.minLength) {
      options.length = chance.integer({
        max: node.maxLength,
        min: node.minLength
      });
    } else {
      options.length = options.length || node.maxLength || node.minLength;
    }

    return options;
  }
}

module.exports = StringParser;
