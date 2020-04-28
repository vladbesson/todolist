const list = document.querySelector('.todo__list');

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

tasks.forEach(function(task) {
	renderSingleTask(task.name);
});

const form = document.querySelector('.todo__form');
const input = document.querySelector('.todo__input');

const formReset = (form) => form.reset();

form.addEventListener('submit', (event) => {
	event.preventDefault();
	renderSingleTask(input.value);
	formReset(form);
});

list.addEventListener('click', (event) => {
	event.target.parentElement.classList.contains('task__btn_delete') ? event.target.closest('.task').remove() : 0;
});

list.addEventListener('click', (event) => {
	if (event.target.parentElement.classList.contains('task__btn_copy')) {
		const cloneNode = event.target.closest('.task').cloneNode(true);
		event.target.closest('.task').after(cloneNode);
	}
});

function createInput(inputValue) {
	const input = `<input class="task__name edit-input" type="text" required>`;
	const element = document.createElement('div');
	element.insertAdjacentHTML('afterbegin', input);
	element.firstElementChild.value = inputValue;
	return element.firstElementChild;
}

function editTask(event) {
	if(event.target.parentElement.classList.contains('task__btn_edit')) {
		const taskName = event.target.closest('.task').querySelector('.task__name');
		taskName.before(createInput(taskName.textContent));
		taskName.remove();

		const focusedInput = document.querySelector('.edit-input');
		focusedInput.focus();

		const saveNewTaskVAlue = (event) => {
			event.type === 'keypress' ? focusedInput.removeEventListener('blur', saveNewTaskVAlue) : 0;

			if(event.type === 'blur' || event.key === 'Enter') {
				const newTextValue = event.target.value;
				newTextValue !== '' ? taskName.textContent = newTextValue : 0;
				focusedInput.before(taskName);
				focusedInput.remove();
			}
		}

		focusedInput.addEventListener('blur', saveNewTaskVAlue);
		focusedInput.addEventListener('keypress', saveNewTaskVAlue);
	}
}

list.addEventListener('click', editTask);
