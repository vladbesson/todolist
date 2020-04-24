const list = document.querySelector('.todo__list');

function createTaskElement() {
	const markup = `
		<li class="todo__item task">
      <div class="task__info">
				<p class="task__name"></p>
				<form class="edit-form" name="edit">
					<input type="text" name="task" class="input edit-form__input" required placeholder="Изменить задачу">
					<button type="submit" class="button edit-form__button">
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
	if (event.target.classList.contains('task__img_edit')) {
		const task = evt.target.closest('.task');
		task.querySelector('.edit-form').classList.add('edit-form_active');
		task.querySelector('.task__name').classList.add('task__name_inactive');
		const editForm = document.forms.edit;
		editForm.addEventListener('submit', editText);
	}
}

function editText(evt) {
	evt.preventDefault();

	const task = evt.target.closest('.task');
	const newTask = document.forms.edit.elements.task;

	task.querySelector('.task__name').textContent = newTask.value;

	task.querySelector('.edit-form').classList.remove('edit-form_active');
	task.querySelector('.task__name').classList.remove('task__name_inactive');
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