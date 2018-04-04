// import Node from './Node.js';
const Node = require('./Node.js');

class Trie {
  constructor () {
    this.rootNode = new Node;
    this.count = 0;
    this.isWord = null;
    this.suggestions = [];
  }

  insert (string) {
    let characters = string.toLowerCase().split('');
    let currentNode = this.rootNode;

    // console.log(JSON.stringify(trie, null, 2));

    characters.forEach(character => {
      if (!currentNode.children[character]) {
        currentNode.children[character] = new Node(character);
      }
      currentNode = currentNode.children[character]
    });

    if(!currentNode.isWord) {
      this.count++
    }
    currentNode.isWord = true;
  }

  suggest(string) {
    let characters = [...string]


    // return array of suggestions
  }
}


module.exports = Trie;
