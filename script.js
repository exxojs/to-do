const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoItemsList = document.querySelector('.todo-items');
const clearAllButton = document.querySelector('.clear-all-button');
let todos = JSON.parse(localStorage.getItem('todos')) || [];

todoForm.addEventListener('submit', addTodo);
todoItemsList.addEventListener('click', handleTodoItem);
clearAllButton.addEventListener('click', clearAll);

function addTodo(event) {
  event.preventDefault();
  const item = todoInput.value.trim();
  if (item) {
    todos.push({ id: Date.now(), name: item, completed: false });
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
    todoInput.value = '';
  }
}

function renderTodos() {
  todoItemsList.innerHTML = '';
  todos.forEach(item => {
    const todoItem = document.createElement('li');
    todoItem.innerHTML = `
      <input type="checkbox" id="${item.id}" ${item.completed? 'checked' : ''}>
      <label for="${item.id}">${item.name}</label>
      <button class="delete-button">Delete</button>
    `;
    todoItemsList.appendChild(todoItem);
  });
}

function handleTodoItem(event) {
  if (event.target.type === 'checkbox') {
    toggle(event.target.id);
  } else if (event.target.classList.contains('delete-button')) {
    deleteTodo(event.target.parentNode.querySelector('input').id);
  }
}

function toggle(id) {
  todos.find(item => item.id == id).completed =!todos.find(item => item.id == id).completed;
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter(item => item.id!= id);
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos();
}

function clearAll() {
  todos = [];
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos();
}

renderTodos();
