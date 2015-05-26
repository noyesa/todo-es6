import TodoAppView from '../views/todo-app-view';
import TodoAppModel from '../models/todo-app-model';
import { fetchJSON } from '../../net/fetch';

const todosEndpoint = 'api/todos.json';

export default class TodoAppController {
  constructor(target) {
    this.target = target;
    this.view = new TodoAppView(this.target);
  }

  init() {
    this.collection = fetchJSON(todosEndpoint)
      .then(json => json.todos)
      .then(TodoAppModel.fromJSON);

    this.render();
  }

  render() {
    this.view.render(this.collection.then(todos => todos.items()));
  }
}