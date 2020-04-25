const list = document.querySelector('.todo__list');
const form = document.querySelector('.todo__form');

/* ФУКНЦИИ */
// создать пустую задачу без добавления на страницу
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

/* Слушатели и обработчики - раздельно
Вариант 1
В обработчике - проверка класса. (Проблема: у img нет класса.
    – Сначала поискать решения без присвоения класса img, если неудовл. - присвоить класс.)
Вариант 2
В обработчике нет проверки класса, и он вешается не на список (делегирование), а на кнопку. Тогда кнопка объявляется
    переменной глобально. Ошибка: при загрузке тасков нет. Решение: сделать эту переменную пустой let,
    а записывать в нее кнопку внутри функции, создающей таску?

 */
function deleteTask(evt) {
    if (evt.target.parent.classList.contains('task__btn_delete')) {
        const task = evt.target.closest('.task');
        list.removeChild(task);
    }
    // console.log(evt.currentTarget);
    // console.log(evt.target);
}

// function copyTask (evt) {
//     const copyButton = newTask.querySelector('.task__btn_copy');
//     const task = evt.currentTarget.closest('.task');
//     const clonedTask = task.cloneNode(true);
//     task.after(clonedTask);
// }

// function editTask (evt) {
//     const editButton = newTask.querySelector('.task__btn_edit');
//     const text = prompt('Введите новый текст');
//     const task = evt.currentTarget.closest('.task');
//     task.querySelector('.task__name').textContent = text;
// }




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

list.addEventListener('click', deleteTask);

// list.addEventListener('click', editTask);

// list.addEventListener('click', copyTask);
/* ВЫЗОВЫ ФУНКЦИЙ */
createInitialTasks()
