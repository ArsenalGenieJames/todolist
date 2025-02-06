document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTask");
    const clearTaskBtn = document.getElementById("clearTask");
    const latestTaskBtn = document.getElementById("latestTask");
    const completeTaskBtn = document.getElementById("completeTask");
    const taskList = document.getElementById("taskList");

    let tasks = [];

    function renderTasks(filter = "all") {
        taskList.innerHTML = "";
        let filteredTasks = tasks;
        if (filter === "completed") {
            filteredTasks = tasks.filter(task => task.completed);
        }

        filteredTasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.className = "list-group-item d-flex justify-content-between align-items-center mt-3";
            if (task.completed) {
            li.classList.add("list-group-item-success");
            }

            li.innerHTML = `
            <span class="editable" contenteditable="true" data-index="${index}">${task.text}</span>
            <div>
                <button class="btn btn-primary btn-sm" onclick="editTask(${index})">✎</button>
                <button class="btn btn-success btn-sm" onclick="completeTask(${index})">✓</button>
                <button class="btn btn-danger btn-sm" onclick="deleteTask(${index})">✖</button>
            </div>
            `;

            taskList.appendChild(li);
        });

        attachEditListeners(); 
    }

    function attachEditListeners() {
        document.querySelectorAll(".editable").forEach(element => {
            element.addEventListener("blur", function () {
                let index = this.getAttribute("data-index");
                tasks[index].text = this.innerText.trim();
            });

            element.addEventListener("keypress", function (event) {
                if (event.key === "Enter") {
                    event.preventDefault(); 
                    this.blur();
                }
            });
        });
    }

    window.deleteTask = function (index) {
        tasks.splice(index, 1);
        renderTasks();
    };

    window.completeTask = function (index) {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    };

    addTaskBtn.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            taskInput.value = "";
            renderTasks();
        }
    });

    clearTaskBtn.addEventListener("click", function () {
        tasks = [];
        renderTasks();
    });

    latestTaskBtn.addEventListener("click", function () {
        renderTasks();
    });

    completeTaskBtn.addEventListener("click", function () {
        renderTasks("completed");
    });

    renderTasks();
});