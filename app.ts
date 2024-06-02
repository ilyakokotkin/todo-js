import { Task } from "./Task";
import { loadTasks, saveTasks } from "./TaskStorage";
import { createTaskElement } from "./TaskDOM";

const taskInput: HTMLInputElement = document.getElementById('taskInput') as HTMLInputElement;
const taskList: HTMLUListElement = document.getElementById('taskList') as HTMLUListElement;

document.addEventListener('DOMContentLoaded', () => {
    const tasks = loadTasks();
    tasks.forEach(task => {
        const taskItem = createTaskElement(task.text, task.completed);
        taskList.appendChild(taskItem);
    });
});

taskInput.addEventListener('keypress', function(event: KeyboardEvent) {
    if (event.key === 'Enter') {
        const taskText: string = taskInput.value.trim();
        if (taskText !== '') {
            const taskItem: HTMLLIElement = createTaskElement(taskText, false);
            taskList.appendChild(taskItem);
            taskList.querySelectorAll('.task-item').forEach(taskItem => {
                const tasks: Task[] = [{ text: taskText, completed: false }]; 
                saveTasks(tasks);
            });
            taskInput.value = '';
        }
    }
});
