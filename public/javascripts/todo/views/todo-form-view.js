import { getTemplateOrThrow } from '../../framework/view-helpers';
import { appendHtml } from '../../util/dom';

const templateId = 'todo-form-view-template';

export default class TodoFormView {
  constructor(target, options = {}) {
    this.target = target;
    this.template = options.template || getTemplateOrThrow(templateId);
  }

  render() {
    const html = this.template();
    appendHtml(this.target, html);
  }
}