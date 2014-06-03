var HWOverlay = {
        sayHelloWorld: function(caller) {
            window.open('chrome://HelloWorld/content/HelloWorld.xul', caller,
                        'width=640,height=360,resizable,scrollbars,chrome,centerscreen');
        } // sayHelloWorld: function()
}; // HWOverlay
