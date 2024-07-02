/*
폴더 : jsontodo
파일 : jsontodo.html, jsontodo.css, jsontodo.js, Todo.js, Todo.json
기능 : 할일목록, 할일등록, 할일삭제, 할일검색(선택)
Todo : tdno 번호, tdcontent 내용, tdregdate 등록일시, tdcompleted 완료여부

구현사항)
1) REST와 json-server를 사용
2) 모든 데이터는 Todo클래스와 객체로 관리
3) 모든 함수는 화살표함수 사용
4) 모든 파라미터는 rest파라미터를 사용
5) 모든 데이터는 Todo.json파일에 JSON형태로 관리

호출URL)
할일목록 : GET http://localhost:3000/todos
할일등록 : POST http://localhost:3000/todos
할일삭제 : DELETE http://localhost:3000/todos/번호
할일검색 : GET http://localhost:3000/todos
*/

$(() => {

    printTodoList();

});


const requestTodo = function (method, url, payload) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    if(payload){
        xhr.setRequestHeader('content-type', 'application/json');
    }
    xhr.send(payload);
}



//Todo.json에 있는 목록을 가져와서 출력에 뿌려주기
const printTodoList = () => {
    $("#todoList").empty();
    fetch('Todo.json')
        .then(response => response.json())
        .then(data => {
            const todoList = data.todos;
            const todoListLeng = todoList.length;
            for (let i = 0; i < todoListLeng; i++) {
                $("#todoList").append(
                    `<li id='todo${i}'>
                        <div class='todo-details'>
                            <div class='todo-content'>${todoList[i].tdcontent}</div>
                            <div class='todo-date'>${new Date(todoList[i].tdregdate).toLocaleString()}</div>
                        </div>
                        <input id='removeBtn-${todoList[i].id}' class='removeBtn' type='button' value='삭제'/>
                    </li>`
                );
            }
            todoList.forEach((todo) => {
                $(`#removeBtn-${todo.id}`).click(() => {
                    requestTodo("DELETE", `http://localhost:3000/todos/${todo.id}`, null, printTodoList);
                });
            });
        })
        .catch(error => console.error('Error loading todos:', error));
};

$("#todoregBtn").on("click", () => {
    const newTodo = new Todo(1, $('#tdContent').val(), new Date(), false);
    requestTodo("POST", "http://localhost:3000/todos", JSON.stringify(newTodo));

});




