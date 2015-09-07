Set up Firefox environment (Deprecated)
=======================================

1. Create a development user profile.

   Just start Firefox with the parameter ```-no-remote```:

   On **Ubuntu**:

    ```sh
    /usr/bin/firefox -no-remote -P dev
    ```

   On **Windows (x86)**:

    ```sh
    "%ProgramFiles%\Mozilla Firefox\firefox.exe" -no-remote -P dev
    ```

   On **Windows (x64)**:

    ```sh
    "%ProgramFiles(x86)%\Mozilla Firefox\firefox.exe" -no-remote -P dev
    ```

2. Set up Development preferences.

   Type ```about:cofig``` in the address field. Set the following Boolean variables’
   values to ```true``` (If it does not exist, create first).

   - ```javascript.options.showInConsole```
   - ```nglayout.debug.disable_xul_cache```
   - ```browser.dom.window.dump.enabled```
   - ```javascript.options.strict```
   - ```devtools.chrome.enabled```
   - ```devtools.debugger.remote-enabled```
   - ```extensions.logging.enabled```
   - ```nglayout.debug.disable_xul_fastload```
   - ```dom.report_all_js_exceptions```
   - ```devtools.errorconsole.deprecation_warnings```

   **Never** set ```nglayout.debug.disable_xul_fastload``` to ```true``` in a
   production environment; it exists solely to aid in debugging. In particular,
   add-ons should never change this preference.


Prepare necessary files
=======================

Here is a typical list of source files and the directory structure of a Firefox extension:

```sh
  ./                                        # Current path
  ./chrome.manifest                         # Manifest list file, must in root directory
  ./install.rdf                             # Intallation information, must in root directory
  ./content/                                # All the contents of the extension
  ./content/HelloWorld.js
  ./content/HelloWorld.xul
  ./content/overlay.js
  ./content/overlay.xul
  ./content/icons/
  ./content/icons/HW_en-US.png
  ./content/icons/HW_zh-CN.png
  ./defaults/
  ./defaults/preferences/                   # Preferences in this directory
  ./defaults/preferences/HelloWorld.js
  ./locale/                                 # Locale retated contents
  ./locale/en-US/
  ./locale/en-US/overlay.dtd
  ./locale/zh-CN/
  ./locale/zh-CN/overlay.dtd
```

1. File: ```install.rdf```

   This file stores all important information on installing extension. And there are
   several entries that should be paid attentions to:

   + ```id```:The extension’s id. Note it should be in an email address format, but
     not necessarily a valid email address.

   + ```version```: The extension’s version number.

   + ```type```: The extension’s type. It should be an integer value as:
    - `2` -- Extensions
     - `4` -- Themes
     - `8` -- Locale
     - `32` -- Multiple Item Package
     - `64` -- Spell check dictionary

   + ```targetApplication.id```: This id indicates where the extension is to be installed,
     thus for Firefox extensions, this value should always be Firefox’s id —- 
     ```{ec8030f7-c20a-464f-9b0e-13a3a9e97384}```.

   + ```targetApplication.minVersion```: The minimum version requirement of target application.

   + ```targetApplication.maxVersion```: The maximum version requirement of target application.

   + ```name```: The extension’s name.

   + ```description```: A brief description to the extension

   + ```creator```: The extension’s creator’s name.

   + ```hompageURL```: The extension’s creator’s website.

2. File: ```chrome.manifest```

   This file lists out all the “chrome providers” used in the extension:

   + `content`: Tells where the main content components of the extension locates. Since it
     is a directory, the trailing slash is ALWAYS necessary.

   + `overlay`: Tells which browser page will be overlaid and which extension page will
     overlay it. There may be more than one overlays exist.

   + `locale`: Tells that for each locale provider, where to find the localized information.

Register extension
==================

To make developing and debugging easier, we do not need to reinstall the extension
every time we make any change to it. Instead, we just register the project directory
to Firefox and it can install it for testing.

1. Locate the folder where extensions are stored in your profile.

   On **Ubuntu**:
    ```sh
    cd $HOME/.mozilla/firefox/t9jdodkp.Developer/extensions
    ```
   On **Windows**:
    ```sh
    cd %USERPROFILE%\AppData\Roaming\Mozilla\Firefox\Profiles\p46rkzpb.Developer\extensions
    ```
   **Note**:
   - The profile folder’s name is formatted as `idString.profileName`;
   - If you have never installed any extension in your profile, you may need create such
     a folder first.

2.	Create a text file and name it with the extension’s id (the email address format one).

3.	Inside this file, write down the root directory of the project full path in the first line.

    ```
    D:\FirefoxExtention\HelloWorld\
    # File name: "HelloWorld@Marco_XZh.net"
    ```

When you have made any change in your code, it will take effect immediately after you
restart the browser.


Overlay your components to the browser
======================================

As is shown in `chrome.manifest` (line 3), the `overlay.xul` in the content directory of the extension will overlay itself on the browser’s default layout. An XUL file is actually a XML file. Inside this file, some components like menu item, toolbar buttons are defined.

