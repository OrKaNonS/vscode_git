// fetch
// 자바스크립트에서 비동기처리를 간편하게 하기 위해 고안

// fetch("http://jsonplaceholder.typicode.com/users")
// .then(response => response.json())
// .then(json => { // json 객체
//     console.log(json);
//     console.log(json.length);
// })

// patch / put
// fetch('http://jsonplaceholder.typicode.com/todos/1',
//     {
//         method: 'PUT',
//         header: {'Content-type': 'application/json'},
//         body: JSON.stringify({
//             userId: 1,
//             title: 'React',
//             completed: false
//         })
//     }   
// )
// .then(response => response.json())
// .then(todo => console.log(todo))
// .catch(err => console.log(err));


// delete
fetch('http://jsonplaceholder.typicode.com/todos/1',
    { method: 'DELETE' })
.then(response => response.json())
.then(todo => console.log(todo))
.catch(err => console.log(err));