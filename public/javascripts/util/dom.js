import { toArray } from './array';

/**
 * Removes a node from the DOM.
 * @param {HTMLElement} node Node to remove from the document
 * @returns {Node} The node removed from the document.
 */
export function remove(node) {
  const parent = node.parentNode || document;
  return parent.removeChild(node);
}

/**
 * Appends a list of nodes to the target element as its children.
 * @param {HTMLElement} target Target element
 * @param {HTMLElement[]|NodeList} children Child nodes to append
 * @returns {HTMLElement} The target element, after the children are appended
 */
export function appendChildren(target, children) {
  if (!Array.isArray(children) && children instanceof NodeList) {
    children = toArray(children);
  } else {
    throw new TypeError(`Invalid type for children; must be Array or NodeList. Found ${typeof children}.`);
  }

  // Use a fragment to avoid repaints.
  const fragment = children.reduce((fragment, child) => {
    fragment.appendChild(child);
    return fragment;
  }, document.createDocumentFragment());

  target.appendChild(fragment);
  return target;
}

/**
 * Appends DOM created from HTML to target element.
 * @param {HTMLElement} target Element to append the HTML to
 * @param {string} html HTML to append to the target element
 * @returns {NodeList} List of nodes appended to the target
 */
export function appendHtml(target, html) {
  const nodes = inflateHtml(html);
  appendChildren(target, nodes);
  return nodes;
}

/**
 * Creates DOM nodes from HTML.
 * @param {string} html HTML to inflate into DOM nodes
 * @returns {NodeList} List of nodes created from the HTML
 */
export function inflateHtml(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.childNodes;
}
