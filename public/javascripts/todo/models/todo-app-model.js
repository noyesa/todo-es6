import { Collection } from '../../framework/model';
import { fetchJSON } from '../../net/fetch';
import TodoModel from './todo-model';

export default class TodoAppModel extends Collection {
  static fetch(endpoint) {
    return fetchJSON(endpoint).then(json => TodoAppModel.fromJSON(json.todos));
  }

  static fromJSON(json) {
    if (Array.isArray(json)) {
      const todos = json.map(TodoModel.fromJSON);
      return new TodoAppModel(todos);
    } else {
      throw new Error(`Expected JSON to be an array; found ${typeof json}`);
    }
  }
}