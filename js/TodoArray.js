
class TodoArray {
    constructor(list, tasks, Todo) {
        this.list = list;
        this.tasks = tasks;
        this.Todo = Todo;
    }

    newTask(task){
      return `
		<li class="todo__item task">
      <div class="task__info">
        <p class="task__name">${this.Todo.sanitizeHTMLUpdate(task)}</p>
      </div>
      <div class="task__controls">
        <button class="task__btn task__btn_edit" type="button"><img  class="task__btn_edit" src="./images/edit-icon.svg" width="24" height="23" alt="Редактировать"></button>
        <button class="task__btn task__btn_copy" type="button"><img class="task__btn_copy" src="./images/duplicate-icon.svg" width="25" height="25" alt="Копировать"></button>
        <button class="task__btn task__btn_delete" type="button"><img class="task__btn_delete" src="./images/delete-icon.svg" width="18" height="17" alt="Удалить"></button>
      </div>
    </li>
	`;
    }

    addTask(task){
    return this.list.insertAdjacentHTML('afterbegin', this.newTask(task));
    }

    render() {
        this.tasks.forEach((task) => {
            this.addTask(task.name);
        })
    }

    addListeners(){
        this.list.addEventListener('click', this.Todo.editTask);
        this.list.addEventListener('click', this.Todo.delTask);
        this.list.addEventListener('click', this.Todo.copyTask);
    }
}

