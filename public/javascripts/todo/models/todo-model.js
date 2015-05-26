import { assign } from '../../util/object';

export default class Todo {
  constructor(id, done, title, description) {
    assign(this, { id, done, title, description });
  }

  static fromJSON(json) {
    const { id, done, title, description } = json;
    return new Todo(id, done, title, description);
  }
}