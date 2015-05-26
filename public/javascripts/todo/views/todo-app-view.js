import { getTemplateOrThrow } from '../../framework/view-helpers';
import TodoFormView from './todo-form-view';
import TodoListView from './todo-list-view';

export default class TodoAppView {
  constructor(target) {
    this.target = target;
    this.formView = new TodoFormView(this.target);
    this.listView = new TodoListView(this.target);
  }

  render(todosPromise) {
    this.formView.render();
    todosPromise.then(todos => this.listView.render(todos));
  }
}
