const list = document.querySelector('.todo__list');
const form = document.querySelector('.todo__form');
const input = document.querySelector('.todo__input');

function createTaskElement() {
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
}

function renderSingleTask (name) {
	const newTask = createTaskElement();
	newTask.querySelector('.task__name').textContent = name;
	list.appendChild(newTask);
}

function renderCollection (array) {
	array.forEach(function(item) {
		renderSingleTask(item.name);
	});
}

function deleteTask (event) {
	if (event.target.getAttribute('alt') === 'Удалить') {
		const task = event.target.closest('.task');
		list.removeChild(task);
	}
}

function editTask (event) {
	if (event.target.getAttribute('alt') === 'Редактировать') {
		const text = prompt('Введите новый текст');
		const task = event.target.closest('.task');
		if (text !== null) {
			task.querySelector('.task__name').textContent = text;
		}
	}
}

function copyTask (event) {
	if (event.target.getAttribute('alt') === 'Копировать') {
		const task = event.target.closest('.task');
		const clonedTask = task.cloneNode(true);
		task.after(clonedTask);
	}
}

function onFormSubmitHandler (event) {
	event.preventDefault();
	renderSingleTask(input.value);
	input.value = '';
};

list.addEventListener('click', copyTask);
list.addEventListener('click', deleteTask);
list.addEventListener('click', editTask);
form.addEventListener('submit', onFormSubmitHandler);

renderCollection(tasks);






