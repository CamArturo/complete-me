// whenever we access this file export by default

export default class Node {
  constructor(character = null) {
    this.letter = character;
    this.isWord = false;
    this.children = {};
    this.selectCount = 0;
  }
}

module.exports = Node;
