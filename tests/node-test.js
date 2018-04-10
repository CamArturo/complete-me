const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const Trie = require('../scripts/Trie.js');
const Node = require('../scripts/Node.js');

describe('Node Test', () => {
  let node;

  beforeEach(() => {
    node = new Node();
  });

  it('should be a thing', () => {
    expect(node).to.exist;
  });

  it('should not be the end of the word by default', () => {
    expect(node.isWord).to.equal(false);
  });

  it('should have children data type of object', () => {
    // no need to craft your own message
    // chai's messages should suffice
    assert.isObject(node.children, 'node children should be objects');
  });

  it('should not be the end of the word by default', () => {
    expect(node.isWord).to.equal(false);
  });

  it('should have children data type of object', () => {
    assert.isObject(node.children, 'node children should be objects');
  });
});