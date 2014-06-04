/**
 * JavaScript Class - Tree Node
 * @author  Marco
 * @version 1.0
 */
function TreeNode(name) {
    /**
     * Name of the tree node (if not specified then set to empty string)
     */
    this.name = (!name) ? '' : name;
    /**
     * Parent node of the tree node
     */
    this.parentNode = null;
    /**
     * Child node list of the tree node
     */
    this.childNodes = new Array();
    /**
     * First child node of the tree node
     */
    this.firstChild = null;
    /**
     * Last child node of the tree node
     */
    this.lastChild = null;
    /**
     * Next sibling node of the tree node
     */
    this.nextSibling = null;
    /**
     * Previous sibling node of the tree node
     */
    this.previousSibling = null;
} // function TreeNode(text)

/**
 * Get the name of the tree node
 * @returns {String}    Name of the tree node
 */
TreeNode.prototype.getName = function() {
    return this.name;
}; // TreeNode.prototype.getName = function()

/**
 * Set the name of the tree node
 * @param name  The name to be set
 */
TreeNode.prototype.setName = function(name) {
    this.name = name;
}; // TreeNode.prototype.setName = function(name)

/**
 * Get parent node
 * @returns {Object}    The parent node
 */
TreeNode.prototype.getParentNode = function() {
    return this.parentNode;
}; // TreeNode.prototype.getParentNode = function()

/**
 * Set parent node
 * @param parentNode    Parent node to the tree node
 */
TreeNode.prototype.setParentNode = function(parentNode) {
    this.parentNode = parentNode;
}; // TreeNode.prototype.setParentNode = function(parentNode)

/**
 * Get a child node
 * @param index         Index of the child node to find
 * @returns {Object}    The child node or null
 */
TreeNode.prototype.getChildNode = function(index) {
    if (index >= this.childNodes.length)
        return null;
    return this.childNodes[index];
}; // TreeNode.prototype.getChildNode = function(index)

/**
 * Set a child node
 * @param index         Index of the child node to set
 * @param newChildNode  New child node for setting
 * @returns {Boolean}   Whether successfully set
 */
TreeNode.prototype.setChildNode = function(index, newChildNode) {
    if (index >= this.childNodes.length)
        return false;
    this.childeNodes[index] = newChildNode;
    return true;
}; // TreeNode.prototype.setChildNode = function(index, newChildNode)

/**
 * Get the first child node
 * @returns {Object}    The first child node
 */
TreeNode.prototype.getFirstChild = function() {
    return this.firstChild;
}; // TreeNode.prototype.getFirstChild = function()

/**
 * Get the last child node
 * @returns {Object}    The last child node
 */
TreeNode.prototype.getLastChild = function() {
    return this.lastChild;
}; // TreeNode.prototype.getLastChild = function()

/**
 * Get the next sibling node
 * @returns {Object}    The next sibling node
 */
TreeNode.prototype.getNextSibling = function() {
    return this.nextSibling;
}; // TreeNode.prototype.getNextSibling = function()

/**
 * Set the next sibling node
 * @param nextSibling   The new next sibling node
 */
TreeNode.prototype.setNextSibling = function(nextSibling) {
    this.nextSibling = nextSibling;
}; // TreeNode.prototype.setNextSibling = function(nextSibling)

/**
 * Get the previous sibling node
 * @returns {Object}    The previous sibling node
 */
TreeNode.prototype.getPreviousSibling = function() {
    return this.previousSibling;
}; // TreeNode.prototype.getPreviousSibling = function()

/**
 * Set the previously sibling node
 * @param previousSibling   The previously sibling node
 */
TreeNode.prototype.setPreviousSibling = function(previousSibling) {
    this.previousSibling = previousSibling;
}; // TreeNode.prototype.setPreviousSibling = function(previousSibling)

/**
 * Append a new child node
 * @param childNode     The new child node
 * @returns {Boolean}   Whether successfully appended
 */
TreeNode.prototype.appendChild = function(childNode) {
    if (!childNode)
        return false;
    var index;
    for (index = 0; index < this.childNodes.length; index++) {
        if (this.childNodes[index] == childNode)
            return false;
    } // for (index = 0; index < this.childNodes.length; index++)
    this.childNodes.push(childNode);
    this.firstChild = this.childNodes[0];
    lastChild = childNode;
    childNode.setParentNode(this);
    if (this.childNodes.length > 1) {
        this.childNodes[this.childNodes.length - 2].setNextSibling(childNode);
        childNode.setPreviousSibling(this.childNodes[this.childNodes.length - 2]);
    } else {
        childNode.setPreviousSibling(null);
    } // else - if (this.childNodes.length > 1)
    childNode.setNextSibling(null);
    return true;
}; // TreeNode.prototype.appendChild = function(childNode)

/**
 * Remove a child node
 * @param childNode     The child node to be removed
 * @returns {Boolean}   Whether successfully removed
 */
