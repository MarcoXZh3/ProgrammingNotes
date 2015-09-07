// Update content of html:pre
var pre = document.getElementById('html_pre');
pre.innerHTML = window.name;

// Update content of xul:description
var prefManager = Components.classes["@mozilla.org/preferences-service;1"]
                            .getService(Components.interfaces.nsIPrefBranch);
var desc = document.getElementById('xul_desc');
desc.innerHTML = prefManager.getCharPref("extensions.HelloWorld.userName");
