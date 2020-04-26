const list = document.querySelector('.todo__list');
const form = document.forms.todoForm;

const taskTemplate = (value) => `
		<li class="todo__item task">
      <div class="task__info">
        <p class="task__name">${value}</p>
      </div>
      <div class="task__controls">
        <button class="task__btn task__btn_edit task__btn_edit_active" type="button"></button>
        <button class="task__btn task__btn_copy task__btn_copy_active" type="button"></button>
        <button class="task__btn task__btn_delete" type="button"></button>
      </div>
    </li>
	`;

const editInputTemplate = (oldValue) => `<input class="float__input input" type="text" required value="${oldValue}" placeholder="Введите значение">`;

const createTaskElement = (value) => list.insertAdjacentHTML('afterbegin', taskTemplate(value));

const buttonsChangeClass = (evt) => {
	const { lastElementChild } = evt.target.closest('.task');
	lastElementChild.children[0].classList.toggle('task__btn_edit_active');
	lastElementChild.children[1].classList.toggle('task__btn_copy_active');
};

const showInputElement = (evt) => {
	const closestTask = evt.target.closest('.task');
	closestTask.firstElementChild.firstElementChild.insertAdjacentHTML(
		'afterend',
		editInputTemplate(closestTask.firstElementChild.textContent.trim()),
	);
	closestTask.firstElementChild.firstElementChild.textContent = '';
	buttonsChangeClass(evt);
};

const deleteBlock = (item) => item.remove();

const cloneBlock = (item) => item.cloneNode(true);

const acceptInput = (evt) => {
	const closestTask = evt.target.closest('.task');
	if (evt.key === 'Enter' && evt.target.value !== '') {
		closestTask.firstElementChild.firstElementChild.textContent = evt.target.value;
		buttonsChangeClass(evt);
		evt.target.remove();
	}
};

const allButtonEvents = (evt) => {
	const closestTask = evt.target.closest('.task');
	if (evt.target.matches('.task__btn_edit_active')) {
		showInputElement(evt);
	}
	if (evt.target.matches('.task__btn_delete')) {
		deleteBlock(closestTask);
	}
	if (evt.target.matches('.task__btn_copy_active')) {
		closestTask.after(cloneBlock(closestTask));
	}
};

const formSubmit = (evt) => {
	evt.preventDefault();
	createTaskElement(form.todoForm__input.value);
	form.reset();
};

list.addEventListener('click', allButtonEvents);
list.addEventListener('keydown', acceptInput);
form.addEventListener('submit', formSubmit);

tasks.forEach((task) => createTaskElement(task.name));
