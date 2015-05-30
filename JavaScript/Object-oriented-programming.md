JavaScript does not provide ways to do object oriented programming, but it is possible
to emulate similar implementations through other methods. To create a class, we can make
it by using JavaScript functions.


Create a class and its instance
-------------------------------

In JavaScript, a class can be simply defined as a function like this (Source code [here] [1]):

```javascript
function JsClass(className) {

  // ... ...

} // function JsClass(className)
```

Instance of the class is just a variable (reference) of the class function:

```javascript
var c1 = new JsClass('DemoJsClass');
```

The above definition and example refer only to parameterized constructor. In fact,
there is no need to redefine any default constructor. To call default constructor
to create a new instance, just leave the parameter list of the above constructor empty.

```javascript
var c2 = new JsClass();
```


Add private members
-------------------

Private members cannot be accessed outside of the class, so they should be regular variables
defined inside the class implementation (function):

```javascript
function JsClass(pubStr, priStr) {
  /**
   * Private variable: use <code>"var"</code> to define.
   */
  var privateStr = (!priStr) ? 'PRIVATE' : priStr;

  /**
   * Private method: use <code>"var"</code> to define -- Same as private variable.
   */
  var upperCaseOf = function(str) {
    return str.toUpperCase();
  }; // var upperCaseOf = function(str)

} // function JsClass(pubStr, priStr)
```

Add public members
------------------

Public members can be accessed outside of the class. To achieve that, simple prepend
```this``` pointer to that member inside the class definition:

```javascript
function JsClass(pubStr, priStr) {
  /**
   * Public variable: use <code>"this"</code> to define.
   */
  this.publicStr = (!pubStr) ? 'PUBLIC' : pubStr;

  /**
   * Public method: use <code>"this"</code> to define -- Same as public variable.
   */
  this.getPrivateStr = function() {
    return upperCaseOf(privateStr);
  }; // this.getPrivateStr = function(priStr)

} // function JsClass(pubStr, priStr)
```


Add static members
------------------

Static members of a class are shared by all instances. It can be accessed outside of the
class and directly referred by the class – this is exactly how JavaScript’s regular
properties behave. Thus, defining a static member is the same as defining a property, and
invoking a static member is the same as invoking a property.

There is an important issue: make sure static member variables are defined outside of the
class. If not, every time a new instance is created, a static variable may be
re-initialized, which is not correct.

```javascript
function JsClass(pubStr, priStr) {
  // ... ...
} // function JsClass(pubStr, priStr)

/**
 * Static variable is a property. DO place it outside of the class definition.
 * If not, every time a new instance is created, it will be re-initialized.
 */
JsClass.prototype.staticNo = 0;

/**
 * Static method is a property function -- Same as static variable.
 * Placing outside of class definition is not mandatory.
 */
JsClass.prototype.staticMethod = function() {
  JsClass.prototype.staticNo ++;
}; // JsClass.prorotype.staticMethod = function()
```


Inheritance
-----------

It is easy to inherit from parent class. However when inheriting, different kind of
parent’s members have to be treated differently (Source code [here] [2]).

  1. Public and private members

     These members can be inherited by calling the ```call``` or ```apply``` method of the
     parent class inside the child class, depending on how many parameters are there in the
     constructor of the parent class. In the (```call``` or ```apply```) method, the first
     parameter is the reference of the child class (simply be ```this```), while the second
     one is the parent class constructor’s parameter (for ```call``` method) or parameter
     list array (for ```apply``` method).

    ```javascript
    function JsClass1(name) {
      this.name = name;
    } // function JsClass1(name)
    function JsChild1(name, childId) {
      JsClass1.call(this, name);
      this.childId = childId;
    } // function JsChild1(name, childId)

    function JsClass2(name, age) {
      this.name = name;
      this.age = age;
    } // function JsClass2(name, age)
    function JsChild2(name, age, childId) {
      JsClass2.apply(this, new Array(name, age));
      this.childId = childId;
    } // function JsChild2(name, age, childId)
    ```

  2. Static members

     Since static members are implemented as JavaScript properties, inheriting them is
     easily done by linking the child class’s prototype to the parent class.

    ```javascript
    JsChild.prototype = new JsClass();
    ```

Appendix: Demo page (Source code [here] [3])
--------------------------------------------

