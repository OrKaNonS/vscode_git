// todo4
// todo3 패키지 버전

interface Todo4 {
    id: number;
    title: string;
    completed: boolean;
}

let todos4: Todo4[] = [];

async function fetchJson2(): Promise<Todo4[]> {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos')
    if (!response.ok) {
        throw new Error('Error : ' + response.statusText);
    } else {
        return await response.json();
    }
}
fetchJson2()
.then(async function(response){
    todos4 = await response;
    todos4 = todos4.map( todo4 =>
        todo4 ={ 'id': todo4.id, 'title': todo4.title, 'completed': todo4.completed}
    ).splice(0,5);    
})
.then(() => {
    // 목록 _ 뒤에서 목록을 출력해주면 세팅되기전에 목록을 가져와서
    // 목록값이 undefined가 나오므로 .then을 붙여서 목록 값 출력

    console.log(todoPKG2.getTodos4()) // 목록 출력

    // 등록
    todoPKG2.registTodo4({'id': 6, 'title': 'title6', 'completed': false})
    console.log(todoPKG2.getTodos4());

    // 조회
    console.log(todoPKG2.getTodo4(6))

    // 수정
    todoPKG2.updateTodo4({'id': 6, 'title': 'up_title6', 'completed': false})
    console.log(todoPKG2.getTodos4())

    // 삭제
    todoPKG2.deleteTodo4(6);
    console.log(todoPKG2.getTodos4());
});

const todoPKG2 = {

// 목록
    getTodos4: function(): Todo3[] {
        return todos4;
    },

    // 조회
    getTodo4: function(paramId:number): Todo3 {
        // id에 해당하는 todo 객체를 추출하여 리턴
        return (todos4.filter(todo => todo.id === paramId))[0];
    },

    // 등록
    registTodo4: function(paramTodo: Todo4): void {
        if (!this.isExistedTodo4(paramTodo.id)) {
            todos4.push(paramTodo);
        }
    },

    // 수정
    updateTodo4: function(paramTodo: Todo4): Todo4[] {
        const id = paramTodo.id;
        if (this.isExistedTodo4(id)) {
            todos4 = [...this.deleteTodo4(id), paramTodo];
        }  return todos4;
    },

    // 삭제
    deleteTodo4: function(paramId: number): Todo4[] {
        if(this.isExistedTodo4(paramId)) {
            todos4 = todos4.filter(todo4 => todo4.id!= paramId);
        } return todos4;    
    },

    // id 존재여부 확인
    isExistedTodo4: function(paramId: number): boolean {
        return todos4.some(todo4 => todo4.id===paramId); // some = 1개라도 있으면 true
    }

    }