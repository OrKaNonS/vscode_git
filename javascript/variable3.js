// 변수의 스코프(Scope = 참조범위 = 유효범위)

// 1. 전역스코프(global scope)
let global = "global"; // 파일 전역에서 사용 가능
var global_var = "global_var"; // 전역스코프변수

// 2. 블록스코프(block scope)
{
    let block = "block"; // 블록밖에서는 block 변수 참조 불가, 블록스포크변수
    var block_var = "block_var" // 전역스코프변수
}

// 3. 함수스코프 (function scope)
function func(a, b){
    var func_var = "func_var"; // 함수스코프변수
    let sum = a + b; // 함수밖에서는 sum 참조 불가, 함수스코프변수
    return sum;
}

console.log(global);
console.log(global_var);
// console.log(block);
console.log(block_var); // var로 선언하면 블록스코프를 가지지 않음
// console.log(func_var);
// console.log(sum);

// 블럭안에서 var로 선언하면 블록스코프가 아닌 전역스코프를 가진다.