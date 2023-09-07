const frmElement = document.getElementById("formTask");

const getTasks = () => {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  let taskUI = document.getElementById("tasks");

  taskUI.innerHTML = "";
  tasks.map((task) => {
    taskUI.innerHTML += `
            <div class="card mb-3">
                <div class="card-body">
                    <p><b>Title: </b>${task.title}</p>
                    <p><b>Description: </b>${task.description}</p>
                    <a class="btn btn-danger ml-5" id="${task.title}" onclick="deleteTask()">Delete</a>
                </div>
            </div>
        `;
  });
};

const saveTask = (e) => {
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  // task object
  const task = {
    title,
    description,
  };
  if (title === "" || description === "") {
    alert("enter empty fields");
  } else {
    // Si no hay tareas en el localstorage agregar una nueva
    if (localStorage.getItem("tasks") === null) {
      let tasks = [];
      tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      let tasks = JSON.parse(localStorage.getItem("tasks"));
      tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    getTasks();
    frmElement.reset();
  }
  // localStorage.setItem("tasks", JSON.stringify(task));
  // console.log(JSON.parse(localStorage.getItem("task")));
  e.preventDefault();
};

function deleteTask() {
  let deleteBtns = document.querySelectorAll("mb-3");
  console.log(deleteBtns);
}

frmElement.addEventListener("submit", (e) => saveTask(e));

getTasks();
deleteTask();