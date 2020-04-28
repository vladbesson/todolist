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

function openTaskForEditing(event) {
    // console.log('openTaskForEditing');

    const task = event.target.closest('.task');
    const taskText = task.querySelector('.task__name');
    taskText.setAttribute('placeholder', taskText.value);
    if (taskText.hasAttribute('readonly')) {
        // console.log('openTaskForEditing if true');
        list.removeEventListener('click', closeTask); // Удаляет слушатель, на случай если он ранее был
        // добавлен с другой незакрытой таски. В противном случае после открытия текущей таски происходит сразу
        // ее закрытие. ДОБАВИТЬ ПРОВЕРКУ НА МЕНЬШЕ ДВУХ? Не надо, т. к. эта же функция ниже снова его добавляет.
        taskText.removeAttribute('readonly');
        taskText.focus();

        const editButton = task.querySelector('.task__btn_edit');
        // console.log(editButton);
        editButton.classList.remove('task__btn_edit'); // Это вообще нужно? Может, удалить?
        // При этом действии, если открыть таску даблкликом и, не закрывая, еще раз сделать на ней даблклик,
        // в консоль кидается ошибка, т. к. происходит повторный вызов данной функции, а первый уже удалил этот
        // класс. Видимо, устранять данную особенность в условиях текущей задачи нецелесообразно.
        // UPD: А оставить эту проблему нельзя, т. к. исполнение кода останавливается.
        // РЕШЕНИЕ: добавлена проверка if (taskText.hasAttribute('readonly')). Важен порядок действий
        // в начале данной функции!

        list.addEventListener('click', closeTask); // Добавляет слушатель, чтобы при клике по желтой галке
        // срабатывало закрытие
        editButton.classList.add('task__btn_save'); // Изменяет иконку
        task.classList.add('editable-element-highlighting');
    }
    // console.log('openTaskForEditing end');
}

function closeTaskWithoutSaving(event) {
    // console.log('closeTaskWithoutSaving');
    const taskText = event.target;
    // console.log('taskText.placeholder', taskText);
    taskText.value = taskText.getAttribute('placeholder');
    // closeTask(event);

    const task = event.target.closest('.task');
    // const taskText = task.querySelector('.task__name');
    taskText.setAttribute('readonly', true);
    if (list.querySelectorAll('.task__btn_save').length < 2) {
        list.removeEventListener('click', closeTask);
        // console.log('less than 2');
    }
    const button = task.querySelector('.task__btn_save');
    button.classList.add('task__btn_edit'); // Должны стоять после IF!!!
    button.classList.remove('task__btn_save'); // Должны стоять после IF!!!
    task.classList.remove('editable-element-highlighting');

    // console.log('closeTaskWithoutSaving end');
}

function closeTaskViaEnter(event) {
    if (event.target.classList.contains('task__name')) {
        // console.log('closeTask');
        const task = event.target.closest('.task');
        // const taskText = task.querySelector('.task__name');
        const taskText = event.target;
        taskText.setAttribute('readonly', true);
        if (list.querySelectorAll('.task__btn_save').length < 2) {
            list.removeEventListener('click', closeTask);
            // console.log('less than 2');
        }
        const button = task.querySelector('.task__btn_save');
        button.classList.add('task__btn_edit'); // Должны стоять после IF!!!
        button.classList.remove('task__btn_save'); // Должны стоять после IF!!!
        task.classList.remove('editable-element-highlighting');
        // // console.log('closeTask end');
    }
    // else {
    //     // console.log("if: false");
    // }
}

/* ОБРАБОТЧИКИ СОБЫТИЙ */

function deleteTask(event) {
    if (event.target.classList.contains('task__btn_delete')) {
        const task = event.target.closest('.task');
        list.removeChild(task);
    }
}

function copyTask(event) {
    if (event.target.classList.contains('task__btn_copy')) {
        const task = event.target.closest('.task');
        const clonedTask = task.cloneNode(true);
        task.after(clonedTask);
        // console.log(clonedTask);
    }
}

