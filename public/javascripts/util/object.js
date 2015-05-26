import { imperative } from './fn';

const hasOwn = imperative(Object.prototype.hasOwnProperty);

/**
 * Shim for Object.assign. Copies all the own properties from the source object
 * to the destination object.
 * @param {object} dest Destination object
 * @param {object} src Source object
 * @returns {object} Destination object
 */
export function assign(dest, src) {
  let keys = Object.keys(src);
  return keys.reduce((dest, key) => {
    dest[key] = src[key];
    return dest;
  }, dest);
}

/**
 * Copies all the properties on the defaults object to the target object if
 * not already defined there.
 * @param {object} target Object that will recieve defaults
 * @param {object} defaults Default values to copy to target
 * @returns {object} The target object
 */
export function defaults(target, defaults) {
  let keys = Object.keys(defaults);
  return keys.reduce((target, key) => {
    if (!hasOwn(target, key)) {
      target[key] = defaults[key];
    }
    return target;
  }, target);
}

/**
 * Returns an object containing only the properties named by the properties
 * argument.
 * @param {object} o Object from which to pick properties
 * @param {string[]} properties Properties to pick from the object
 * @returns {object} A new object containing only the whitelisted properties
 */
export function pick(o, properties) {
  return properties.reduce((acc, property) => {
    acc[property] = o[property];
    return acc;
  }, {});
}