TreeNode.prototype.removeChild = function(childNode) {
    if (!childNode)
        return false;
    var index;
    for (index = 0; index < this.childNodes.length; index++) {
        if (this.childNodes[index] == childNode)
            break ;
    } // for (index = 0; index < this.childNodes.length; index++)
    if (index >= this.childNodes.length)
        return false;
    else {
        var node = this.childNodes[index];
        node.setParentNode(null);
        node.setPreviousSibling(null);
        node.setNextSibling(null);
        if (index > 0)
            this.childNodes[index - 1].setNextSibling(this.getChildNode(index + 1));
        if (index < this.childNodes.length - 1)
            this.childNodes[index + 1].setPreviousSibling(this.getChildNode(index - 1));
        this.childNodes.splice(index, 1);
        this.firstChild = this.childNodes[0];
        this.lastChild = this.childNodes[this.childNodes.length - 1];
        return true;
    }; // else - if (index >= this.childNodes.length)
}; // TreeNode.prototype.removeChild = function(childNode)

/**
 * Insert a node before a child node
 * @param newChildNode  The new child node to be inserted
 * @param refChildNode  The targeted node
 * @returns {Boolean}   Whether successfully inserted
 */
TreeNode.prototype.insertBefore = function(newChildNode, refChildNode) {
    if (!newChildNode || (newChildNode == refChildNode))
        return false;
    if (!refChildNode)
        return this.appendChild(newChildNode);
    if (this.contains(newChildNode))
        this.removeChild(newChildNode);
    var index;
    for (index = 0; index < this.childNodes.length; index++) {
        if (this.childNodes[index] == refChildNode) {
            break ;
        }; // if (this.childNodes[index] == refChildNode)
    } // for (index = 0; index < this.childNodes.length; index++)
    if (index >= this.childNodes.length)
        return false;
    for (var i = this.childNodes.length; i > index; i--)
        this.childNodes[i] = this.childNodes[i-1];
    newChildNode.setParentNode(this);
    newChildNode.setNextSibling(refChildNode);
    refChildNode.setPreviousSibling(newChildNode);
    if (index > 0) {
        this.childNodes[index - 1].setNextSibling(newChildNode);
        newChildNode.setPreviousSibling(this.childNodes[index - 1]);
    } else {
        newChildNode.setPreviousSibling(null);
    }// else - if (index > 0)
    this.childNodes[index] = newChildNode;
    this.firstChild = this.childNodes[0];
    this.lastChild = this.childNodes[this.childNodes.length - 1];
    return true;
}; // TreeNode.prototype.insertBefore = function(newChildNode, refChildNode)

/**
 * Replace a child node with new node
 * @param newChildNode  The new child node
 * @param oldChildNode  The current child node
 * @returns {Boolean}   Whether successfully replaced
 */
TreeNode.prototype.replaceChild = function(newChildNode, oldChildNode) {
    if (!newChildNode || !oldChildNode || (newChildNode == oldChildNode))
        return false;
    var bResult = true;
    if (this.contains(newChildNode))
        bResult = this.removeChild(newChildNode);
    var index;
    for (index = 0; index < this.childNodes.length; index++) {
        if (this.childNodes[index] == oldChildNode) {
            var tmpNode = oldChildNode.getNextSibling();
            bResult = this.removeChild(oldChildNode);
            bResult = bResult && this.insertBefore(newChildNode, tmpNode);
            return bResult;
        }; // if (this.childNodes[index] == oldChild)
    } // for (index = 0; index < this.childNodes.length; index++)
    return false;
}; // TreeNode.prototype.replaceChild = function(newChildNode, oldChildNode)

/**
 * Check whether a node is contained
 * @param node          The node to be checked
 * @returns {Boolean}   Whether it is the node or contains the node as its immediate child
 */
TreeNode.prototype.contains = function(node) {
    if (this == node)
        return true;
    for (var i = 0; i < this.childNodes.length; i++) {
        if (this.childNodes[i] == node)
            return true;
    } // for (var i = 0; i < this.childNodes.length; i++)
    return false;
}; // TreeNode.prototype.contains = function(node)

/**
 * Check whether it has any child node
 * @returns {Boolean}   True for having child and false for not
 */
TreeNode.prototype.hasChildNodes = function() {
    return (this.childNodes.length != 0);
}; // TreeNode.prototype.hasChildNodes = function()

/**
 * Retrieve information about the tree node and its child nodes
 * @returns {String}    Information string of the node
 */
TreeNode.prototype.toString = function() {
    return this.name +  ': parent-' + (this.parentNode == null ? 'null' : this.parentNode.getName()) +
                        '; cs-' + this.childNodes.length +
                        '; fC-' + (this.firstChild == null ? 'null' : this.firstChild.getName()) +
                        '; lC-' + (this.lastChild == null ? 'null' : this.lastChild.getName()) +
                        '; pS-' + (this.previousSibling == null ? 'null' : this.previousSibling.getName()) +
                        '; nS-' + (this.nextSibling == null ? 'null' : this.nextSibling.getName());
}; // TreeNode.prototype.toString = function()