```html
<!DOCTYPE html>
<html>
<head>
  <title> JsClass Demo </title>
  <meta http-equiv="Content-Type" content="text/html" charset="utf-8" />
  <script id= "testcode">
    function consoleOutput() {
      var source = document.getElementById('source');
      var innerHTML = document.getElementById('jsclass').innerHTML;
      source.innerHTML = innerHTML.trim().replace(/\n    /g, '\n');

      var c1 = new JsClass('public', 'private');
      var str = 'var c1 = new JsClass(\'public\', \'private\');\n';
      str += 'Public variable:\tc1.publicStr:\t\t' + c1.publicStr + '\n';
      str += 'Private variable:\tc1.privateStr:\t\t' + c1.privateStr + '\n';
      str += 'Public method:\t\tc1.getPrivateStr():\t' + c1.getPrivateStr() + '\n';
      try {
        c1.upperCaseOf();
      } catch (err) {
        str += 'Private method:\t\tc1.upperCaseOf():\t' + err.message + '\n';
      } // try - catch (err)
      str += 'Static method:\t\tc1.staticMethod()\n';
      c1.staticMethod();
      var c2 = new JsClass();
      str += 'var c2 = new JsClass();\n';
      str += 'Static method:\t\tc2.staticMethod()\n';
      c2.staticMethod();
      str += 'Static variable:\tc1.staticNo:\t\t' + c1.staticNo + '\n';
      str += 'Static variable:\tc2.staticNo:\t\t' + c2.staticNo + '\n';
      str += 'Static method:\t\tJsClass.prototype.staticMethod()\n';
      JsClass.prototype.staticMethod();
      str += 'Static variable:\tJsClass.staticNo:\t' + JsClass.prototype.staticNo + '\n';

      var c3 = new JsChildClass('pubStr', 'priStr');
      str += '\nvar c3 = new JsChildClass(\'pubStr\', \'priStr\');\n';
      str += 'Public parent variable:\tc3.publicStr:\t\t' + c3.publicStr + '\n';
      str += 'Private parent variable:c3.privateStr:\t\t' + c3.privateStr + '\n';
      str += 'Public parent method:\tc3.getPrivateStr():\t' + c3.getPrivateStr() + '\n';
      try {
        c3.upperCaseOf();
      } catch (err) {
        str += 'Private parent method:\tc3.upperCaseOf():\t' + err.message + '\n';
      } // try - catch (err)
      str += 'Static parent method:\tc3.staticMethod()\n';
      c3.staticMethod();
      var c4 = new JsChildClass();
      str += 'var c4 = new JsChildClass();\n';
      str += 'Static parent method:\tc4.staticMethod()\n';
      c4.staticMethod();
      str += 'Static parent variable:\tc3.staticNo:\t\t' + c3.staticNo + '\n';
      str += 'Static parent variable:\tc4.staticNo:\t\t' + c4.staticNo + '\n';
      str += 'Static parent method:\tJsChildClass.prototype.staticMethod()\n';
      JsChildClass.prototype.staticMethod();
      str += 'Static parent variable:\tJsChildClass.staticNo:\t' +
             JsChildClass.prototype.staticNo + '\n';

      var output = document.getElementById('output');
      output.innerHTML = str;
    } // function consoleOutput()
  </script>
  <script>
    function showTestCode() {
      var test = document.getElementById('test');
      var innerHTML = document.getElementById('testcode').innerHTML;
      test.innerHTML = innerHTML.trim().replace(/\n    /g, '\n');
    } // function showTestCode()
  </script>
</head>
<body onload="consoleOutput(); showTestCode();">
  <div style="margin:8px; float:left; width:43%;">
    <p style="font-weight:bold;">Source Code</p>
    <pre id="source" style="border:1px solid; padding:8px;"></pre>
  </div>
  <div style="margin:8px; float:right; width:53%;">
    <p style="font-weight:bold;">Console Output</p>
    <pre id="output" style="border:1px solid; padding:8px;"></pre>
  </div>
  <div style="margin:8px; float:right; width:53%;">
    <p style="font-weight:bold;">Test Code</p>
    <pre id="test" style="border:1px solid; padding:8px;"></pre>
  </div>
  <script id="jsclass">
    /**
     * Javascript class definition and constructor with parameter.
     * @author  Marco
     * @version  1.0
     */
    function JsClass(pubStr, priStr) {
      /**
       * Private variable: use "var" to define.
       */
      var privateStr = (!priStr) ? 'PRIVATE' : priStr;

      /**
       * Public variable: Use "this" to define.
       */
      this.publicStr = (!pubStr) ? 'PUBLIC' : pubStr;
      /**
       * Private method: use "var" to define -- Same as private variable.
       */

      var upperCaseOf = function(str) {
        return str.toUpperCase();
      }; // var upperCaseOf = function(str)

      /**
       * Public method: Use "this" to define -- Same as public variable.
       */
      this.getPrivateStr = function() {
        return upperCaseOf(privateStr);
      }; // this.getPrivateStr = function()
    } // function JsClass(pubStr, priStr)

    /**
     * Static variable is a property. DO place it outside of the class
     * definition. If not, every time a new instance is created, it will
     * be re-initialized.
     */
    JsClass.prototype.staticNo = 0;

    /**
     * Static method is a property function -- Same as static variable.
     * Placing outside of class definition is not mandatory.
     */
    JsClass.prototype.staticMethod = function() {
      JsClass.prototype.staticNo ++;
    }; // JsClass.prototype.staticMethod = function()


    /**
     * Inherit public and private members from parent
     */
    function JsChildClass(pubName, priName, pubStr, priStr) {
      //JsClass.call(this, the_only_parameter);
      JsClass.apply(this, new Array(pubStr, priStr));
    } // function JsChildClass(pubName, priName, pubStr, priStr)

    /**
     * Inherit static members from parent
     */
    JsChildClass.prototype = new JsClass();
  </script>
</body>
</html>
```

[1]: https://github.com/MarcoXZh/ProgrammingNotes/blob/master/JavaScript/JsClass/JsClass.js
[2]: https://github.com/MarcoXZh/ProgrammingNotes/blob/master/JavaScript/JsClass/JsChildClass.js
[3]: https://github.com/MarcoXZh/ProgrammingNotes/blob/master/JavaScript/JsClass/JsClass-Demo.html
