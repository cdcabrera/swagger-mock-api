const assert = require('assert');
const AllOfParser = require('./allOfParser');

describe('AllOfParser', function() {
  it('should have methods', function() {
    const Ap = new AllOfParser();
    const canParse = Ap.canParse;
    const parse = Ap.parse;
    const generateObject = Ap.generateObject;

    assert.ok(canParse);
    assert.ok(parse);
    assert.ok(generateObject);
  });
});
