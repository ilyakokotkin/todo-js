// Get references to the input field and task list
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Add event listener for the input field to add tasks when the Enter key is pressed
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});