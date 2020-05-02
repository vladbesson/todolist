const list = document.querySelector('.todo__list');
debugger;
function createTaskElement() {
	const markup = `
		<li class="todo__item task">
      <div class="task__info">
				<p class="task__name"></p>
				<form class="edit-form" name="edit">
					<input type="text" name="task" class="input edit-form__input" required">
				</form>
      </div>
      <div class="task__controls">
        <button class="task__btn task__btn_edit" type="button"><img class="task__img task__img_edit" src="./images/edit-icon.svg" width="24" height="23" alt="Редактировать"></button>
        <button class="task__btn task__btn_copy" type="button"><img class="task__img task__img_copy" src="./images/duplicate-icon.svg" width="25" height="25" alt="Копировать"></button>
        <button class="task__btn task__btn_delete" type="button"><img class="task__img task__img_delete" src="./images/delete-icon.svg" width="18" height="17" alt="Удалить"></button>
      </div>
    </li>
	`;

	const element = document.createElement('div');

	element.insertAdjacentHTML('afterbegin', markup);

	return element.firstElementChild;
};

function renderSingleTask(name) {
	const newTask = createTaskElement();

	newTask.querySelector('.task__name').textContent = name;

	list.appendChild(newTask);
};

tasks.forEach(function (task) {
	renderSingleTask(task.name);
});

const form = document.querySelector('.todo__form');
const input = document.querySelector('.todo__input');

function onFormSubmitHandler(evt) {
	evt.preventDefault();
	renderSingleTask(input.value);
	input.value = '';
};

function removeTask(evt) {
	if (event.target.classList.contains('task__img_delete')) {
		list.removeChild(event.target.closest('.task'));
	}
}

function editTask(evt) {
	if (evt.target.classList.contains('task__img_edit')) {
		const task = evt.target.closest('.task');

		const textValue = task.querySelector('.task__name').textContent;

		task.querySelector('.edit-form').classList.add('edit-form_active');
		task.querySelector('.edit-form__input').value = textValue;
		task.querySelector('.edit-form__input').focus();
		task.querySelector('.task__name').classList.add('task__name_inactive');

		document.addEventListener('keydown', escapeHandler(task));
		document.addEventListener('click', clickOutsideForm(task));
		document.addEventListener('submit', enterForm(task));
	}
}

function escapeHandler(task) {
	return function (evt) {
		if (evt.key === 'Escape') {
			task.querySelector('.edit-form').classList.remove('edit-form_active');
			task.querySelector('.task__name').classList.remove('task__name_inactive');
		}
	}
}

function enterForm(task) {
	return function (evt) {
		evt.preventDefault();
		task.querySelector('.task__name').textContent = task.querySelector('.edit-form__input').value;
		task.querySelector('.edit-form').classList.remove('edit-form_active');
		task.querySelector('.task__name').classList.remove('task__name_inactive');
	}
}

function clickOutsideForm(task) {
	return function (evt) {
		
	}
}


function copyTask(evt) {
	if (event.target.classList.contains('task__img_copy')) {
		const task = evt.target.closest('.task');
		const clonedTask = task.cloneNode(true);
		task.after(clonedTask);
	}
}

form.addEventListener('submit', onFormSubmitHandler);
list.addEventListener('click', removeTask);
list.addEventListener('click', editTask);
list.addEventListener('click', copyTask);