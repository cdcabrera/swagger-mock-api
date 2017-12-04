const assert = require('assert');
const BooleanParser = require('./booleanParser');

describe('BooleanParser', function() {
  it('should have methods', function() {
    const Bp = new BooleanParser();
    const canParse = Bp.canParse;
    const parse = Bp.parse;

    assert.ok(canParse);
    assert.ok(parse);
  });
});