function editTaskViaIcon(event) {
    if (event.target.classList.contains('task__btn_edit')) { // Заменить на "не содержит task__btn_save"?
        // Зачем - см. openTaskForEditing
        // if (event.target.classList.contains('task__btn') && !event.target.classList.contains('task__btn_save')) {
        // Так другие кнопки тоже начинают открывать таску для редактирования. Выход: либо вводить какой-то
        // третий, неудаляемый класс для кнопки редактирования, либо оставить проблему, описанную
        // в openTaskForEditing.
        // console.log('editTaskViaIcon');
        openTaskForEditing(event);
        // console.log('editTaskViaIcon end');
    }
}

function editTaskViaDoubleclick(event) {
    if (event.target.classList.contains('task__name')) {
        // console.log('editTaskViaDoubleclick');
        openTaskForEditing(event);
        // console.log('editTaskViaDoubleclick end');
    }
}

// Это была плохая идея... Происходит сложный конфликт, связанный с присвоением/удалением классов, но даже если
// его продиагностировать и устранить - перед ним еще происходит ненужное срабатывание на единичный клик
// на тексте таски. То есть таска открывается для ред. не только двойным, но одинарным кликом по тексту.
// function editTask(event) {
//     if (event.target.classList.contains('task__btn_edit') || event.target.classList.contains('task__name')) {
//         // console.log('editTask');
//         openTaskForEditing(event);
//         // console.log('editTask end');
//     }
// }

// обработчик по слушателю, добавляемому функциями
function closeTask(event) {
    if (event.target.classList.contains('task__btn_save')) {
        // console.log('closeTask');
        const task = event.target.closest('.task');
        const taskText = task.querySelector('.task__name');
        taskText.setAttribute('readonly', true);
        if (list.querySelectorAll('.task__btn_save').length < 2) {
            list.removeEventListener('click', closeTask);
            // console.log('less than 2');
        }
        event.target.classList.add('task__btn_edit'); // Должны стоять после IF!!!
        event.target.classList.remove('task__btn_save'); // Должны стоять после IF!!!
        task.classList.remove('editable-element-highlighting');
        // console.log('closeTask end');
    }
}

// закрывает таску по Escape
function taskEscHandler(event) {
    // console.log('taskEscHandler');
    if (event.key == 'Escape' && event.target === document.activeElement) {
        closeTaskWithoutSaving(event);
    }
    // console.log('taskEscHandler end ================================================');
    // console.clear()
}

// закрывает таску по Enter
function taskEnterHandler(event) {
    // console.log('taskEnterHandler');
    // if (event.key == 'Enter' && event.target === document.activeElement) {
    if (event.key == 'Enter') {
        closeTaskViaEnter(event);
        // console.log("if: true");
    }
    // else {
    //     // console.log("if: false");
    // }
    // console.log('taskEnterHandler end ================================================');
    // console.clear()
}

// добавляет задачу по нажатию на кнопку
function onFormSubmitHandler(event) {
    event.preventDefault();
    const input = document.querySelector('.todo__input');
    renderSingleTask(input.value);
    input.value = '';
};

// СЛУШАТЕЛИ СОБЫТИЙ
form.addEventListener('submit', onFormSubmitHandler);
list.addEventListener('click', deleteTask);
list.addEventListener('click', copyTask);
list.addEventListener('click', editTaskViaIcon);
list.addEventListener('dblclick', editTaskViaDoubleclick);
// list.addEventListener('click', editTask);
// list.addEventListener('dblclick', editTask);
// list.addEventListener('click', closeTask); // Если поставить его здесь, при открытии таски
// для редактирования срабатывает сразу и он, и таска сразу закрывается.
document.addEventListener('keydown', taskEscHandler);
document.addEventListener('keydown', taskEnterHandler);

/* ВЫЗОВЫ ФУНКЦИЙ */
createInitialTasks()
