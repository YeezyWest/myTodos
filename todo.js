const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
const search = document.querySelector('.search , input');
const clock = document.querySelector('.clock');
const btn = document.querySelector('.addMobile');


//addTodo
const generateTemplate = todo => {

  const html = `
  <li class="border-b-2 p-4 py-3 sm:py-4 shadow-2xl shadow-black">
  <div class="flex items-center space-x-4">
    <div class="flex-1 min-w-0">
       <p class="text-xl font-medium text-white">
          ${todo}
       </p>
    </div>
    <i class="fa-solid fa-trash-can text-red-900 text-xl cursor-pointer delete"></i>
    </div>
</li>
  `
  list.innerHTML += html;

}
// Save todos to local storage
const saveTodos = () => {
  const todos = Array.from(list.children).map((todo) => todo.textContent);
  localStorage.setItem('todos', JSON.stringify(todos));
}
// Retrieve todos from local storage
const retrieveTodos = () => {
  const todos = JSON.parse(localStorage.getItem('todos'));
  if (todos) {
    todos.forEach((todo) => {
      generateTemplate(todo);
    });
  }
}


// Call retrieveTodos when the page loads
document.addEventListener('DOMContentLoaded', retrieveTodos);

// Call saveTodos when a new todo is added or a todo is deleted
  addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const todo = addForm.add.value.trim();
  if (todo.length) {
    generateTemplate(todo);
    addForm.reset();
    saveTodos();
  }
});

// addMobile

btn.addEventListener('click', e => {

  e.preventDefault();

  const todo = addForm.add.value.trim();

  if (todo.length) {
    generateTemplate(todo)
    addForm.reset();
  }
  
    // Save todos to local storage
    const saveTodos = () => {
    const todos = Array.from(list.children).map((todo) => todo.textContent);
    localStorage.setItem('todos', JSON.stringify(todos));
  }
  saveTodos();
  
  
// Retrieve todos from local storage
const retrieveTodos = () => {
  const todos = JSON.parse(localStorage.getItem('todos'));
  if (todos) {
    todos.forEach((todo) => {
      generateTemplate(todo);
    });
  }
}
});




//deleteTodo

list.addEventListener('click', e => {
  if (e.target.classList.contains('delete')) {
    e.target.parentElement.parentElement.remove();
    saveTodos();
  }
});


const filterTodos = (term) => {

  Array.from(list.children)
    .filter((todo) => !todo.textContent.toLocaleLowerCase().includes(term))
    .forEach((todo) => todo.classList.add('filtered'));


  Array.from(list.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.remove('filtered'));

};

//search 


search.addEventListener('keyup', () => {

  const term = search.search.value.trim().toLowerCase();
  filterTodos(term);

});

// date & times 

const tick = () => {

  const now = new Date();

  const h = now.getHours();
  const m = now.getMinutes();
  const s = now.getSeconds();

  const html =
    `
  <span>${h}</span> :
  <span>${m}</span> :
  <span>${s}</span> 
  `;

  clock.innerHTML = html;

};

setInterval(tick, 1000)