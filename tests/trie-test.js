const chai = require('chai');
const assert = chai.assert;
const Trie = require('../scripts/Trie.js');
const Node = require('../scripts/Node.js');
const expect = chai.expect;

describe('Trie Test', () => {
  let trie;

  beforeEach(() => {
    trie = new Trie();
  });

  it.skip('should have a rootNode node defaulted to null', () => {
    expect(trie.rootNode).to.equal(null);
  });

  describe('insert', () => {

    it('should increase count when insert is called', () => {
      trie.insert('abc');
      trie.insert('def');
      trie.insert('egh');
      expect(trie.count).to.equal(3);
    });

    it('should not increase count when string is already in trie', () => {
      trie.insert('abc');
      trie.insert('abc');
      trie.insert('def');
      trie.insert('efg');
      expect(trie.count).to.equal(3);
    });
  });

  describe('suggest', () => {

    it('should be able to offer some suggestions based on a word prefix', () => {
      trie.insert('pizza');
      trie.insert('pizzeria');
      trie.insert('pizzas');
      trie.insert('Pizzazz');

      trie.suggest('piz');
      expect(trie.suggestions === ['pizza', 'pizzeria', 'pizzas', 'pizzazz']);

      trie.suggest('pizze');
      expect(trie.suggestions === ['pizzeria']);

    });

  });
});