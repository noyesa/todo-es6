import { toArray } from '../util/array';

export class Collection {
  constructor(collection = []) {
    if (Array.isArray(collection)) {
      // Make a copy of the collection so we don't mutate the argument object.
      this.collection = toArray(collection);
    } else {
      throw new Error(`First argument to Collection constructor must be Array; found ${typeof collection}`);
    }
  }

  items() {
    return toArray(this.collection);
  }
}