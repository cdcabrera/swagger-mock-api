const Chance = require('chance');
const chance = new Chance();

/**
 *
 */
class EnumParser {
  canParse(node) {
    return !!node.enum;
  }

  parse(node) {
    return this.parseEnum(node.enum);
  }

  parseEnum(enumNode) {
    const index = chance.integer({ min: 0, max: enumNode.length - 1 });

    return enumNode[index];
  }
}

module.exports = EnumParser;
