class Todo {

    editTask (event) {
        if (event.target.classList.contains('task__btn_edit')){
            const text = prompt('Введите новый текст');
            const taskFind = event.target.closest('.todo__item');
            if (text ===''){

            } else {
                taskFind.querySelector('.task__name').textContent = text;
            }

        }
    }
    delTask (event)  {
        if (event.target.classList.contains('task__btn_delete')){
            const taskFind = event.target.closest('.todo__item');
            list.removeChild(taskFind);
        }
    }
    copyTask (event)  {
        if (event.target.classList.contains('task__btn_copy')){
            const taskFind = event.target.closest('.todo__item');
            const clonedTask = taskFind.cloneNode(true);
            taskFind.after(clonedTask);
        }
    }
    sanitizeHTMLUpdate(str) {
        return  str.replace(/[.*+?^${}()<>|[\]\\]/g, '\\$&');
    }


}