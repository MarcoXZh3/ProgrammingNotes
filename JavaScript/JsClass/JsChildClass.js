/**
 * Inherit public and private members from parent
 */
function JsChildClass(pubName, priName, pubStr, priStr) {
  //JsClass.call(this, the_only_parameter);    // Constructor with only one parameter
  JsClass.apply(this, [pubStr, priStr]);       // Constructor with multiple parameters
} // function JsChildClass(pubName, priName, pubStr, priStr)

/**
 * Inherit static members from parent
 */
JsChildClass.prototype = new JsClass();
