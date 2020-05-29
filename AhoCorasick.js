class Node {
  constructor() {
    this.links = {};
    this.term = [];
    this.fail = null;
  }
}

class AhoCorasick {
  constructor(patterns) {
    this.patterns = patterns;
    this.createMachine();
  }

  createForest() {
    const root = new Node();
    let node;

    this.patterns.forEach(pattern => {
      node = root;
      [...pattern].forEach(char => {
        if (!node.links[char]) {
          node.links[char] = new Node();
        }
        node = node.links[char];
      });
      node.term.push(pattern);
    });

    return root;
  }

  createMachine() {
    let root = this.createForest();
    let queue = [];

    Object.values(root.links).forEach(node => {
      queue.push(node);
      node.fail = root;
    });

    while (queue.length) {
      let lastNode = queue.shift();

      Object.entries(lastNode.links).forEach(([key , linkedNode]) => {
        queue.push(linkedNode);
        let failNode = lastNode.fail;

        while (failNode && !(key in failNode.links)) {
          failNode = failNode.fail;
        }

        linkedNode.fail = failNode ? failNode.links[key] : root;
        linkedNode.term.push(...linkedNode.fail.term);
      });
    }

    this.root = root;
  }

  find(string) {
    const result = [];
    let node = this.root;

    [...string].forEach((char, i) => {
      while (node && !(char in node.links)) {
        node = node.fail;
      }

      if (!node) {
        node = this.root;
        return;
      }

      node = node.links[char];
      node.term.forEach(pattern => result.push([pattern, i - pattern.length + 1]));
    });

    return result;
  }
}
