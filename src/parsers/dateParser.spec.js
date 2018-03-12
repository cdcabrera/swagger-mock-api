const assert = require('assert');
const DateParser = require('./dateParser');

describe('DateParser', function() {
  it('should have methods', function() {
    const Dp = new DateParser();
    const canParse = Dp.canParse;
    const parse = Dp.parse;

    assert.ok(canParse);
    assert.ok(parse);
  });
});
