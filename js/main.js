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

	return element.firstElementChild;
};

const singleTaskHandler = (event) => {
	if (event.target.classList.contains('task__btn_delete')) {
		const item = event.target.closest('.task');
		const list = item.closest('.todo__list');
		console.log(event.target);
		console.log(list);
		list.removeChild(item);
	}
}

const renderSingleTask = function(name) {
	const newTask = createTaskElement();
	newTask.querySelector('.task__name').textContent = name;
	newTask.addEventListener('click', singleTaskHandler)

	const copyButton = newTask.querySelector('.task__btn_copy');
	const editButton = newTask.querySelector('.task__btn_edit');

	editButton.addEventListener('click', function (evt) {
		const text = prompt('Введите новый текст');
		const task = evt.currentTarget.closest('.task');
		task.querySelector('.task__name').textContent = text;
	});

	copyButton.addEventListener('click', function (evt) {
		const task = evt.currentTarget.closest('.task');
		const clonedTask = task.cloneNode(true);
		task.after(clonedTask);
	});

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
