import { getTemplateOrThrow } from '../../framework/view-helpers';
import { appendHtml } from '../../util/dom';

const templateId = 'todo-list-view-template';

export default class TodoListView {
  constructor(target, options = {}) {
    this.target = target;
    this.template = options.template || getTemplateOrThrow(templateId);
  }

  render(json) {
    const html = this.template({ todos: json });
    appendHtml(this.target, html);
  }
}
