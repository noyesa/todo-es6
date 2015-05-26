import TodoAppController from 'todo/controllers/todo-app-controller';

const target = document.getElementById('todo-app'),
  todoController = new TodoAppController(target);

todoController.init();
