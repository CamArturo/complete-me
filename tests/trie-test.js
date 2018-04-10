const chai = require('chai');
const assert = chai.assert;
const Trie = require('../scripts/Trie.js');
const Node = require('../scripts/Node.js');
const expect = chai.expect;

const fs = require('fs');
const text = '/usr/share/dict/words';
const dictionary = fs.readFileSync(text).toString().trim().split('\n');

// 'Test' is redundant
describe('Trie Test', () => {
  let trie;
// good use of beforeEach
  beforeEach(() => {
    trie = new Trie();
  });

  describe('select', () => {
    it('should increase selectCount on Node', () => {
      trie.insert('bat');
      trie.insert('baton');
      trie.select('bat');
      trie.select('bat');
      trie.select('bat');
// good separation here
      let actualOutput = trie.rootNode.children['b'].children['a'].children['t'].selectCount;
      expect(actualOutput).to.deep.equal(3);
    });

    it.only('should return an array with most selected words(prefixes) in beginning of suggestionArr', () => {
      trie.insert('bats');
      trie.insert('bat');
      trie.insert('bath');

      trie.select('bat');
      trie.select('bat');
      trie.select('bath');

      let actualOutput = trie.suggest('bat');
      // console.log(JSON.stringify(trie, null, 2));

      expect(actualOutput).to.deep.equal(['bat', 'bath', 'bats']);
    });
  });

  describe('insert', () => {

    it('should increase count when insert is called', () => {
      trie.insert('abc');
      trie.insert('def');
      trie.insert('egh');
      expect(trie.wordCount).to.equal(3);
    });

    it('should not increase count when string is already in trie', () => {
      trie.insert('abc');
      trie.insert('abc');
      trie.insert('def');
      trie.insert('efg');
      expect(trie.wordCount).to.equal(3);
    });

    it('should update isWord to true', () => {
      trie.insert('car');
      expect(trie.rootNode.children['c'].children['a'].children['r'].isWord).to.equal(true);
    });
  });

  describe('suggest', () => {

    it('should be able to suggest words based on prefix entered', () => {
      trie.insert('bat');
      trie.insert('baton');
      trie.insert('batter');
      trie.insert('bats');
      // console.log(JSON.stringify(trie, null, 2));
      const suggest = trie.suggest('ba');
      expect(suggest).to.deep.equal(['bat', 'baton', 'batter', 'bats']);
    });

    it('should return all words possible with letters entered', () => {
      // set up world
      trie.insert('bat');
      // do an action
      let actualOutput = trie.suggest('bat');
      // console.log(JSON.stringify(trie, null, 2));
      // assert the change did affect the world

      expect(actualOutput).to.deep.equal(['bat']);
    });

    it('should be able to offer some suggestions based on a word prefix', () => {
      trie.insert('bat');
      trie.insert('baton');
      trie.insert('batter');
      // trie.insert('bats');
      // trie.insert('Batman');
      // trie.insert('bath');
      // trie.insert('bathmat');
      // trie.insert('bathtub');
      trie.suggest('bat');
      let actualOutput = trie.suggest('bat');
      // console.log(JSON.stringify(trie, null, 2));
      expect(actualOutput).to.deep.equal(['bat', 'baton', 'batter']);
    });
  });

  describe('populate', () => {
    // this test is failing
    it('should populate 234,371 words', () => {
      trie.populate(dictionary);
      expect(trie.wordCount).to.equal(234371);
    });
    // if give suggestions from dictionary for a large data set

  });

  describe('delete', () => {
    it('should decrease wordcount', () => {
      trie.insert('bat');
      trie.insert('baton');
      trie.insert('batter');
      trie.insert('bats');
      trie.delete('bat');
      expect(trie.wordCount).to.equal(3);
    });

    it('should make current word not a word', () => {
      trie.insert('bat');
      // trie.insert('baton');
      // trie.insert('batter');
      // trie.insert('bats');
      trie.insert('car');
      trie.delete('car');
      // console.log(JSON.stringify(trie, null, 2));
      expect(trie.rootNode.children['c'].children['a'].children['r'].isWord).to.equal(false);
    });

  });
});
