/**
 * JavaScript class definition and constructor with parameter.
 * @param pubString     {String} A public string member variable
 * @param priString     {String} A private string member variable
 * @author  Marco
 * @version  1.0
 */
function JsClass(pubStr, priStr) {
    /**
     * Private variable: use <code>"var"</code> to define.
     */
    var privateStr = (!priStr) ? 'PRIVATE' : priStr;

    /**
     * Public variable: Use <code>"this"</code> to define.
     */
    this.publicStr = (!pubStr) ? 'PUBLIC' : pubStr;

    /**
     * Private method: use <code>"var"</code> to define -- Same as private variable.
     */
    var upperCaseOf = function(str) {
        return str.toUpperCase();
    }; // var upperCaseOf = function(str)

    /**
     * Public method: Use <code>"this"</code> to define -- Same as public variable.
     */
    this.getPrivateStr = function() {
        return upperCaseOf(privateStr);
    }; // this.getPrivateStr = function()
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
}; // JsClass.prototype.staticMethod = function()
