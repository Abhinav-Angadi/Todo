const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

window.onload = loadTasks;

addTaskBtn.addEventListener("click",addTask);
function addTask() { 
  if(taskInput.value === ""){
    return alert("Enter a task!");
}
const li = document.createElement("li");
li.textContent = taskInput.value;

//Mark complete on click
li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
});

//Right click to delete
li.addEventListener("contextmenu", (e) =>{
    e.preventDefault();
    li.remove();
    saveTasks();
});

taskList.appendChild(li);
taskInput.value = "";
saveTasks();
}

//Save to localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach((li) => {
        tasks.push({
            text: li.textContent,
            completed: li.classList.contains("completed"),
        });
    });
    localStorage.setIteem("tasks", JSON.stringify(tasks));
}

//Load tasks from Local Storage
function loadTasks(){
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.textContent = task.text;

        if(task.completed) li.classList.add("completed");

        li.addEventListener("click", () => {
            li.classList.toggle("completed");
            saveTasks();
        });

        li.addEventListener("contextmenu",(e) => {
            e.preventDefault();
            li.remove();
            saveTasks();
        });
        taskList.appendChild(li);
    });
}