function saveTodoListToLocalStorage() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }
  
  function getTodoListFromLocalStorage() {
    const storedTodoList = localStorage.getItem('todoList');
    return storedTodoList ? JSON.parse(storedTodoList) : [];
  }
  
  function updateAndDisplaySortedTodoList() {
    sortAlphabetically();
    saveTodoListToLocalStorage();
    displayTodoList();
  }
  
  function sortAlphabetically() {
    todoList.sort((a, b) => {
      const taskA = a.name.toUpperCase();
      const taskB = b.name.toUpperCase();
  
      if (taskA < taskB) {
        return -1;
      }
      if (taskA > taskB) {
        return 1;
      }
      return 0;
    });
  }
  
  function displayTodoList() {
    const todoListContainer = document.getElementById('todo-list');
    todoListContainer.innerHTML = '';
  
    todoList.forEach(item => {
      const listItem = document.createElement('li');
      listItem.className = 'todo-item';
      
      // strikethrough line for completed tasks
      const taskName = item.completed ? `<s>${item.name}</s>` : item.name;
      
      listItem.innerHTML = `
        <span class="${item.completed ? 'completed-task' : ''}">${taskName}</span>
        <input type="checkbox" ${item.completed ? 'checked' : ''} onchange="toggleTaskCompletion(${item.id})">
        <button onclick="removeTask(${item.id})">Remove</button>
      `;
      todoListContainer.innerHTML += listItem.outerHTML;
    });
  }
  
  function addTask() {
    const inputElement = document.getElementById('add-task-input');
    let newTaskName = inputElement.value.trim();
  
    if (!newTaskName) {
      alert('Error: Task name cannot be empty.');
      return;
    }
  
    newTaskName = newTaskName.charAt(0).toUpperCase() + newTaskName.slice(1);
  
    if (newTaskName.length <= 3) {
      alert('Error: Task name must have more than three characters.');
      return;
    }
  
    let newTaskObject = {
      id: Date.now(),
      name: newTaskName,
      createdDate: new Date().toISOString(),
      completed: false,
    };
  
    todoList.push(newTaskObject);
    updateAndDisplaySortedTodoList();
    inputElement.value = '';
  }
  
  function toggleTaskCompletion(taskId) {
    const taskIndex = todoList.findIndex(item => item.id === taskId);
    if (taskIndex !== -1) {
      todoList[taskIndex].completed = !todoList[taskIndex].completed;
      updateAndDisplaySortedTodoList();
    }
  }
  
  function removeTask(taskId) {
    todoList = todoList.filter(item => item.id !== taskId);
    updateAndDisplaySortedTodoList();
  }
  
  document.getElementById('add-task-button').addEventListener('click', addTask);
  
  let todoList = getTodoListFromLocalStorage();
  updateAndDisplaySortedTodoList();