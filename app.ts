import { Task } from "./Task";
import { loadTasks, saveTasks } from "./TaskStorage";
import { createTaskElement } from "./TaskDOM";

const taskInput: HTMLInputElement = document.getElementById('taskInput') as HTMLInputElement;
const taskList: HTMLUListElement = document.getElementById('taskList') as HTMLUListElement;
const passwordInput: HTMLInputElement = document.getElementById('passwordInput') as HTMLInputElement;
const unlockButton: HTMLButtonElement = document.getElementById('unlockButton') as HTMLButtonElement;
const timerSection: HTMLElement = document.getElementById('timerSection') as HTMLElement;

unlockButton.addEventListener('click', () => {
    if (passwordInput.value === 'secret') {
        timerSection.style.display = 'block';
    } else {
        alert('Incorrect password!');
    }
    passwordInput.value = ''; // Clear the password field
});

let timerId: number;
let seconds: number = 0;

const startTimerButton: HTMLButtonElement = document.getElementById('startTimerButton') as HTMLButtonElement;
const timerDisplay: HTMLElement = document.getElementById('timerDisplay') as HTMLElement;

startTimerButton.addEventListener('click', () => {
    if (timerId) clearInterval(timerId); // Reset timer if already running

    timerId = window.setInterval(() => {
        seconds++;
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        timerDisplay.textContent = `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
    }, 1000);
});

function pad(value: number): string {
    return value.toString().padStart(2, '0');
}


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
            let tasks = loadTasks();  
            tasks.push({ text: taskText, completed: false }); 
            saveTasks(tasks);
            taskInput.value = '';
        }
    }
});
