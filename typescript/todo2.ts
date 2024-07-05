// todo2. ts
// 패키지개념(객체생성해서 패키지생성)을 도입해서 함수들을 메소드화 =>
// 일반적으로 function으로 작업시 전부 전역 함수가 됨
// 전역함수가 많으면 느려지는 등의 문제가 생긴다.

interface Todo2 {
    id: number;
    title: String;
    completed: Boolean;
}

let todos2: Todo2[] = [
    {id: 1, title: '아침먹기', completed: true},
    {id: 2, title: 'TS공부', completed: true},
    {id: 3, title: '점심먹기', completed: false},
];

// 패키지로 사용할 객체를 생성
const todoPKG = {

    getTodos: function(): Todo2[] {
        return todos2;
    },

    getTodo: function(paramId:number): Todo2 {
        return (todos2.filter(todo2 => todo2.id === paramId))[0];
    },

    registTodo: function(paramTodo: Todo2): void {
        // id가 존재하면 todos배열에 새로운 todo를 삽입
        if (!this.isExistedTodo(paramTodo.id)) {
            todos2.push(paramTodo);
        }
},

    updateTodo: function(paramTodo: Todo2): Todo2[] {
        const id = paramTodo.id;
        // id에 해당하는 todo가 존재하면 
        if (this.isExistedTodo(id)) {
            // id에 해당하는 todo가 삭제된 배열과 수정할 데이터가 담긴
            // todo를 합친 새로운 배열을 리턴
            todos2 = [...this.deleteTodo(id), paramTodo];
        }  return todos2;
},

    deleteTodo: function (paramId: number): Todo2[] {
        // id에 해당하는 todo가 존재하면
        if(this.isExistedTodo(paramId)) {
            // id에 해당하지 않는 todo들만 가진 배열을 리턴
            return todos2.filter(todo2 => todo2.id!= paramId);
        }else {
            return todos2;    
        }
},

    isExistedTodo: function(paramId:number): boolean {
        // id에 해당하는 존재여부가 있는지 확인
        return todos2.some(todo2 => todo2.id === paramId); // some = 1개라도 있으면 true
}
};

// 목록
console.log(todoPKG.getTodos())

// 조회
console.log(todoPKG.getTodo(3))

// 등록
todoPKG.registTodo({id: 4, title: '저녁먹기', completed: false})
console.log(todos2);

// 수정
console.log(todoPKG.updateTodo({id: 4, title: '운동하기', completed: false}))

// 삭제
console.log(todoPKG.deleteTodo(4));
