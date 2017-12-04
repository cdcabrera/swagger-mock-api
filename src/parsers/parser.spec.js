const assert = require('assert');
const Parser = require('./parser');

describe('Parser', function() {
  it('should have methods', function() {
    const P = new Parser();
    const getParser = P.getParser;
    const parse = P.parse;

    assert.ok(getParser);
    assert.ok(parse);
  });

  it('should parse and return a randomized ARRAY value', function() {
    const P = new Parser();
    const node = {
      type: 'array',
      items: {
        type: 'string'
      }
    };

    assert.ok(Array.isArray(P.parse(node)));
  });

  it('should parse and return a randomized BOOLEAN value', function() {
    const P = new Parser();
    const node = {
      type: 'boolean'
    };

    assert.ok(typeof P.parse(node) === 'boolean');
  });

  it('should parse and return a randomized BYTE value', function() {
    const P = new Parser();
    const node = {
      type: 'byte'
    };

    assert.equal(P.parse(node).length, 4);
  });

  it('should parse and return a randomized DATE value', function() {
    const P = new Parser();
    const node = {
      type: 'date'
    };

    assert.notEqual(new Date(P.parse(node)), 'Invalid Date');
  });

  it('should parse and return a randomized ENUM value', function() {
    const P = new Parser();
    const node = {
      type: 'string',
      description: 'pet status in the store',
      enum: ['available', 'pending', 'sold']
    };

    assert.equal(node.enum.indexOf(P.parse(node)) > -1, true);
  });

  it('should parse and return a randomized NUMBER value', function() {
    const P = new Parser();
    let node = {
      type: 'integer'
    };

    let value = P.parse(node);
    assert.ok(Number.isInteger(value));

    node = {
      type: 'integer',
      format: 'int64'
    };

    value = P.parse(node);
    assert.ok(Number.isInteger(value));

    node = {
      type: 'integer',
      format: 'int32'
    };

    value = P.parse(node);
    assert.ok(Number.isInteger(value));

    node = {
      type: 'number'
    };

    value = P.parse(node);
    assert.ok(!Number.isInteger(value) && typeof value === 'number');

    node = {
      type: 'number',
      format: 'float'
    };

    value = P.parse(node);
    assert.ok(!Number.isInteger(value) && typeof value === 'number');

    node = {
      type: 'number',
      format: 'double'
    };

    value = P.parse(node);
    assert.ok(!Number.isInteger(value) && typeof value === 'number');
  });

  it('should parse and return a randomized OBJECT value', function() {
    const P = new Parser();
    const node = {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          format: 'int64'
        },
        name: {
          type: 'string'
        }
      }
    };

    const parsed = P.parse(node);

    assert.ok(parsed.id);
    assert.ok(parsed.name);
  });

  it('should parse and return a randomized STRING value', function() {
    const P = new Parser();
    const node = {
      type: 'string'
    };

    assert.ok(P.parse(node));
  });
});
