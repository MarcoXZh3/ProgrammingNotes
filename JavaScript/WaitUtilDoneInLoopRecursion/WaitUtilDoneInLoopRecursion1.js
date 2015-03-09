var root = document.body;
// You will find the console logs each element's tag neme with indentation every 1 second
depthFirstTraverse(root, 0, function(node, str) {
  console.log(str + node.tagName);                              // This is the "callback" in "traverse" function
}); // depthFirstTraverse(document.body, 0, function(node, str) {...});

function depthFirstTraverse(node, level, callback) {
  // TODO: tasks before waiting
  var str = "";
  var i = 0;
  while (i++ < level)
    str += "  ";
  setTimeout(function(){                                        // The wait-until-done procedure
    // TODO: tasks in the wait-until-done procedure
    callback(node, str);

    // After current procedure
    if (node.childElementCount > 0)                             // first go to its children
      depthFirstTraverse(node.firstElementChild, level + 1, callback);
    else if (node.nextElementSibling)                           // then go to its next sibling
      depthFirstTraverse(node.nextElementSibling, level, callback);
    else {                                                      // then go to its uncle (parent's next sibling)
      var parent = node.parentElement;
      var uncle = parent.nextElementSibling;
      var uncleLevel = level - 1;
      while (!uncle) {
        if (parent === root)                                    // if all ancestors have no next sibling,
          return ;                                              // then it means traversing has finished
        parent = parent.parentElement;
        uncle = parent.nextElementSibling;
        uncleLevel --;
      } // while (!uncle)
      depthFirstTraverse(uncle, uncleLevel, callback);
    } // if - else if - else
  }, 1000); // setTimeout(function(){...}, 1000);
} // function depthFirstTraverse(node, level, callback)

