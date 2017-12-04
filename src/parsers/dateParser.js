const Chance = require('chance');
const chance = new Chance();

/**
 * Create a date value.
 */
class DateParser {
  canParse(node) {
    return /^date([Tt]ime)?$/.test(node.type);
  }

  parse(node) {
    return chance.date(node['x-type-options']);
  }
}

module.exports = DateParser;
