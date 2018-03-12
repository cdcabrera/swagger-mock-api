const assert = require('assert');
const ObjectParser = require('./objectParser');

describe('ObjectParser', function() {
  it('should have methods', function() {
    const Op = new ObjectParser();
    const canParse = Op.canParse;
    const parse = Op.parse;
    const generateObject = Op.generateObject;

    assert.ok(canParse);
    assert.ok(parse);
    assert.ok(generateObject);
  });
});
