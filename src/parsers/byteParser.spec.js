const assert = require('assert');
const ByteParser = require('./byteParser');

describe('ByteParser', function() {
  it('should have methods', function() {
    const Bp = new ByteParser();
    const canParse = Bp.canParse;
    const parse = Bp.parse;

    assert.ok(canParse);
    assert.ok(parse);
  });
});
