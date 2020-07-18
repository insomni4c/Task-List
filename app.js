// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const intro = document.querySelector('#introText');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  //DOM load event
  document.addEventListener('DOMContentLoaded',getTasks)
  // Add task event
  form.addEventListener('submit', addTask);
  // Change intro text

  // Remove task event
  taskList.addEventListener('click', removeTask)
  //Clear tasks event
  clearBtn.addEventListener('click', clearTasks)
  //Filter tasks event
  filter.addEventListener('keyup', filterTasks)
}

//Get Tasks
function getTasks() {
  let tasks
  if(localStorage.getItem('tasks') === null){
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach(function(task){
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  })
}

// Add Task
function addTask(e) {
  if(taskInput.value === '') {
    alert('Add a task');
  }

  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  //store in ls
  storeTaskInLocalStorage(taskInput.value)

  // Clear input
  taskInput.value = '';

  //change intro text
  intro.innerHTML = '<h5 id="introText">&nbsp;&nbsp;Add more tasks, get more work done!</h5>'

  e.preventDefault();
}

//store task
function storeTaskInLocalStorage(task) {
  let tasks
  if(localStorage.getItem('tasks') === null){
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.push(task)
  localStorage.setItem('tasks',JSON.stringify(tasks))
}

//Remove Task
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are you sure?')){
      e.target.parentElement.parentElement.remove()

      //remove from LS
      removeTaskfromLocalStorage(e.target.parentElement.parentElement)
    }
  }
}

//Remove from LS
function removeTaskfromLocalStorage(taskItem) {
  let tasks
  if(localStorage.getItem('tasks') === null){
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach(function(task,index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1)
    }
  })
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

//Clear tasks
function clearTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild)
  }

  //Clear from LS
  clearTasksFromLocalStorage()
}

function clearTasksFromLocalStorage() {
  localStorage.clear()
}

//filter Tasks
function filterTasks(e){
  const text = e.target.value.toLowerCase()

  document.querySelectorAll('.collection-item').forEach(
    function(task){
      const item = task.firstChild.textContent
      if(item.toLowerCase().indexOf(text) != -1){
        task.style.display = 'block'
      } else {
        task.style.display = 'none'
      }
    }
  )

}
