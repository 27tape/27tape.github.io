// document에서 html 태그로 js-toDoForm의 input과 js-toDoList 가져오기
const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

// toDo list
const TODOS_LS = 'toDos';

// toDo를 추가 삭제 해줘야 하기때문에 let으로 선언
let toDos = [];

// todo 삭제하기
function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

// todo localStorage에 저장하기
function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

// localStorage 에서 todo 불러오기
function loadToDos(){
    const toDosLoaded = localStorage.getItem(TODOS_LS);
    if(toDosLoaded !== null){
        const parsedToDos = JSON.parse(toDosLoaded);
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        });
    }
}

// todo list 생성 및 출력하기
function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerHTML = "🗑️";
    delBtn.addEventListener("click", deleteToDo);
    const span = document.createElement("span");
    const newid = toDos.length +1;
    li.id = newid;
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    toDoList.appendChild(li);

    const toDoObj = {
        text: text,
        id: newid
    };
    toDos.push(toDoObj);
    saveToDos();
}

// toDoForm 을 제출하면, 값을 받아와서 리스트로 만들기
function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

// 페이지 로드 시 저장된 걸 불러오고, 이벤트를 처리함
function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();
 