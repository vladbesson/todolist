const list = document.querySelector('.todo__list');

const createTaskElement = function() {
	const markup = `
		<li class="todo__item task">
      <div class="task__info">
        <p class="task__name"></p>
      </div>
      <div class="task__controls">
        <button class="task__btn task__btn_edit" type="button"><img class="task__img" src="./images/edit-icon.svg" width="24" height="23" alt="Редактировать"></button>
        <button class="task__btn task__btn_copy" type="button"><img class="task__img" src="./images/duplicate-icon.svg" width="25" height="25" alt="Копировать"></button>
        <button class="task__btn task__btn_delete" type="button"><img class="task__img" src="./images/delete-icon.svg" width="18" height="17" alt="Удалить"></button>
      </div>
    </li>
	`;

	const element = document.createElement('div');
	element.insertAdjacentHTML('afterbegin', markup);

	const task = element.querySelector('.task__name');
	task.addEventListener('blur', () => {
		task.setAttribute('contenteditable', false);
		task.classList.toggle('content-editable');
	})
	return element.firstElementChild;
};

const onTodoClickHandler = (event) => {
	const item = event.target.closest('.task');
	const list = item.closest('.todo__list');
	if (event.target.classList.contains('task__btn_delete')) {
		list.removeChild(item);
	}
	if (event.target.classList.contains('task__btn_copy')) {
		const newItem = item.cloneNode(true);
		item.after(newItem);
	}
	if (event.target.classList.contains('task__btn_edit')) {
		const itemTextEl = item.querySelector('.task__name');
		itemTextEl.setAttribute('contenteditable', true);
		itemTextEl.classList.toggle('content-editable');
		itemTextEl.focus();
	}
}

const renderSingleTask = function(name) {
	const newTask = createTaskElement();
	newTask.querySelector('.task__name').textContent = name;
	list.appendChild(newTask);
};

const onFormSubmitHandler = function (evt) {
	evt.preventDefault();
	const input = document.querySelector('.todo__input');
	renderSingleTask(input.value);
	input.value = '';
};

const init = () => {
	const form = document.querySelector('.todo__form');
	form.addEventListener('submit', onFormSubmitHandler);

	const list = document.querySelector('.todo__list');
	list.addEventListener('click', onTodoClickHandler);

	// пройтись по массиву данных циклом
	tasks.forEach(function(task) {
		renderSingleTask(task.name);
	});
}

init();