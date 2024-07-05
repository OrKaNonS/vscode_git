// Todo 
let todos = [
    { id: 1, title: '아침먹기', completed: true },
    { id: 2, title: 'TS공부', completed: true },
    { id: 3, title: '점심먹기', completed: false },
];
// 목록
function getTodos() {
    return todos;
}
// 조회
function getTodo(paramId) {
    // id에 해당하는 todo 객체를 추출하여 리턴
    return (todos.filter(todo => todo.id === paramId))[0];
}
// 배열의 맨 앞에 삽입 : unshift
// 배열의 맨 앞에서 제거 : shift
// 배열의 맨 뒤에 삽입 : push
// 배열의 맨 뒤에서 제거 : pop
// 등록
function registTodo(paramTodo) {
    // id가 존재하면 todos배열에 새로운 todo를 삽입
    if (!isExistedTodo(paramTodo.id)) {
        todos.push(paramTodo);
    }
}
// 수정
function updateTodo(paramTodo) {
    const id = paramTodo.id;
    if (isExistedTodo(id)) {
        return [...deleteTodo(id), paramTodo];
    }
    else {
        return todos;
    }
}
// 삭제
function deleteTodo(paramId) {
    if (isExistedTodo(paramId)) {
        return todos.filter(todo => todo.id = paramId);
    }
    else {
        return todos;
    }
}
// id 존재여부 확인
function isExistedTodo(paramId) {
    return todos.some(todo => todo.id === paramId); // some = 1개라도 있으면 true
}
// 목록
console.log(getTodos());
// 등록
registTodo({ id: 4, title: '저녁먹기', completed: false });
console.log(getTodos());
//수정
console.log(updateTodo({ id: 4, title: '운동하기', completed: false }));
// 조회
console.log(getTodo(4));
// 삭제 
console.log(deleteTodo(4));
