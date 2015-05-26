import { remove as removeNode } from '../util/dom';
import SimpleHashMap from '../util/simple-hash-map';

/**
 * The 'type' attribute of a template script node.
 * @const {string}
 */
const templateNodeType = 'text/x-handlebars-template';

/**
 * A cache of retrieved templates so they aren't pulled from the DOM and
 * compiled each time they are retrieved.
 * @type {SimpleHashMap}
 */
const templateCache = new SimpleHashMap();

/**
 * Builds a selector for a template with a given ID.
 * @param {string} templateId ID of the template for which to build a selector
 * @returns {string} Selector for the template
 */
function getTemplateSelector(templateId) {
  return `script#${templateId}[type="${templateNodeType}"]`;
}

/**
 * Gets the script node from a template from the DOM.
 * @param {string} templateId ID of the template to retrieve
 * @returns {HTMLScriptElement|boolean} False if the template node isn't found, node otherwise
 */
function getTemplateNode(templateId) {
  const templateSelector = getTemplateSelector(templateId),
    templateNode = document.querySelector(templateSelector);
  if (templateNode instanceof HTMLScriptElement) {
    return templateNode;
  } else {
    return false;
  }
}

/**
 * Retrieves a template from a script node in the DOM.
 * @param {string} templateId ID of the template to retrieve
 * @returns {Function|undefined} Returns the template function if it's found, otherwise undefined
 */
export function getTemplate(templateId) {
  if (templateCache.has(templateId)) {
    return templateCache.retrieve(templateId);
  } else {
    const templateNode = getTemplateNode(templateId);
    if (templateNode) {
      const template = Handlebars.compile(templateNode.innerHTML);
      removeNode(templateNode);
      templateCache.add(templateId, template);
      return template;
    }
  }
}

/**
 * Gets a template from the DOM, or throws an exception if it isn't found.
 * @param {string} templateId ID of the template to find
 * @returns {Function|undefined} Template, if found
 * @throws {Error} Throws an error if the template can't be found
 */
export function getTemplateOrThrow(templateId) {
  const template = getTemplate(templateId);
  if (template) {
    return template;
  } else {
    throw new Error(`Unable to find template with ID ${templateId}`);
  }
}
