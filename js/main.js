/* Переменные */

const list = document.querySelector('.todo__list');
const form = document.querySelector('.todo__form');
const input = document.querySelector('.todo__input');

/* Функции */

// Создает элемент таск
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

// Добавляет таск в разметку
const renderSingleTask = function(name) {
	const newTask = createTaskElement();
	newTask.querySelector('.task__name').textContent = name;

	list.appendChild(newTask);
};

// Удаляет таск из разметки
const deleteTask = function(task) {
	list.removeChild(task);
};

// Создает копию таска
const copyTask = function(task) {
	const clonedTask = task.cloneNode(true);
	task.after(clonedTask);
};

// Редактирование таска
const editTask = function(task) {
	// Выходим из режима редактирования
	const escEditTask = function(task) {
		task.removeAttribute('style');
		input.value = '';

		form.removeEventListener('submit', onEditSubmitHandler);
		document.removeEventListener('keydown', onEscEditHandler);

		form.addEventListener('submit', onFormSubmitHandler);
		list.addEventListener('click', onAnyTaskBtnHandler);
	};

	// Слушаем submit в режиме редактирования
	const onEditSubmitHandler = function(evt) {
		evt.preventDefault();
		task.querySelector('.task__name').textContent = input.value;
		escEditTask(task);
	};

	// Слушаем нажатие Esc в режиме редактирования
	const onEscEditHandler = function(evt) {
		if (evt.key == 'Escape') {
			escEditTask(task);
		}
	};

	input.focus();
	task.setAttribute('style', 'background: darkblue');
	input.value = task.querySelector('.task__name').textContent;

	list.removeEventListener('click', onAnyTaskBtnHandler);
	form.removeEventListener('submit', onFormSubmitHandler);

	form.addEventListener('submit', onEditSubmitHandler);
	document.addEventListener('keydown', onEscEditHandler);
};

// Обработчик нажатия "Сохранить"
const onFormSubmitHandler = function (evt) {
	evt.preventDefault();
	renderSingleTask(input.value);
	input.value = '';
};

// Обработчик нажатий кнопок на таске
const onAnyTaskBtnHandler = function(evt) {
	const taskBtn = evt.target.closest('.task__btn');
	const task = evt.target.closest('.task');

	if (taskBtn.classList.contains('task__btn_delete')) {
		deleteTask(task);
	} else if (taskBtn.classList.contains('task__btn_copy')) {
		copyTask(task);
	} else if (taskBtn.classList.contains('task__btn_edit')) {
		editTask(task);
	}
};

/* Добавляем слушателей */

form.addEventListener('submit', onFormSubmitHandler);
list.addEventListener('click', onAnyTaskBtnHandler);

// пройтись по массиву данных циклом
tasks.forEach(function(task) {
	renderSingleTask(task.name);
});
