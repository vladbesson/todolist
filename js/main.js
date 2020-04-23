const list = document.querySelector('.todo__list');
const template = document.querySelector('#task-template').content.querySelector('.task');

// пройтись по массиву данных циклом
tasks.forEach(function(task) {
	const newTask = template.cloneNode(true);
	newTask.querySelector('.task__name').textContent = task.name;

	list.appendChild(newTask);
});
