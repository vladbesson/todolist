const list = document.querySelector('.todo__list');
const form = document.querySelector('.todo__form');
const input = document.querySelector('.todo__input');

const createTaskElement = (name) => {
	const markup = `
		<li class="todo__item task">
      <div class="task__info">
        <p class="task__name">${name}</p>
      </div>
      <div class="task__controls">
        <button class="task__btn task__btn_edit" type="button" aria-label="Редактировать"></button>
        <button class="task__btn task__btn_copy" type="button" aria-label="Копировать"></button>
        <button class="task__btn task__btn_delete" type="button" aria-label="Удалить"></button>
      </div>
    </li>
	`;

	return markup;
};

const renderSingleTask = (name) => {
	list.insertAdjacentHTML('afterbegin', createTaskElement(name));
};

const onFormSubmitHandler = (e) => {
	e.preventDefault();
	renderSingleTask(input.value);
	form.reset();
};

const editTaskHandler = (e) => {
	if (e.keyCode === 13) {
		e.preventDefault();

		if (this.innerHTML === '') return;

		this.removeAttribute('contenteditable');
		this.classList.remove('task__name_editable');
	}
}

const controlSingleTask = (e) => {
	const target = e.target;
	const task = target.closest('.task');

	if (target.classList.contains('task__btn_delete')) {
		task.remove();
	}

	if (target.classList.contains('task__btn_copy')) {
		renderSingleTask(task.textContent);
	}

	if (target.classList.contains('task__btn_edit')) {
		const taskName = task.querySelector('.task__name');
		taskName.setAttribute('contenteditable', 'true');
		taskName.classList.add('task__name_editable');

		taskName.addEventListener('keydown', editTaskHandler);
	}
};

form.addEventListener('submit', onFormSubmitHandler);

list.addEventListener('click', controlSingleTask);

(function showInitialTasks() {
	tasks.forEach(task => renderSingleTask(task.name));
})();