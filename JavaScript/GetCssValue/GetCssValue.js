/**
 * Get a final CSS style value of an element.
 * If not support the property,
 * Firefox return '';
 * Chrome, Opera and Safari return null;
 * IE return '' or undefined
 * @param element  The element to get style
 * @param property  The full CSS style
 * @returns      value of the style
 */
function getCssValue(element, property) {
  // Note: Currently, all browsers support "document.defaultView..."
  if (element.style[property])
    return element.style[property];
  else if (element.currentStyle)
    // Only IE supports currentStyle
    // If not support the property,
    // it returns '' or undefined
    return element.currentStyle[property];
  else if (document.defaultView && document.defaultView.getComputedStyle)
    // If not support the property,
    // IE and Firefox return '';
    // Chrome, Opera and Safari return null.
    return document.defaultView.getComputedStyle(element).getPropertyValue(property);
  return null;
} // function getCssValue(element, property)
