let tasks = [];
let currentTaskId = 1;

// Function to add a task
function addTask() {
    const title = document.getElementById("task-title").value;
    const details = document.getElementById("task-details").value;
    const date = document.getElementById("task-date").value;

    if (!title || !details || !date) {
        alert("Please fill in all fields!");
        return;
    }

    const task = {
        id: currentTaskId++,
        title,
        details,
        date,
        status: "pending" // default status is pending
    };

    tasks.push(task);
    renderTasks();
    updateTaskCount();

    // Clear the input fields after adding
    document.getElementById("task-title").value = '';
    document.getElementById("task-details").value = '';
    document.getElementById("task-date").value = '';
}

// Function to render tasks
function renderTasks() {
    const taskList = document.getElementById("tasks");
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.classList.add(task.status);
        li.setAttribute("data-id", task.id);

        li.innerHTML = `
            <div class="task-info">
                <h3>${task.title}</h3>
                <p>${task.details}</p>
                <small>Due Date: ${task.date}</small>
            </div>
            <div class="task-actions">
                <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
                <button class="status-btn" onclick="toggleTaskStatus(${task.id})">${task.status === 'pending' ? 'Mark as Done' : 'Mark as Pending'}</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

// Function to update the current task count
function updateTaskCount() {
    const pendingTasks = tasks.filter(task => task.status === 'pending').length;
    document.getElementById("task-count").textContent = pendingTasks;
}

// Function to toggle the task status (pending/completed)
function toggleTaskStatus(taskId) {
    const task = tasks.find(t => t.id === taskId);
    task.status = task.status === 'pending' ? 'completed' : 'pending';

    renderTasks();
    updateTaskCount();
}

// Function to delete a task
function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks();
    updateTaskCount();
}

// Function to edit a task
function editTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    const newTitle = prompt("Edit Task Title", task.title);
    const newDetails = prompt("Edit Task Details", task.details);
    const newDate = prompt("Edit Due Date", task.date);

    if (newTitle !== null) task.title = newTitle;
    if (newDetails !== null) task.details = newDetails;
    if (newDate !== null) task.date = newDate;

    renderTasks();
}
