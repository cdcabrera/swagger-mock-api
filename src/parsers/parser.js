const AllOfParser = require('./allOfParser');
const ArrayParser = require('./arrayParser');
const BooleanParser = require('./booleanParser');
const ByteParser = require('./byteParser');
const DateParser = require('./dateParser');
const EnumParser = require('./enumParser');
const NumberParser = require('./numberParser');
const ObjectParser = require('./objectParser');
const StringParser = require('./stringParser');

const Chance = require('chance');
const chance = new Chance();

/**
 * Find the correct parser.
 */
class Parser {
  constructor() {
    this.parsers = [
      new AllOfParser(this),
      new ArrayParser(this),
      new BooleanParser(),
      new ByteParser(),
      new DateParser(),
      new EnumParser(),
      new NumberParser(),
      new ObjectParser(this),
      new StringParser()
    ];
  }

  getParser(node) {
    const parser = this.parsers.find(p => p.canParse(node));

    if (!parser) {
      throw new Error(`Can't handle ${node.type || 'Unknown'} type.`);
    }

    return parser;
  }

  parse(node) {
    if (node['x-chance-type'] === 'fixed') {
      return node['x-type-value'];
    }

    if (node['x-chance-type']) {
      return chance[node['x-chance-type']](node['x-type-options']);
    }

    return this.getParser(node).parse(node);
  }
}

module.exports = Parser;
