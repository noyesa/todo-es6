import { imperative } from './fn';

/**
 * Imperative version of the Array.prototype.slice method.
 * @const {Function}
 */
const slice = imperative(Array.prototype.slice);

/**
 * Converts an array-like thing into a "real" array.
 * @param {object} o Object to convert to an array
 * @returns {Array} Array version of object, if operation succeeded
 */
export function toArray(o) {
  if (typeof o.length === 'number') {
    return slice(o);
  } else {
    throw new TypeError('Input object must have a length property to be converted.');
  }
}