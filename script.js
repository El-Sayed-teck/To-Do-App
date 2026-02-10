"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const userInput = document.querySelector(".user-input");
  const addTaskBtn = document.querySelector(".add-btn");
  const taskList = document.querySelector(".tasks-list");
  const appContainer = document.querySelector(".app-container");
  const taskContainer = document.querySelector(".task-container");

  let taskArray = getStoreTaskArray();
  renderTasks();

  function appState() {
    taskContainer.style.height =
      taskList.children.length === 0 ? "30%" : "100%";
    appContainer.style.height =
      taskList.children.length === 0 ? "200px" : "500px";
  }
  appState();

  function getStoreTaskArray() {
    const taskArray = JSON.parse(localStorage.getItem("Tasks")) || [];
    return taskArray;
  }

  const storeTaskArray = function (arr) {
    localStorage.setItem("Tasks", JSON.stringify(arr));
  };

  function generateId() {
    const timeStamp = Date.now().toString();
    return `${timeStamp}`;
  }

  function renderTasks() {
    taskList.innerHTML = "";
    taskArray.forEach((task) => createTasksEl(task));
  }

  function markedTasks(tag, innerTag) {
    tag.querySelector(innerTag).classList.toggle("completed-task");
  }

  function createTasksEl(task) {
    const li = document.createElement("li");
    li.classList.add("task-item");
    li.innerHTML = `
        <div class="ok-and-text">
        <button class="oK-btn">x</button>
        <span>${task.inputText}</span>
        </div>
        <button class="delete-btn">🗑</button>        
        `;
    taskList.append(li);

    appState();

    const okBtn = li.querySelector(".oK-btn");
    okBtn.addEventListener("click", (e) => {
      markedTasks(li, "span");
    });

    const deleteBtn = li.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
      li.remove();
      taskArray = taskArray.filter((tas) => tas.TaskId !== task.TaskId);
      storeTaskArray(taskArray);
      console.log(taskArray);
      appState();
    });
  }

  function addTodoTask() {
    const inputText = userInput.value;
    if (!inputText) return;

    const taskId = generateId();

    const newTask = {
      inputText,
      TaskId: taskId,
    };
    taskArray.push(newTask);

    storeTaskArray(taskArray);
    createTasksEl(newTask);
    userInput.value = "";
  }

  addTaskBtn.addEventListener("click", addTodoTask);
});
