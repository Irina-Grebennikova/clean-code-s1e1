//Problem: User interaction does not provide the correct results.
//TODO: Add interactivity so the user can manage daily tasks.

var taskInput=document.querySelector(".add-item__input");
var addButton=document.getElementsByTagName("button")[0];
var incompleteTaskHolder=document.querySelector(".task-list_incomplete");
var completedTasksHolder=document.querySelector(".task-list_completed");

var createNewTaskElement = function(taskString) {

  var listItem = document.createElement("li");

  var checkBox = document.createElement("input");
  var label = document.createElement("label");
  
  var editInput = document.createElement("input");
  var editButton = document.createElement("button");

  var deleteButton = document.createElement("button");
  var deleteButtonImg = document.createElement("img");
  
  listItem.className = "task";

  label.innerText = taskString;
  label.className = "task__label";

  checkBox.type = "checkbox";
  checkBox.className = "task__checkbox";
  
  editInput.type = "text";
  editInput.classList.add("input", "task__input");


  editButton.innerText = "Edit";
  editButton.classList.add("button", "button_edit");

  deleteButton.classList.add("button", "button_delete");
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.className = "button__delete-img";
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

var addTask = function() {
  console.log("Add Task...");

  if (!taskInput.value) return;
  var listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
}

var editTask = function() {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  var listItem = this.parentNode;

  var editInput = listItem.querySelector('.task__input');
  var label = listItem.querySelector(".task__label");
  var editBtn = listItem.querySelector(".button_edit");
  var containsClass = listItem.classList.contains("task_edit-mode");

  if (containsClass) {
    
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
      editInput.value = label.innerText;
      editBtn.innerText = "Save";
    }

    listItem.classList.toggle("task_edit-mode");
};

var deleteTask = function() {
  console.log("Delete Task...");

  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  
  ul.removeChild(listItem);
}

var taskCompleted = function() {
  console.log("Complete Task...");

  var listItem = this.parentNode;
  
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete = function() {
  console.log("Incomplete Task...");

  var listItem = this.parentNode;
  
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

var ajaxRequest = function() {
  console.log("AJAX Request");
}

addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

var bindTaskEvents = function(taskListItem,checkBoxEventHandler) {
  console.log("bind list item events");

  var checkBox = taskListItem.querySelector(".task__checkbox");
  var editButton = taskListItem.querySelector(".button_edit");
  var deleteButton = taskListItem.querySelector(".button_delete");


  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

for (var i = 0; i < incompleteTaskHolder.children.length; i++) {

  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}


for (var i = 0; i < completedTasksHolder.children.length; i++) {

  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

