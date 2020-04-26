const list = document.querySelector('.todo__list');

const deleteTask = function(task) {
	list.removeChild(task);
};

const copyTask = function(task) {
	const clonedTask = task.cloneNode(true);
	task.after(clonedTask);
};

const editTask = function(task) {
	const onEditSubmitHandler = function(evt) {
		evt.preventDefault();
		text = input.value;
		task.querySelector('.task__name').textContent = text;
		input.value = '';
		form.removeEventListener('submit', onEditSubmitHandler);
		form.addEventListener('submit', onFormSubmitHandler);
	}

	input.focus();
	input.value = task.querySelector('.task__name').textContent;
	form.removeEventListener('submit', onFormSubmitHandler);
	form.addEventListener('submit', onEditSubmitHandler);
};

const createTaskElement = function() {
	const markup = `
		<li class="todo__item task">
      <div class="task__info">
        <p class="task__name"></p>
      </div>
      <div class="task__controls">
        <button class="task__btn task__btn_edit" type="button"><img src="./images/edit-icon.svg" width="24" height="23" alt="Редактировать"></button>
        <button class="task__btn task__btn_copy" type="button"><img src="./images/duplicate-icon.svg" width="25" height="25" alt="Копировать"></button>
        <button class="task__btn task__btn_delete" type="button"><img src="./images/delete-icon.svg" width="18" height="17" alt="Удалить"></button>
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

const onAnyTaskBtnHandler = function(evt) {
	const taskBtn = evt.target.closest('.task__btn');
	const task = evt.target.closest('.task');

	if (taskBtn.classList.contains('task__btn_delete')) {
		deleteTask(task);
	} else if (taskBtn.classList.contains('task__btn_copy')) {
		copyTask(task);
	} else if (taskBtn.classList.contains('task__btn_edit')) {
		editTask(task);
	}
};

form.addEventListener('submit', onFormSubmitHandler);
list.addEventListener('click', onAnyTaskBtnHandler);
