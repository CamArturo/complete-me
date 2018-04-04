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

  it.skip('should have a rootNode node defaulted to null', () => {
    expect(node.rootNode).to.equal(null);
  });

  it('should not be the end of the word by default', () => {
    expect(node.wordEnd).to.equal(false);
  });

  it('should have children data type of object', () => {
    assert.isObject(node.children, 'node children should be objects');
  });
  it('')
});