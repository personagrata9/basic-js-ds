const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

module.exports = class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    this.rootNode = addNode(this.rootNode, data);

    function addNode(node, data) {
      // нет узла
      if (!node) {
        return new Node(data);
      }
      // такой узел уже существует
      if (node.data === data) {
        return node;
      }
      // определить потомка: левый или правый
      data < node.data ? node.left = addNode(node.left, data) : node.right = addNode(node.right, data);

      return node;
    }
  }

  has(data) {
    return hasNode(this.rootNode, data);

    function hasNode(node, data) {
      if (!node) {
        return false;
      }

      if (node.data === data) {
        return true;
      }

      return data < node.data ? hasNode(node.left, data) : hasNode(node.right, data);
    }
  }

  find(data) {
    return findNode(this.rootNode, data);

    function findNode(node, data) {
      if (!node) {
        return null;
      }

      if (node.data === data) {
        return node;
      }

      return data < node.data ? findNode(node.left, data) : findNode(node.right, data);
    }
  }

  remove(data) {
    this.rootNode = removeNode(this.rootNode, data);

    function removeNode(node, data) {
      if (!node) {
        return null;
      }
    
      if (data < node.data) {
        // искомое значение меньше текущего
        node.left = removeNode(node.left, data);
        return node;
      } else if (node.data < data) {
        // искомое значение больше текущего
        node.right = removeNode(node.right, data);
        return node;
      } else {
        // искомое значение равно текущему
        if (!node.left && !node.right) {
          // текущий узел - лист
          return null;
        }

        if (!node.left) {
          // у текущего узла нет левого потомка - оставляем правого потомка вместо текущего узла
          node = node.right;
          return node;
        }

        if (!node.right) {
          // у текущего узла нет правого потомка - оставляем левого потомка вместо текущего узла
          node = node.left;
          return node;
        }

        // оба потомка существуют
        let minRight = node.right;
        while (minRight.left) {
          minRight = minRight.left;
        }
        node.data = minRight.data;

        node.right = removeNode(node.right, minRight.data);

        return node;
      }
    }
  }

  min() {
      // нет корня
      if (!this.rootNode) {
      return null;
    }

    let node = this.rootNode;
    // ищем самый "левый" элемент
    while (node.left) {
      node = node.left;
    }

    return node.data;
  }

  max() {
     // нет корня
      if (!this.rootNode) {
      return null;
    }

    let node = this.rootNode;
    // ищем самый "правый" элемент
    while (node.right) {
      node = node.right;
    }

    return node.data;
  }

}