const assert = require('assert');
const StringParser = require('./stringParser');

describe('StringParser', function() {
  it('should have methods', function() {
    const Sp = new StringParser();
    const canParse = Sp.canParse;
    const parse = Sp.parse;
    const parseString = Sp.parseString;
    const resolveChanceOptions = Sp.resolveChanceOptions;

    assert.ok(canParse);
    assert.ok(parse);
    assert.ok(parseString);
    assert.ok(resolveChanceOptions);
  });
});
