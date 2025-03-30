// Load tasks from localStorage
function loadTasks() {
    let storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
}

// Display tasks on the page
function displayTasks() {
    let tasks = loadTasks();
    let taskList = document.getElementById("taskList");
    if (!taskList) return; // Prevent errors if element doesn't exist

    taskList.innerHTML = ""; // Clear existing list
    tasks.forEach(task => {
        let listItem = document.createElement("li");
        listItem.textContent = `${task.taskInput} - ${task.dueDate} (${task.category})`;
        taskList.appendChild(listItem);
    });
}

// Save new task to localStorage
document.addEventListener("DOMContentLoaded", function () {
    displayTasks(); // Show tasks when the page loads

    let form = document.getElementById("taskForm");
    if (form) {
        form.addEventListener("submit", function (event) {
            let tasks = loadTasks();

            let newTask = {
                id: Date.now().toString(),
                taskInput: document.getElementById("taskInput").value,
                dueDate: document.getElementById("dueDate").value,
                category: document.getElementById("category").value
            };

            tasks.push(newTask);
            localStorage.setItem("tasks", JSON.stringify(tasks));
        });
    }
});
