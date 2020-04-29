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

const deleteButtonFunction = function(nameOfTheTask) {
	const deleteButton = nameOfTheTask.querySelector('.task__btn_delete');

	deleteButton.addEventListener('click', function (evt) {
		const task = evt.currentTarget.closest('.task');
		list.removeChild(task);
	});
};

const editButtonFunction = function (nameOfTheTask) {
	const editButton = nameOfTheTask.querySelector('.task__btn_edit');

	editButton.addEventListener('click', function (evt) {
		const text = prodcmpt('Введите название новой задачи');
		const task = evt.currentTarget.closest('.task');
		if (text.length === 0) {
			alert('Нужно ввести новое название задачи!!!');
		}
		else
			task.querySelector('.task__name').textContent = text;
	});
};

const copyButtonFunction = function (nameOfTheTask) {
	const copyButton = nameOfTheTask.querySelector('.task__btn_copy');

	copyButton.addEventListener('click', function (evt) {
		const task = evt.currentTarget.closest('.task');
		const clonedTask = task.cloneNode(true);
		deleteButtonFunction(clonedTask);
		editButtonFunction(clonedTask);
		copyButtonFunction(clonedTask);
		task.after(clonedTask);
	});
};

const renderSingleTask = function(name) {
	const newTask = createTaskElement();
	newTask.querySelector('.task__name').textContent = name;

	deleteButtonFunction(newTask);
	editButtonFunction(newTask);
	copyButtonFunction(newTask);

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

form.addEventListener('submit', onFormSubmitHandler);
