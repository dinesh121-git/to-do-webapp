const API_URL = "http://localhost:5000";

async function fetchTasks() {
    const res = await fetch(`${API_URL}/tasks`);
    const tasks = await res.json();
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    tasks.forEach((task) => {
        taskList.innerHTML += `
            <li>
                <span ${task.completed ? 'style="text-decoration: line-through;"' : ""}>${task.text}</span>
                <button onclick="toggleTask('${task._id}', ${task.completed})">✔</button>
                <button onclick="deleteTask('${task._id}')">❌</button>
            </li>
        `;
    });
}

async function addTask() {
    const text = document.getElementById("taskInput").value;
    if (!text) return;
    await fetch(`${API_URL}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
    });
    document.getElementById("taskInput").value = "";
    fetchTasks();
}

async function toggleTask(id, completed) {
    await fetch(`${API_URL}/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed }),
    });
    fetchTasks();
}

async function deleteTask(id) {
    await fetch(`${API_URL}/delete/${id}`, { method: "DELETE" });
    fetchTasks();
}

fetchTasks();
