const list = document.querySelector('.todo__list');

const createTaskElement = function () {
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

const putListeners = function (task) {
	const deleteButton = task.querySelector('.task__btn_delete');
	const copyButton = task.querySelector('.task__btn_copy');
	const editButton = task.querySelector('.task__btn_edit');
	deleteButton.addEventListener('click', deleteCard);
	editButton.addEventListener('click', editCard);
	copyButton.addEventListener('click', copyCard);
};

const deleteCard = function (evt) {
	const task = evt.currentTarget.closest('.task');
	list.removeChild(task);
};

const editCard = function (evt) {
	const task = evt.currentTarget.closest('.task');
	const taskInfo = task.querySelector('.task__info');
	let taskName = task.querySelector('.task__name');

	const markup = `
	<form name="edit">
		<input required>
		<button type="submit">Ок</button>
	</form>
	`;
	taskInfo.insertAdjacentHTML('afterbegin', markup);

	const form = document.forms.edit;
	const input = form.elements[0];
	input.setAttribute('value', taskName.textContent);
	taskInfo.removeChild(taskName);
	input.focus();
	input.selectionStart = input.value.length;

	input.addEventListener('keydown', function (evt) {
		if (evt.keyCode === 27) {
			input.blur();
			taskInfo.removeChild(form);
			taskInfo.appendChild(taskName);
		};
	});

	form.addEventListener('submit', function (evt) {
		evt.preventDefault();
		taskName.textContent = input.value;
		taskInfo.removeChild(form);
		taskInfo.appendChild(taskName);
	});
}

const copyCard = function (evt) {
	const task = evt.currentTarget.closest('.task');
	const clonedTask = task.cloneNode(true);
	putListeners(clonedTask);
	task.after(clonedTask);
};

const renderSingleTask = function (name) {
	const newTask = createTaskElement();
	newTask.querySelector('.task__name').textContent = name;
	putListeners(newTask);
	list.appendChild(newTask);
};

// пройтись по массиву данных циклом
tasks.forEach(function (task) {
	renderSingleTask(task.name);
});

const form = document.querySelector('.todo__form');
const input = document.querySelector('.todo__input');

const onFormSubmitHandler = function (evt) {
	evt.preventDefault();
	renderSingleTask(input.value);
	input.value = '';
};

form.addEventListener('submit', onFormSubmitHandler);
