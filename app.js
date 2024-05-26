// Get references to the input field and task list
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Load tasks from local storage on page load
document.addEventListener('DOMContentLoaded', loadTasks);

// Add event listener for the input field to add tasks when the Enter key is pressed
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const taskItem = createTaskElement(taskText, false);
        taskList.appendChild(taskItem);
        saveTasks();
        taskInput.value = '';
    }
}

// Function to create a task element
function createTaskElement(taskText, completed) {
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';
    if (completed) {
        taskItem.classList.add('completed');
    }

    const taskContent = document.createElement('span');
    taskContent.textContent = taskText;
    taskContent.addEventListener('click', function() {
        taskItem.classList.toggle('completed');
        saveTasks();
    });

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-btn';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
        taskList.removeChild(taskItem);
        saveTasks();
    });

    taskItem.appendChild(taskContent);
    taskItem.appendChild(deleteButton);

    return taskItem;
}

// Function to save tasks to local storage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.task-item').forEach(taskItem => {
        tasks.push({
            text: taskItem.querySelector('span').textContent,
            completed: taskItem.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const taskItem = createTaskElement(task.text, task.completed);
        taskList.appendChild(taskItem);
    });
}
