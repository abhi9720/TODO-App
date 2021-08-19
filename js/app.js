document.getElementById("form-Task").addEventListener("submit", saveTask);

// Save new To-Do
function saveTask(e) {
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;

  let task = {
    title,
    description,
    time: new Date().toLocaleString(),
  };

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

  // Reset form-Task
  document.getElementById("form-Task").reset();
  e.preventDefault();
}

// Delete To-Do
function deleteTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.splice(index, 1);

  localStorage.setItem("tasks", JSON.stringify(tasks));
  getTasks();
}

function markDone(id) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  let tasksView = document.getElementById("tasks");
  let ispresent = false;
  const len = tasksView.children[id].children[0].classList.length;
  for (let i = 0; i < len; i++) {
    if (tasksView.children[id].children[0].classList[i] == "done") {
      ispresent = true;
    }
  }

  !ispresent
    ? tasksView.children[id].children[0].classList.add("done")
    : tasksView.children[id].children[0].classList.remove("done");
}

// Show To-Do List
function getTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  let tasksView = document.getElementById("tasks");
  tasksView.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    let title = tasks[i].title;
    let description = tasks[i].description;

    tasksView.innerHTML += `
    <div class="card mb-2" id="task-${i}">
        <div class="card-body p-2 pb-0">
        <div class="row">
          <div class="col-sm-3 text-left task-title">
            <p>${title}</p>
          </div>
          <div class="col-sm-7 text-left task-desc">
            <p>${description}</p>
          </div>
          <div class="col-sm-2 text-right task-status">
           
          <button type="button" onclick="deleteTask('${i}')" class="close" aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button>



  <input class="form-check-input" type="checkbox" onclick="markDone('${i}')"> 

          
            
          </div>
          
        </div>  
       </div>
       <div>
     
       </div>
       <small class="ml-3 text-info"> ${tasks[i].time} </small>
      </div>`;
  }
}

getTasks();
