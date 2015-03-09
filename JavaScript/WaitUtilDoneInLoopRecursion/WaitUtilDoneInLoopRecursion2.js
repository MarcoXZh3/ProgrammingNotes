var root = document.body;
// You will find the console logs each element's tag neme with indentation every 1 second
breadthFirstTraverse(root, 0, function(node, str) {
  console.log(str + node.tagName);                          // This is the "callback" in "traverse" function
}); // breadthFirstTraverse(document.body, 0, function(node, str) {...});

function breadthFirstTraverse(node, level, callback) {
  // TODO: tasks before waiting
  var str = "";
  var i = 0;
  while (i++ < level)
    str += "  ";
  setTimeout(function(){                                    // The wait-until-done procedure
    // TODO: tasks in the wait-until-done procedure
    callback(node, str);

    // After current procedure
    if (node === root)
      breadthFirstTraverse(root.firstElementChild, level + 1, callback);
    else if (node.nextElementSibling)                       // first go to its next sibling
      breadthFirstTraverse(node.nextElementSibling, level, callback);
    else {
      var cousin = findNextCousin(node);
      if (cousin)                                           // then go to uncle's (parent's next sibling) first child
        breadthFirstTraverse(cousin, level, callback);
      else {
        var firstChild = findFirstNode(root, level + 1);
        if (firstChild)
          breadthFirstTraverse(firstChild, level + 1, callback);
      } // else - if (cousin)
    } // else - else if - if (node === root)
  }, 500); // setTimeout(function(){...}, 500);
} // function breadthFirstTraverse(node, level, callback)

function findNextCousin(node) {
  var uncle = node.parentElement.nextElementSibling;
  if (!uncle)
    return null;                                            // if it has no uncles, then it has no cousins
  while (!uncle.firstElementChild) {
    if (!uncle.nextElementSibling)                          // if it's uncles have neither children nor siblings,
      return null;                                          // then it has no cousins
    uncle = uncle.nextElementSibling;
  } // while (!uncle.firstElementChild)
  return uncle.firstElementChild                            // otherwise, it next cousin is its uncle's first child
} // function findNextCousin(node)

function findFirstNode(theRoot, levelRemain) {
  if (levelRemain === 0)
    return theRoot;
  var child = theRoot.firstElementChild;
  while (child) {
    var node = findFirstNode(child, levelRemain - 1);
    if (node)
      return node;
    child = child.nextElementSibling;
  } // while (child)
  return null;
} // function findFirstNode(theRoot, remainLevel)

