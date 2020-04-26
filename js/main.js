const list = document.querySelector('.todo__list');
const form = document.querySelector('.todo__form');

/* ФУКНЦИИ */
// создать пустую задачу без добавления на страницу
function createTaskElement() {
    const markup = `
        <li class="todo__item task element-highlighting">
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

// вызвать функцию создания пустой задачи, задать текст и добавить задачу на страницу
function renderSingleTask(name) {
    const newTask = createTaskElement();
    newTask.querySelector('.task__name').textContent = name;
    list.appendChild(newTask);
};

// создать изначальный набор задач из массива
function createInitialTasks() {
    tasks.forEach(function (task) {
        renderSingleTask(task.name);
    });
}

function deleteTask(evt) {
    // Вар1.1
    if (evt.target.parentElement.classList.contains('task__btn_delete')) {
        const task = evt.target.closest('.task');
        list.removeChild(task);
    }
}

function copyTask(evt) {
    if (evt.target.parentElement.classList.contains('task__btn_copy')) {
        const task = evt.target.closest('.task');
        const clonedTask = task.cloneNode(true);
        task.after(clonedTask);
    }
}

function editTask(evt) {
    if (evt.target.parentElement.classList.contains('task__btn_edit')) {
        // ВАРИАНТ С PROMPT
        // const task = evt.target.closest('.task');
        // const newText = prompt('Введите новый текст');
        // ОТРЕФАКТОРИЛ ПРОМПТ:
        // // if (newText !== null) {
            // if (newText.length > 0) {
                //     task.querySelector('.task__name').textContent = newText;
                // }

        // ВАРИАНТ "INLINE"
        const task = evt.target.closest('.task');
        const taskInfo = task.querySelector('.task__info');
        const taskText = task.querySelector('.task__name');
        const inputBox = document.createElement('input');
        inputBox.value = taskText.textContent;
        inputBox.classList.add('task__name');
        taskInfo.replaceChild(inputBox, taskText);
        inputBox.focus();

        // console.log(taskText.textContent);
    }
}




/* ОБРАБОТЧИКИ СОБЫТИЙ */
// добавляет задачу по нажатию на кнопку
function onFormSubmitHandler(evt) {
    evt.preventDefault();
    const input = document.querySelector('.todo__input');
    renderSingleTask(input.value);
    input.value = '';
};

// СЛУШАТЕЛИ СОБЫТИЙ
form.addEventListener('submit', onFormSubmitHandler);

// Вар1.1
list.addEventListener('click', deleteTask);
list.addEventListener('click', copyTask);
list.addEventListener('click', editTask);

/* ВЫЗОВЫ ФУНКЦИЙ */
createInitialTasks()
