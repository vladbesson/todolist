const list = document.querySelector('.todo__list');
const FormTodo = document.querySelector('todo__form');
const buttonSaveForm = document.querySelector('.todo__button');


const TodoDefault = new Todo();
const TodoList = new TodoArray(list, tasks, TodoDefault);
const TodoFormMini = new TodoForm(FormTodo, TodoList);


TodoList.render();
TodoList.addListeners();
buttonSaveForm.addEventListener('click', TodoFormMini.newTask);