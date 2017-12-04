/**
 * Return a value against all the subschemas. Look at expanding to oneOf, allOf, and anyOf.
 */
class AllOfParser {
  constructor(parser) {
    this.parser = parser;
  }

  canParse(node) {
    return !!node.allOf;
  }

  parse(node) {
    return this.generateObject(node);
  }

  generateObject(node) {
    return node.allOf.reduce((s, o) => Object.assign(s, this.parser.parse(o)), {});
  }
}

module.exports = AllOfParser;
