import { Task } from "./Task";

export const createTaskElement = (taskText: string, completed: boolean): HTMLElement => {
    const taskItem: HTMLLIElement = document.createElement('li');
    taskItem.className = 'task-item';
    if (completed) {
        taskItem.classList.add('completed');
    }

    const taskConten: HTMLElement = document.createElement('span');
    taskConten.textContent = taskText;
    taskConten.addEventListener('click', function() {
        taskItem.classList.toggle('completed');
    });

    const deleteButton: HTMLButtonElement = document.createElement('button');
    deleteButton.className = 'delete-btn';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
        taskItem.remove();
    });

    taskItem.appendChild(taskConten);
    taskItem.appendChild(deleteButton);

    return taskItem;
}