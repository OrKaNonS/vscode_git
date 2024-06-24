// 스코프 (Scope, 식별자의 참조범위)
// 1. 전역스코프
// 2. 함수스코프
// 3. 블록스코프
// 4. 모듈스코프

//* var 키워드의 경우 함수내에서 var키워드로 선언된 변수만 함수의 지역번수
// var는 블록스코프를 따르지 안음.

// 스코프체인
// - 하위스코프에서 상위스코프로 연결되어 있는 것.
// - 변수 참조나 함수 호출시에 자신의 상위 스코프부터 계속해서 검색(상위로 시작해서 하위로)

var x = 1; // G
let y = 2; // G
const z = 3; // G

console.log(x, y, z);

function func1(x, y) { // func1:G , x:L, y:L
    console.log(x, y);
}
func1(5, 10);

// func2 : G
function func2(){
    var x = 4; // func2의 L
    let y = 5; // func2의 L
    const z = 6; // func2의 L
    function func3() { // func2의 L
        console.log(x);
        // var x; ===> undefined
        // x를 선언하기 전에 사용하면
        //  func3의 첫라인에 선언물을 호이스팅함.
        var x = 7; // func3의 L
        let y = 8; // func3의 L 
        const z = 9; // func3의 L
        console.log(x, y, z); // func3의 L
    }
    func3();
}
func2();


// var로 선언한 변수는 global scope을 따름
{
    var x = 10; // G
    let y = 11; // L
    const z = 12; // L
} console.log(x, y, z);

