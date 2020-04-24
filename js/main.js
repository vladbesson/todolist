const list = document.querySelector('.todo__list');
const form = document.querySelector('.todo__form');
const input = document.querySelector('.todo__input');

const createTaskElement = function () {
	const markup = `
		<li class="todo__item task">
      <div class="task__info">
        <p class="task__name">${}</p>
      </div>
      <div class="task__controls">
        <button class="task__btn task__btn_edit" type="button" aria-label="Редактировать"></button>
        <button class="task__btn task__btn_copy" type="button" aria-label="Копировать"></button>
        <button class="task__btn task__btn_delete" type="button" aria-label="Удалить"></button>
      </div>
    </li>
	`;

	const element = document.createElement('div');
	element.insertAdjacentHTML('afterbegin', markup);

	return element.firstElementChild;
};

const renderSingleTask = (name) => {
	const newTask = createTaskElement();
	newTask.querySelector('.task__name').textContent = name;
	list.appendChild(newTask);
};

const onFormSubmitHandler = (e) => {
	e.preventDefault();
	renderSingleTask(input.value);
	form.reset();
};

const controlSingleTask = (e) => {
	let target = e.target;

	if (target.classList.contains('task__btn_delete')) {
		target.closest('.task').remove();
	}

	if (target.classList.contains('task__btn_copy')) {
		renderSingleTask(target.closest('.task').textContent);
	}

	if (target.classList.contains('task__btn_edit')) {
		const taskName = target.closest('.task').querySelector('.task__name');
		taskName.setAttribute('contenteditable', 'true');
		taskName.classList.add('task__name_editable');

		taskName.addEventListener('keydown', function (e) {
			if (e.keyCode === 13) {
				e.preventDefault();
				if (taskName.innerHTML !== '') {
					taskName.removeAttribute('contenteditable');
					taskName.classList.remove('task__name_editable');
				}
			}
		});
	}
};

form.addEventListener('submit', onFormSubmitHandler);

list.addEventListener('click', controlSingleTask);

(function showInitialTasks() {
	tasks.forEach(function (task) {
		renderSingleTask(task.name);
	});
})();