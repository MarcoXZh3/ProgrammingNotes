/* Create a new node to load jQuery */
var jqScriptNode = document.createElement('script');
jqScriptNode.setAttribute('id', 'jqScriptNode');
jqScriptNode.setAttribute('src', 'http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js');
document.head.appendChild(jqScriptNode);

/* Provide enough time for loading jQuery source file */
setTimeout(runJQuery, 5000);

/* Run the code using jQuery */
function runJQuery() {
    // Do whatever you want with jQuery
    alert($('body')[0].nodeName);
} // function runJQuery()
