// 함수(function)

// 함수 선언문 : runtime 이전에 메모리에 생성
function add(x, y) {
    return x + y;
}
console.log(add);
console.log(add());  // NaN x=undefined, y=undefined
console.log(add(3)); // NaN x=3, y=undefined
console.log(add(3, 5)); // 8
console.log(add(3, 5, 7)); // 8
console.log(add('hello', 'javascript'));

// 함수 리터럴 : 코드에 쓰여진 함수값, runtime에 메모리에 생성
const func1 = function() {
    console.log("\nfunc1")
};
func1();
const func2 = function() {
    console.log("\nfunc2")
}
const func3 = function(f) {
    f();
    console.log("\nfunc3")
}

func3(func2); // func2 함수를 전달
func3(func2);
//func3(func2()) // func2 함수의 실행결과를 전달

const func4 = function a() {
    console.log('func4');
};
// a(); a라는 함수명은 엔진내부에서 사용
func4();

const func5 = function (a, b) {
    return a + b;
}
console.log('\n', func5(3, 5));

// 실습)
// 함수리터럴을 이용해서 사칙연산(+, -, *, /)을
// 수행하는 하나의 함수를 만들어 봅시다.

const calc = function(f, a, b){
    console.log(f(a, b));    
}
calc(function(a, b){return a + b;} , 3, 5);
calc(function(a, b){return a - b;} , 3, 5);
calc(function(a, b){return a * b;} , 3, 5);
calc(function(a, b){return a / b;} , 3, 5);

// 나머지 연산, a제곱과 b제곱의 합 연산
calc(function(a, b){return a % b;} , 3, 5);
calc(function(a, b){return (a**2) + (b**2);} , 3, 5);

//화살표 함수 [ function 제거, 파라미터 기입 => 메소드]
const add2 = (x, y) => x + y; // function(x, y) {return x+y};
console.log(add2(3, 5));

const add3 = x => x*x; // function(x) {return x*x};
console.log(add3(3));

const afunc = (x, y) => {
    let result = x + y;
    return result;    
}
console.log(afunc(3,5));

// 실습 2)
// 실습1)을 화살표 함수를 사용하여 변경
// const calc = function(f, a, b){
//     console.log(f(a, b));    
// }
const calc2 = (f, a, b) => console.log(f(a, b));
calc2((a, b) => a + b, 3, 5);
calc2((a, b) => a - b, 3, 5);
calc2((a, b) => a * b, 3, 5);
calc2((a, b) => a / b, 3, 5);
calc2((a, b) => a % b, 3, 5);
calc2((a, b) => a*a + b*b, 3, 5);

// Function 생성자 함수
const ffunc = new Function('x', 'y', 'return x * y;');
console.log(ffunc);
console.log(ffunc(3, 5));

// parameter, argument
// parameter : 함수가 값을 전달받기 위해 선언한 함수의 지역변수
// argument(인자) : 함수의 파라미터에 전달되는 값
const pfunc = function(a, b){ // a, b는 파라미터이며 함수의 지역변수
    return a + b;
}
// 4의 값이 a에 할당되면 a는 number타입이 됨.
console.log(pfunc(4,6)); // 4, 6은 인자

// arguments : 함수의 인자들의 배열
// caller : 호출한 함수
// callee : 호출된 함수
console.log(pfunc.arguments); // null

const argfunc = function(x, y){
    console.log(argfunc.arguments);
    console.log(argfunc.arguments[0]);
    console.log(argfunc.arguments[1]);
}
argfunc(1, 2);

// 실습 3)
// 아래와 같은 함수를 하나를 생성
// i)함수를 하나 만들어서 함수의 파라미터의 수와 전달된 인자의 수가 같이 않으면
// 메세지를 출력하고 함수를 실행하지 않는 함수를 생성
// ii)함수의 파라미터의 수와 전달된 인자의 수가 같다면
// 모든 인자들을 다 더해서 반환하는 함수


const exerfunc = function(a, b, c) {
    const exerLeng = arguments.length;
    if(exerLeng !=3){
        console.log("인자의 갯수가 잘못입력되었습니다.");
        return false;
    }else{
        console.log(a + b + c);
    }
};
exerfunc(1, 2);
exerfunc(1, 2, 3);
exerfunc(1, 2, 3, 4);

// cf) ... 스프레드문법
// 파라미터의 개수를 지정하기 곤란할 떄
// 파라미터들을 배열로
const func11 = function(...args) {
    console.log(args.length);   // 파라미터의 길이
    console.log(arguments.length); // 인자의 길이
}
func11(1, 2, 3);








