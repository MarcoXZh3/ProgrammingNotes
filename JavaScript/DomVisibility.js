/**
 * Check if a DOM node is visible or not
 * @param  tagName     Name of the tag
 * @returns {Boolean}  true if invisible or false if visible
 */
function isNodeVisible(node) {
  var visibility = true;
  if (! isVisibleTag(node.tagName))
    visibility = false;
  else if (getCssValue(node, 'display') === 'none')
    visibility = false;
  else if (getCssValue(node, 'visibility') === 'hidden')
    visibility = false;
  else if (node.offsetHeight === 0 || node.offsetWidth === 0)
    visibility = false;
  return visibility;
} // function isNodeVisible(node)

/**
 * Get a final CSS style value of an element.
 * If not support the property,
 * Firefox return '';
 * Chrome, Opera and Safari return null;
 * IE return '' or undefined
 * @param element   The element to get style
 * @param property  The full CSS style
 * @returns         value of the style
 */
function getCssValue(element, property) {
  // Note: Currently, all browsers support "document.defaultView..."
  if (element.style[property])
    return element.style[property];
  else if (element.currentStyle)
    // Only IE supports currentStyle
    // If not support the property, it returns '' or undefined
    return element.currentStyle[property];
  else if (document.defaultView && document.defaultView.getComputedStyle)
    // If not support the property,
    // IE and Firefox return ''; Chrome, Opera and Safari return null.
    return document.defaultView.getComputedStyle(element).getPropertyValue(property);
  return null;
} // function getCssValue(element, property)

/**
 * Check if a tag is invisible or not
 * @param  tagName     Name of the tag
 * @returns {Boolean}  true if invisible or false if visible
 */
function isVisibleTag(tagName) {
  var invisibleTags = ['applet',  'base',    'basefont',  'head',      'html',
                       'link',    'meta',    'noframes',  'noscript',  'param',
                       'script',  'source',  'style',     'title',     'track'
                      ]; // var invisibleTags = [ ... ];
  var visibility = true;
  for (var i = 0; i < invisibleTags.length; i++)
    if (tagName.toLowerCase() === invisibleTags[i])
      visibility = false;
  return visibility;
} // function isVisibleTag(tagName)
