const assert = require('assert');
const NumberParser = require('./numberParser');

describe('NumberParser', function() {
  it('should have methods', function() {
    const Np = new NumberParser();
    const canParse = Np.canParse;
    const parse = Np.parse;
    const generateInteger = Np.generateInteger;
    const resolveBounds = Np.resolveBounds;
    const isInteger = Np.isInteger;
    const isFloating = Np.isFloating;

    assert.ok(canParse);
    assert.ok(parse);
    assert.ok(generateInteger);
    assert.ok(resolveBounds);
    assert.ok(isInteger);
    assert.ok(isFloating);
  });
});
