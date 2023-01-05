const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
const search = document.querySelector('.search , input');
const clock = document.querySelector('.clock');


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

addForm.addEventListener('submit', e =>{

  e.preventDefault();

  const todo = addForm.add.value.trim();

  if(todo.length) {
  generateTemplate(todo)
  addForm.reset();
}
});


//deleteTodo

list.addEventListener('click', e => {
  if(e.target.classList.contains('delete') ) {
    e.target.parentElement.parentElement.remove();
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

setInterval(tick,1000)
