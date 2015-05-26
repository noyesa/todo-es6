import { assign } from './object';

/**
 * A very simple and naive map implementation.
 */
export default class SimpleHashMap {
  /**
   * Create the map instance.
   * @param {object} values Values to initialize with
   */
  constructor(values = {}) {
    this.values = Object.create(null);
    assign(this.values, values);
  }

  /**
   * Adds an object to the map.
   * @param {string} key Key of the object
   * @param {object} value Object to store under key
   */
  add(key, value) {
    this.values[key] = value;
  }

  /**
   * Retrieves the value stored under key.
   * @param {string} key Key of value to retrieve
   * @returns {object|undefined} Value stored under key, or undefined
   */
  retrieve(key) {
    return this.values[key];
  }

  /**
   * Does the map contain a value named key?
   * @param {string} key Key of the value
   * @returns {boolean} Does the map contain that key?
   */
  has(key) {
    const value = this.retrieve(key);
    return typeof value !== 'undefined';
  }

  /**
   * Removes a key from the map such that has(key) returns false.
   * @param {string} key Key to delete from the map entirely
   */
  remove(key) {
    delete this.values[key];
  }
}