function addTask() {
  var taskInput = document.getElementById("taskInput");
  var pendingTasks = document.getElementById("pendingTasks");

  if (taskInput.value.trim() !== "") {
      var li = document.createElement("li");
      var date = new Date().toLocaleDateString(); // Only date without time

      li.innerHTML = `
          <span>${taskInput.value}</span>
          <span class="task-time">${date}</span>
          <div class="task-buttons">
              <button onclick="markTaskComplete(this)">Mark Complete</button>
              <button onclick="editTask(this)">Edit</button>
              <button onclick="deleteTask(this)">Delete</button>
          </div>
      `;
      pendingTasks.appendChild(li);
      taskInput.value = "";
      saveTasksToLocalStorage();
  } else {
      alert("Please enter a task!");
  }
}

function markTaskComplete(element) {
  var li = element.parentElement.parentElement;
  var completedTasks = document.getElementById("completedTasks");
  var date = new Date().toLocaleDateString(); // Only date without time

  var newLi = document.createElement("li");
  newLi.innerHTML = `
      <span>${li.querySelector("span").innerText}</span>
      <span class="task-time">${date}</span>
      <div class="task-buttons">
          <button onclick="editTask(this)">Edit</button>
          <button onclick="deleteTask(this)">Delete</button>
      </div>
  `;
  completedTasks.appendChild(newLi);
  li.remove();
  saveTasksToLocalStorage();
}

function editTask(element) {
  var li = element.parentElement.parentElement;
  var span = li.querySelector("span");
  var newTask = prompt("Edit the task:", span.innerText);
  if (newTask !== null && newTask.trim() !== "") {
      span.innerText = newTask;
      saveTasksToLocalStorage();
  }
}

function deleteTask(element) {
  var li = element.parentElement.parentElement;
  li.remove();
  saveTasksToLocalStorage();
}

function clearTasks() {
  var pendingTasks = document.getElementById("pendingTasks");
  pendingTasks.innerHTML = "";
  saveTasksToLocalStorage();
}

function sortTasksByName() {
  var pendingTasks = document.getElementById("pendingTasks");
  var tasks = Array.from(pendingTasks.getElementsByTagName("li"));

  tasks.sort((a, b) => {
      var taskA = a.querySelector("span").innerText.toLowerCase();
      var taskB = b.querySelector("span").innerText.toLowerCase();
      return taskA.localeCompare(taskB);
  });

  pendingTasks.innerHTML = "";
  tasks.forEach(task => pendingTasks.appendChild(task));
}

function sortTasksByDate() {
  var pendingTasks = document.getElementById("pendingTasks");
  var tasks = Array.from(pendingTasks.getElementsByTagName("li"));

  tasks.sort((a, b) => {
      var dateA = new Date(a.querySelector(".task-time").innerText);
      var dateB = new Date(b.querySelector(".task-time").innerText);
      return dateA - dateB;
  });

  pendingTasks.innerHTML = "";
  tasks.forEach(task => pendingTasks.appendChild(task));
}

function saveTasksToLocalStorage() {
  var pendingTasks = document.getElementById("pendingTasks");
  localStorage.setItem("tasks", pendingTasks.innerHTML);
}

function loadTasks() {
  var pendingTasks = document.getElementById("pendingTasks");
  pendingTasks.innerHTML = localStorage.getItem("tasks") || "";
}

document.addEventListener("DOMContentLoaded", function () {
  loadTasks();
});
