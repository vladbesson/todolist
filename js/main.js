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

	const deleteButton = newTask.querySelector('.task__btn_delete');
	const copyButton = newTask.querySelector('.task__btn_copy');
	const editButton = newTask.querySelector('.task__btn_edit');

	editButton.addEventListener('click', function (evt) {
		const text = prompt('Введите новый текст');
		const task = evt.currentTarget.closest('.task');
		task.querySelector('.task__name').textContent = text;
	});
	
	list.appendChild(newTask);
};

list.addEventListener('click', (event) => {	
	const targetButton = event.target.parentElement;	
	const targetButtonClasses = targetButton.classList;
	if (targetButtonClasses.contains('task__btn_delete')){		
		const removingTask = targetButton.closest('.task');
		removingTask.remove();
	}
	else if (targetButtonClasses.contains('task__btn_copy')){
		const copyTask = targetButton.closest('.task');
		const clonedTask = copyTask.cloneNode(true);
		copyTask.after(clonedTask);
	}
})

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
