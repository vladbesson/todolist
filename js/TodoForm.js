class TodoForm {
    constructor(form, element) {
        this.form = form;
        this.element = element;
    }

    newTask = (event) => {
        if (event.target.classList.contains('todo__button')) {
            event.preventDefault();
            const formFind = event.target.parentElement;
            const input = event.target.previousElementSibling;

            const inputValue = input.value;
            this.element.addTask(inputValue);
        }
    }
}