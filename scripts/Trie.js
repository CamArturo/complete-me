// import Node from './Node.js';
const Node = require('./Node.js');

class Trie {
  constructor () {
    this.rootNode = new Node;
    this.wordCount = 0;
    // this.isWord = null;
    this.suggestions = [];
    // this.wordCount = 0;
  }

  populate(wordArr) {
    wordArr.forEach( word => {
      this.insert(word)
    })
  }

  insert (string) {
    let characters = string.toLowerCase().split('');
    let currentNode = this.rootNode;

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

  delete(string) {
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
    // let prefix = string.slice(0, string.length - 1);
    // let lastLetter = lettersArr[lettersArr.length - 1];

    if (!currentNode.children[lettersArr[0]]) {
      return 'There are no matching words';
    }

    // navigate

    // get suggestions(prefix, currNode)
      // is this a word if it is then
      // check and see if it has children
      // recurisvily call on it

    // If string is already in this.suggestions
    // if (trie.) {
    //   this.suggestions.push(string)
    // }

    lettersArr.forEach(letter => {
      // If current Nodes has a child that === the letter
      if (currentNode.children) {
        currentNode = currentNode.children[letter];
      } else {
        return null;
      }
    });

    const findWord = (prefix, currentNode) => {
      if (currentNode.isWord) {
        // this.suggestions.push(word);
        suggestions.push(prefix);
      }

      if(currentNode.children) {
        let childrenKeys = Object.keys(currentNode.children);
        childrenKeys.forEach(child => {
          let childNode = currentNode.children[child];
          let newString = prefix + child;

          findWord(newString, childNode)
        })
      }
    };

    findWord(string, currentNode);
    return suggestions;



    // checkChildren(currentNode) {
    // Object.keys = on lastletter
    // Everychild needs to
    // }

    // return array of suggestions
  }

  // addSuggestion(word) {
  //   this.suggestions.push(word)
  // }


}

module.exports = Trie;
