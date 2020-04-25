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

const modifyTask = (task, clickButton) => {
	const clickButtonClasses = clickButton.classList;
	if (clickButtonClasses.contains('task__btn_delete')){		
		task.remove();
	}
	else if (clickButtonClasses.contains('task__btn_copy')){		
		const clonedTask = task.cloneNode(true);
		task.after(clonedTask);
	}
	else if (clickButtonClasses.contains('task__btn_edit')){
		const oldName = task.querySelector('.task__name').textContent;
		editTask(task, oldName);
	}
}

const editTask = (task, oldName) => {
	task.remove();
	const form = document.forms.new;
	const input = form.querySelector('.todo__input');
	input.value = oldName;
	input.focus();	
}

list.addEventListener('click', (event) => {	
	const clickButton = event.target.parentElement;		
	const task = clickButton.closest('.task');
	modifyTask(task, clickButton);
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
