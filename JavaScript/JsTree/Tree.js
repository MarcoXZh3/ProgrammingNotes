/**
 * Javascript Class - Tree
 * @author  Marco
 * @version 1.0
 */
function Tree(rootNode, name) {
    /**
     * Name of the tree, optional
     */
    this.name = (!name) ? '' : name;
    /**
     * Root node of the tree
     */
    this.rootNode = rootNode;
} // function Tree(rootNode, name)

/**
 * Get the name of the tree
 * @returns {String}    Name of the tree
 */
Tree.prototype.getName = function() {
    return this.name;
}; // Tree.prototype.getName = function()

/**
 * Set the name of the tree
 * @param name  Name to be set
 */
Tree.prototype.setName = function(name) {
    this.name = name;
}; // Tree.prototype.setName = function(name)

/**
 * Get the root node of the tree
 * @returns {Object}    Root node of the tree
 */
Tree.prototype.getRootNode = function() {
    return this.rootNode;
}; // Tree.prototype.getRootNode = function()

/**
 * Set the new root node of the tree
 * @param rootNode  The root node to be set
 */
Tree.prototype.setRootNode = function(rootNode) {
    this.rootNode = rootNode;
}; // Tree.prototype.setRootNode = function(rootNode)

/**
 * Check whether the tree is empty
 * @returns {Boolean}   True for empty or false for not
 */
Tree.prototype.isEmptyTree = function() {
    return (!this.rootNode);
}; // Tree.prototype.isEmptyTree = function()

/**
 * Check whether a node has another node as child
 * @param node          The node to be checked
 * @param childNode     The target child node
 * @returns {Boolean}   True if has the child or false if not
 */
Tree.prototype.hasChildNode = function(node, childNode) {
    if (node.contains(childNode))
        return true;
    var child = node.getFirstChild();
    while (child) {
        if (this.hasChildNode(child, childNode))
            return true;
        child = child.getNextSibling();
    } // while (child)
    return false;
}; // Tree.prototype.hasChildNode = function(node, childNode)

/**
 * Check whether the tree has a specific node
 * @param node          The node to be checked
 * @returns {Boolean}   True if the tree contains the node or false if not
 */
Tree.prototype.hasNode = function(node) {
    if (this.isEmptyTree())
        return false;
    return this.hasChildNode(this.rootNode, node);
}; // Tree.prototype.hasNode = function(node)

/**
 * Check whether a node is a leaf node of the tree
 * @param node          The node to be checked
 * @returns {Boolean}   True if the node is a leaf or false if not
 */
Tree.prototype.isLeafNode = function(node) {
    if (!node || !this.hasNode(node))
        return false;
    return (!node.hasChildNodes());
}; // Tree.prototype.isLeafNode = function(node)

/**
 * Get the depth of the tree, start from 1
 * @returns {Number}        Depth of the tree
 */
Tree.prototype.getTreeDepth = function() {
    if (this.isEmptyTree())
        return 0;
    return this.getNodeDepth(this.rootNode);
}; // Tree.prototype.getTreeDepth = function()

/**
 * Get the depth of a specific node
 * @param node          The node to check depth
 * @returns {Number}    Depth of the node or -1 if not a node of the tree
 */
Tree.prototype.getNodeDepth = function(node) {
    if (!node || !this.hasNode(node))
        return -1;
    if (!node.hasChildNodes())
        return 1;
    var result = 0;
    var child = node.getFirstChild();
    while(child) {
        var depth = this.getNodeDepth(child);
        if (result < depth)
            result = depth;
        child = child.getNextSibling();
    } // while(child)
    return (result + 1);
}; // Tree.prototype.getNodeDepth = function(node)

/**
 * Get the level of a specific node
 * @param node          The node to check level
 * @returns {Number}    Level of the node of -1 if not a node of the tree
 */
Tree.prototype.getNodeLevel = function(node) {
    if (!node || !this.hasNode(node))
        return -1;
    return this.getTreeDepth() - this.getNodeDepth(node) + 1;
}; // Tree.prototype.getNodeLevel = function(node)

/**
 * Get information of a node and its child nodes
 * @param node          The node to find information
 * @param level         The level of the node, started from 0 
 * @returns {String}    Inforamtion string of the node
 */
Tree.prototype.getNodeInfo = function(node, level) {
    var space = '';
    for (var i = 0; i < level; i++)
        space += '| ';
    if (space.length != 0)
        space = space.substr(0, space.length - 1) + '-';
    var text = space + node.toString() + '\n';
    var child = node.getFirstChild();
    while (child) {
        text += this.getNodeInfo(child, level + 1);
        child = child.getNextSibling();
    } // while (child)
    return text;
}; // Tree.prototype.getNodeInfo = function(node, level)

/**
 * Retrieve information about the tree
 * @returns {String}    Information string of the tree
 */
Tree.prototype.toString = function() {
    var text = '================================= Tree: ' + this.name + ' =================================n';
    text += this.getNodeInfo(this.rootNode, 0);
    text += '================================= Tree: ' + this.name + ' =================================n';
    return text;
}; // Tree.prototype.toString = function()
