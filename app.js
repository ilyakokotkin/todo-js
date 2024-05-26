// Get references to the input field and task list
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

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
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        
        const taskContent = document.createElement('span');
        taskContent.textContent = taskText;
        taskContent.addEventListener('click', function() {
            taskItem.classList.toggle('completed');
        });

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn';
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            taskList.removeChild(taskItem);
        });

        taskItem.appendChild(taskContent);
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);

        taskInput.value = '';
    }
}