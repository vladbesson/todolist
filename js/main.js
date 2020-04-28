const list = document.querySelector('.todo__list');

const createTaskElement = function() {
	const markup = `
		<li class="todo__item task">
      <div class="task__info">
        <p class="task__name"></p>
      </div>
      <div class="task__controls">
        <button class="task__btn task__btn_edit" type="button"><img class="task__btn_edit-img" src="./images/edit-icon.svg" width="24" height="23" alt="Редактировать"></button>
        <button class="task__btn task__btn_copy" type="button"><img class="task__btn_copy-img" src="./images/duplicate-icon.svg" width="25" height="25" alt="Копировать"></button>
        <button class="task__btn task__btn_delete" type="button"><img class="task__btn_delete-img" src="./images/delete-icon.svg" width="18" height="17" alt="Удалить"></button>
      </div>
    </li>
	`;
	const element = document.createElement('div');
	element.insertAdjacentHTML('afterbegin', markup);
	return element.firstElementChild;
};

const renderSingleTask = function(name) {
	const newTask = createTaskElement();
	newTask.querySelector('.task__name').textContent = name;
	list.appendChild(newTask);
};

// пройтись по массиву данных циклом
tasks.forEach(function(task) {
	renderSingleTask(task.name);
});

const form = document.querySelector('.todo__form');
const input = document.querySelector('.todo__input');

const onFormSubmitHandler = function (evt) {
	evt.preventDefault();
	renderSingleTask(input.value);
	input.value = '';
};

//функция клонирования задачи
const cloneTask = function(evt) {
	const task = evt.target.closest('.task');
	const clonedTask = task.cloneNode(true);
	task.after(clonedTask);
};

//функция удаления задачи
const deleteTask = function (evt) {
	const task = evt.target.closest('.task');
	list.removeChild(task);
}

//функция редактирования задачи
const editTask = function (evt) {
	const task = evt.target.closest('.task');
	const taskName = task.querySelector('.task__name');
	const markup = `
		<input class="todo__input input input-task-edit" type="text" value="${taskName.textContent}">
	`;
	task.insertAdjacentHTML('afterbegin', markup);
	const inputEdit = task.querySelector('input');
	taskName.classList.add('task_hide'); //спрятать текст задачи
	inputEdit.focus(); //фокус на поле ввода
	inputEdit.selectionStart = inputEdit.value.length;//курсор в конец строки
	inputEdit.onblur = function() {
		taskName.textContent = inputEdit.value;
		taskName.classList.remove('task_hide');
		task.removeChild(inputEdit);
	};
};

//обработчик кликов 
list.addEventListener('click', (evt) => {
		if (evt.target.classList.contains('task__btn_edit-img')) {
			editTask(evt)
		} else if (evt.target.classList.contains('task__btn_copy-img')) {
			cloneTask(evt);
		} else if (evt.target.classList.contains('task__btn_delete-img')) {
			deleteTask(evt);
		}
	})

form.addEventListener('submit', onFormSubmitHandler);