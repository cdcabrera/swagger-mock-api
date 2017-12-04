const assert = require('assert');
const EnumParser = require('./enumParser');

describe('EnumParser', function() {
  it('should have methods', function() {
    const Ep = new EnumParser();
    const canParse = Ep.canParse;
    const parse = Ep.parse;
    const parseEnum = Ep.parseEnum;

    assert.ok(canParse);
    assert.ok(parse);
    assert.ok(parseEnum);
  });
});
