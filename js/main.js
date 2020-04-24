const list = document.querySelector('.todo__list'),
	form = document.querySelector('.todo__form'),
	input = document.querySelector('.todo__input');

const onFormSubmitHandler = function (event) {
	event.preventDefault();
	renderSingleTask(input.value);
	input.value = '';
};

const itemEditorHandler = function (event) {
	event.preventDefault();
	taskName.textContent = input.value;
	input.setAttribute('placeholder', 'Разобраться в замыканиях');
	input.value = '';
	form.addEventListener('submit', onFormSubmitHandler);
	form.removeEventListener('submit', itemEditorHandler);
};

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
	console.log(element);
	return element.firstElementChild;
};

const renderSingleTask = function (name) {
	const newTask = createTaskElement();
	newTask.querySelector('.task__name').textContent = name;
	list.appendChild(newTask);
};

// пройтись по массиву данных циклом
tasks.forEach(function (task) {
	renderSingleTask(task.name);
});

function copyItem(evt) {
	const task = evt.target.closest('.task');
	const clonedTask = task.cloneNode(true);
	task.after(clonedTask);
}

function deleteItem(evt) {
	const task = evt.target.closest('.task');
	list.removeChild(task);
}

function editItem(evt) {
	form.removeEventListener('submit', onFormSubmitHandler);
	const task = evt.target.closest('.task');
	taskName = task.querySelector('.task__name');
	taskName.textContent = '';
	input.value = '';
	input.focus();
	input.setAttribute('placeholder', 'Отредактируйте текст');
	form.addEventListener('submit', itemEditorHandler);
}

function setItemFunctions(evt) {
	const attribute = evt.target.getAttribute('alt');
	if (attribute == 'Копировать') {
		copyItem(evt);
	}
	if (attribute == 'Удалить') {
		deleteItem(evt);
	}
	if (attribute == 'Редактировать') {
		editItem(evt);
	}
}

list.addEventListener('click', setItemFunctions);
form.addEventListener('submit', onFormSubmitHandler);