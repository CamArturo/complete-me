// import Node from './Node.js';
const Node = require('./Node.js');

class Trie {
  constructor () {
    this.rootNode = new Node;
    this.wordCount = 0;
    this.suggestions = [];
  }

  populate (wordArr) {
    wordArr.forEach(word => {
      this.insert(word);
    });
  }

  insert (string) {
    let currentNode = this.rootNode;
    let characters = string.toLowerCase().split('');

    characters.forEach(character => {
      if (!currentNode.children[character]) {
        currentNode.children[character] = new Node(character);
      }
      currentNode = currentNode.children[character];
    });

    if (!currentNode.isWord) {
      this.wordCount++;
      currentNode.isWord = true;
    }
  }

  select (string) {
    let currentNode = this.rootNode;
    let lettersArr = string.toLowerCase().split('');

    lettersArr.forEach(character => {
      currentNode = currentNode.children[character];
    });

    if (currentNode.isWord) {
      currentNode.selectCount++;
    }
  }

  delete (string) {
    let characters = string.toLowerCase().split('');
    let currentNode = this.rootNode;

    characters.forEach(character => {
      if (!currentNode.children[character]) {
        currentNode.children[character] = new Node(character);
      }
      currentNode = currentNode.children[character];
    });

    if (currentNode.isWord) {
      this.wordCount--;
      currentNode.isWord = false;
    }
  }

  suggest (string) {
    let suggestions = [];
    let currentNode = this.rootNode;
    let lettersArr = string.toLowerCase().split('');
    if (!currentNode.children[lettersArr[0]]) {
      return 'There are no matching words';
    }

    lettersArr.forEach(letter => {
      // If current Nodes has a child that === the letter
      if (currentNode.children) {
        currentNode = currentNode.children[letter];
      }
    });

    const findWord = (prefix, currentNode) => {
      if (currentNode.isWord) {
        // this.suggestions.push(word);
        // suggestions.push(prefix);
        // add to object a key of the prefix.
        // the value should be the selectCount
        let selectCount = currentNode.selectCount;

        if (!suggestions.includes(prefix)) {
          suggestions.push({
            [prefix]: prefix,
            selectCount: selectCount
          });
        }
      }

      if (currentNode.children) {
        let childrenKeys = Object.keys(currentNode.children);
        childrenKeys.forEach(child => {
          let childNode = currentNode.children[child];
          let newString = prefix + child;

          findWord(newString, childNode);
        });
      }
    };

    findWord(string, currentNode);
    suggestions.sort((a, b) => {
      return b.selectCount - a.selectCount;
    });
    let finalSuggestions = suggestions.map(word => {
      let key = Object.keys(word);
      return key[0];
    });
    return finalSuggestions;
  }

}

module.exports = Trie;