1. Merge point

   Merge point is the point where you want to add your components into the browser. For
   example, if you want to insert a menu item into the Firefox’s context menu item “Reload”,
   then the “Reload” menu item is the merge point. In this condition, you need the menu
   item’s id to refer to it. Here is a list of merge points:

    ```
    Merge Point                     Tag name          id
    ----------------------------------------------------------------------------
    "File" Menu                     menupopup         menu_FilePopup
    "Edit" Menu                     menupopup         menu_EditPopup
    "View" Menu                     menupopup         menu_viewPopup
    "History" Menu                  menupopup         goPopup
    "Bookmarks" Menu                menupopup         bookmarksMenuPopup
    "Tool" Menu                     menupopup         menu_ToolsPopup
    "Help" Menu                     menupopup         menu_HelpPopup
    Context Menu                    popup             contentAreaContextMenu
    Toolbar (hidden components)     toolbarpalette    BrowserToolbarPalette
    Toolbar (visible components)    toolbar           nav bar
    ```

   **Note**:
   - “History” menu will change a lot according to the user, but the last item of the
     fixed part is the one that has the id `goPopup`. So here is a good merge point.
     Remember add a separator afterward.

   - There are more than one context menu: for blank part of a webpage; for hyperlinks;
     for text fields; etc. So do not insert your menu item after a specific context menu
     item. Instead, append it to the end of context menu.

   - For toolbar items, add class attribute and set its value to `toolbarbutton-1` so
     that it appears correctly in “Icons and Text” mode and adjusts padding.

   - For visible items, the icon’s size is best to set to 16 x 16.

2. Localization

   For any page of your extension, it is strongly recommended to make it support
   internationalization:

   - Add a `!DOCTYPE` element to refer the locale file (DTD file).

     ```html
     <!DOCTYPE overlay SYSTEM "chrome://HelloWorld/locale/overlay.dtd">
     ```
     Note the `overlay` should be the actual tag name of the root element of the XUL file.

   - Define the items with reference name and content string in every locale file.

     ```xml
     <!-- locale/en-US/overlay.dtd -->
     <!ENTITY name			"HelloWorld">
       ... ...

     <!-- locale/zh-CN/overlay.dtd -->
     <!ENTITY name			"你好世界">
       ... ...
     ```

   - Whenever a string is needed, use reference instead of the actual string. The
     reference’s syntax is to prepend a `&` and append a `;` to the reference name.

     ```html
     <menuitem id="HW-FileMenu-Item" label="&message;" accesskey="h"
               oncommand="HWOverlay.sayHelloWorld('&HW-FileMenu-Item;');"
               class="menuitem-iconic" image="&icon.path;" />
     ```
     Indeed, any content in the XUL source file can be referred, no matter it is an actual
     string variable or not.


Create your own page
====================

Remember a Firefox page is just like a HTML page. So creating such a page is no much difference.

1. An XUL file is a XML file, so first you need the XML declaration.

    ```xml
    <?xml version="1.0"?>
    ```

2. A customized Firefox page should have the same appearance (theme) with others.

    ```xml
    <?xml-stylesheet href="chrome://global/skin/global.css" type="text/css"?>
    ```

3. You may want to use HTML tags in the Firefox page. As XML syntax, just include
   the HTML namespace:

    ```xml
    <dialog xmlns="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul" 
            xmlns:html="http://www.w3.org/1999/xhtml"
            title="&name;" buttons=",">
    ```
    When you are using HTML tags, prefix the namespace of HTML.
    ```xml
    <html:pre id="html_pre" style="border:1px solid; width:300px; padding:8px;" />
    ```

4. Invoke DOM function `window.open(…)` to show a page.

    ```javascript
    // overlay.js
    window.open('chrome://HelloWorld/content/HelloWorld.xul', 'window.name',
                'width=640,height=360,resizable,scrollbars,chrome,centerscreen');
    ```


Use preferences
===============

1. Firefox’s preference system will load all JavaScript files in the directory 
   `./defaults/preferences/` to find preferences of the extension. So in these files,
   register your preferences like this:

    ```javascript
    pref('extensions.HelloWorld.userName', 'Marco');
    ```
    You cannot add any other JavaScript states here, so the following codes won't work:
    ```javascript
    var value = 'Marco';
    pref('extensions.HelloWorld.userName', value);          # won't work.
    pref('extensions.HelloWorld.userName', 'Mar' + 'co');   # won't work, too.
    ```
    To make preferences in your extension globally unique, name it first with `extensions`,
    and then your extension’s name, and finally the actual name you like. Separate the
    three parts with dot.

2. When you need to retrieve these preferences, find help of preference manager:

    ```javascript
    // HelloWorld.js
    var prefManager = Components.classes["@mozilla.org/preferences-service;1"]
                                .getService(Components.interfaces.nsIPrefBranch);
    var desc = document.getElementById('xul_desc');
    desc.innerHTML = prefManager.getCharPref("extensions.HelloWorld.userName");
    ```


Pack and install the extension
==============================

Packing Firefox extension is just to zip all the source files and folders into an
archive (*.zip) file and change its extension from "zip" to "xpi". But one important
thing is to make sure the file structure is correct – The files `install.rdf` and
`chrome.manifest` must be in the root directory of the xpi file.

Installing extensions are much easier. Just drag the extension file and drop it inside
your Firefox browser.


Appendix: Source codes
==============================

Find all source codes [here] [1].



[1]: https://github.com/MarcoXZh/ProgrammingNotes/tree/master/JavaScript/FirefoxExtension_Deprecated
