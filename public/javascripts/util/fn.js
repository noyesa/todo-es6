/**
 * Local reference to the 'call' method from the Function prototype.
 * @const {Function}
 */
const call = Function.prototype.call;

/**
 * Takes a method originally plucked from the prototype of an object and
 * converts it to an imperative one where the first argument is the target
 * object and the arguments follow.
 * @param {Function} method Method to convert to imperative style
 * @returns {Function} Imperative version of the input method
 */
export function imperative(method) {
  return function() {
    return call.apply(method, arguments);
  };
}

export function getterWithCaching(getter, context) {
  let cache;
  return function() {
    if (typeof cache === 'undefined' || cache === null) {
      cache = getter.apply(context, arguments);
    }
    return cache;
  };
}