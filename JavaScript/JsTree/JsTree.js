/**
 * JavaScript Implementation of "JsTreeNode" class
 * @author  MarcoXZh
 * @version  1.1
 */
function JsTreeNode(name) {
  var nodeName = "";
  var parentNode = null;
  var children = [];

  this.getName = function() {
    return nodeName;
  }; // this.getName = function() {...};

  this.setName = function(name) {
    nodeName = name;
  }; // this.setName = function(name) {...};

  this.getParent = function() {
    return parentNode;
  }; // this.getParent = function() {...};

  this.setParent = function(parent) {
    parentNode = parent;
  }; // this.setParent = function(parent) {...};

  this.getChildrenSize = function() {
    return children.length;
  }; // this.getChildrenSize = function() {...};

  this.getChild = function(index) {
    return children[index];
  }; // this.getChild = function(index) {...};

  this.setChild = function(index, node) {
    children[index] = node;
    return true;
  }; // this.setChild = function(index, node) {};

  this.insertChild = function(index, node) {
    children = children.slice(0, index).concat(node, children.slice(index, children.length));
    return children.length;
  }; // this.insertChild = function(index, node) {...};

  this.prependChild = function(node) {
    return children.unshift(node);
  }; // this.prependChild = function(node) {...};

  this.appendChild = function(node) {
    return children.push(node);
  }; // this.appendChild = function(node) {...};

  this.removeChild = function(para) {
    if (typeof para === "number")
      return children.splice(para, 1);
    else if (para instanceof JsTreeNode) {
      for (i in children)
        if (children[i] === para)
          return children.splice(i, 1);
    } // else - if
    return null;
  }; // this.removeChild = function(para) {...};

  this.replaceChild = function(oldChild, newChild) {
    if (!oldChild || !(oldChild instanceof JsTreeNode) || !newChild || (newChild instanceof JsTreeNode))
      return false;
    for (i in children)
      if (children[i] === oldChild) {
        children[i] = newChild;
        return true;
      } // for - if
    return false;
  }; // this.replaceChild = function(oldChild, newChild) {...};

  this.containsChild = function(node) {
    if (!node)
      return false;
    return children[index] === null || children[index] === undefined;
  }; // this.containsChild = function(node) {...};

  this.toString = function() {
    var str = nodeName + ": parent-" + (parentNode == null ? "null" : parentNode.getName()) +
              "; children(" + children.length + ")-[";
    for (i in children)
      str += children[i].getName() + ", ";
    if (children.length > 0)
      str = str.substr(0, str.length - 2);
    return str + "]";
  }; // this.toString = function() {...};

  this.setName(name);
} // function JsTreeNode(name)


/**
 * JavaScript Implementation of "JsTree" class
 * @author  MarcoXZh
 * @version  1.1
 */
function JsTree(treeRoot, name) {
  var treeName = "";
  var rootNode = null;

  this.getName = function() {
    return treeName;
  }; // this.getName = function() {...};

  this.setName = function(name) {
    treeName = name;
  }; // this.setName = function(name) {...};

  this.getRoot = function() {
    return rootNode;
  }; // this.getRoot = function() {...};

  this.setRoot = function(root) {
    rootNode = root;
  }; // this.setRoot = function(root) {...};

  this.isEmpty = function() {
    return rootNode === null || rootNode === undefined;
  }; // this.isEmpty = function() {...};

  var hasNode = function(root, node) {
    if (root === node)
      return true;
    var index = root.getChildrenSize();
    while (index-- > 0) {
      if (hasNode(root.getChildNode(index), node))
        return true;
    } // while (index-- >= 0)
    return false;
  }; // var hasNode = function(root, node) {...};

  this.containsNode = function(node) {
    if (!node)
      return false;
    return hasNode(rootNode);
  }; // this.containsNode = function(node) {...};

  var getSubTreeDepth = function(root) {
    var depth = 0, index = root.getChildrenSize();
    while (index-- > 0) {
      var d = getSubTreeDepth(root.getChildNode(index));
      if (d > depth)
        depth = d;
    } // while (index-- >= 0)
    return depth + 1;
  }; // var getSubTreeDepth = function(root) {...};

  this.getTreeDepth = function() {
    if (!rootNode)
      return 0;
    return getSubTreeDepth(rootNode);
  }; // this.getTreeDepth = function() {...};

  this.getNodeDepth = function(node) {
    return this.containsNode(node) ? getSubTreeDepth(node) : -1;
  }; // this.getNodeDepth = function(node) {...};

  this.getNodeLevel = function(node) {
    if (!this.containsNode(node))
      return -1;
    var parent = node.getParentNode();
    var level = 1;
    while (!parent) {
      level ++;
      parent = parent.getParentNode();
    } // while (!parent)
    return level;
  }; // this.getNodeLevel = function(node) {...};

  var getNodeString = function(root, level) {
    var text = "  ";
    var index = 0;
    while (index++ < level)
      text += "| ";
    if (text.length != 2)
      text = text.substr(0, text.length - 1) + "-";
    text += root.toString() + "\n";
    index = -1;
    var size = root.getChildrenSize();
    while (index++ < size - 1)
      text += getNodeString(root.getChild(index), level + 1);
    return text;
  }; // var getNodeString = function(root) {...};

  this.toString = function() {
    var text = "================ " + this.constructor.name + ": \"" + treeName + "\" ================\n";
    text += getNodeString(rootNode, 0);
    text += "================ " + this.constructor.name + ": \"" + treeName + "\" ================\n";
    return text;
  }; // this.toString = function() {...};

  this.setRoot(treeRoot);
  this.setName(name);
} // function JsTree(treeRoot, name)
