// whenever we access this file export by default

export default class Node {
  constructor(character = null) {
    // this.data = data || null;
    // // it is only get a next value with we push
    // this.next = null;
    this.letter = character;
    this.isWord = false;
    this.children = {};
  }
}

module.exports = Node;
