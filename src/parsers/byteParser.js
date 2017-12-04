const crypto = require('crypto');

/**
 * Create a byte value.
 */
class ByteParser {
  canParse(node) {
    return node.type === 'byte';
  }

  parse() {
    return crypto.randomBytes(1).toString('base64');
  }
}

module.exports = ByteParser;
