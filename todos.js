const todoForm = document.querySelector(".js-form"),
    todoInput = todoForm.querySelector("input"),
    todoList = document.querySelector(".todoList");

const TODOS_LS = "toDos"

let toDos = [];

function editToDo(event) {

}

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    todoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDo();
}

function saveToDo() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click",deleteToDo);
    span.innerText = text;
    li.id = newId;
    li.appendChild(span);
    li.appendChild(delBtn);
    todoList.appendChild(li);
    const toDoObj = {
      text: text,
      id: newId
    };
    toDos.push(toDoObj);
    saveToDo();
}

function handleSubmit(event) {
    if(todoInput.value !== null) {
        event.preventDefault();
        const currentValue = todoInput.value;
        paintToDo(currentValue);
        todoInput.value = "";
    } else {
        alert("write a to do")
    }
    
}

function loadToDos() {
    const loadedToDo = localStorage.getItem(TODOS_LS);
    if ( loadedToDo !== null){
        const parsedToDos = JSON.parse(loadedToDo);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
    }
}

function init() {
    loadToDos();
    todoForm.addEventListener("submit",handleSubmit);
}

init();