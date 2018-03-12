const assert = require('assert');
const ArrayParser = require('./arrayParser');

describe('ArrayParser', function() {
  it('should have methods', function() {
    const Ap = new ArrayParser();
    const canParse = Ap.canParse;
    const parse = Ap.parse;
    const generateArray = Ap.generateArray;

    assert.ok(canParse);
    assert.ok(parse);
    assert.ok(generateArray);
  });
});
