/* 클로져 (closure)
: 함수 내부에서 선언된 변수는 함수스코프를 따름(유효범위가 함수)
: 함수 내부에서 선언된 변수의 값을 함수 외부에서 사용해야할 경우
: 클로저를 만들어서 사용함
*/

// x는 전역변수
const x = 1;

function outer() {
    // x는 outer함수의 지역변수
    const x = 10;
    // 지역변수 x에 접근할 수 있는 내부함수
    // 클로져 : function() {console.log(x);};
    const inner = function() {
        console.log(x);
    };
    // 내부함수 리턴
    return inner;
}

// outer(외부함수) 호출 시 return 받은 inner(내부함수)가 호출됨.
// inner(내부함수)에 ' function() {console.log(x);}; ' 가 갇혀있다고 하여 closure
const innerFunc = outer();

// 내부함수를 실행해서 outer의 지역변수인 x에 접근
innerFunc();