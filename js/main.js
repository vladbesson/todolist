const list = document.querySelector('.todo__list');
const form = document.querySelector('.todo__form');

/* ФУКНЦИИ */
// создать пустую задачу без добавления на страницу
function createTaskElement() {
    const markup = `
        <li class="todo__item task element-highlighting">
            <div class="task__info">
                <input type="text" class="task__name" readonly/>
            </div>
            <div class="task__controls">
                <button class="task__btn task__btn_edit" type="button"></button>
                <button class="task__btn task__btn_copy" type="button"></button>
                <button class="task__btn task__btn_delete" type="button"></button>
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
    // newTask.querySelector('.task__name').textContent = name; // Если p
    newTask.querySelector('.task__name').value = name; // Если input
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
    if (evt.target.classList.contains('task__btn_delete')) {
        const task = evt.target.closest('.task');
        list.removeChild(task);
    }
}

function copyTask(evt) {
    if (evt.target.classList.contains('task__btn_copy')) {
        const task = evt.target.closest('.task');
        const clonedTask = task.cloneNode(true);
        task.after(clonedTask);
    }
}

function editTask(evt) {
    if (evt.target.classList.contains('task__btn_edit')) {
        const task = evt.target.closest('.task');
        const taskText = task.querySelector('.task__name');
        taskText.removeAttribute('readonly');
        taskText.focus();
        // taskText.select(); // Это суперудобно, но для этого поле ввода должно более очевидно выглядеть
        // как поле ввода, чем по моей задумке.

        evt.target.classList.add('task__btn_save');
        evt.target.classList.remove('task__btn_edit');
        list.addEventListener('click', saveEditedTask);
        // console.log('editTask');
    }
}

function saveEditedTask(evt) {
    if (evt.target.classList.contains('task__btn_save')) {
        const task = evt.target.closest('.task');
        const taskText = task.querySelector('.task__name');
        taskText.setAttribute('readonly', true);

        evt.target.classList.add('task__btn_edit');
        evt.target.classList.remove('task__btn_save');
        list.removeEventListener('click', saveEditedTask);
        // console.log('saveEditedTask');
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
// list.addEventListener('click', saveEditedTask);

/* ВЫЗОВЫ ФУНКЦИЙ */
createInitialTasks()
