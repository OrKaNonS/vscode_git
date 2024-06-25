// this 실습

// in web browser
console.log(window===globalThis);

// 웹즈라우져의 전역객체 : window 또는 globalThis
// node의 전역객체 : global 또는 globalThis

//in node
// console.log(global === globalThis);

const g = globalThis;
// console.log(g);

g.name = 'global';
// console.log(g.name);


console.log('1) ' +this.name); // 1) undefined (node에서 전역 : {})


function func1() {
    console.log('2) ' +this.name); // 2) global(node에서 일반함수 내에서의 this => global)
}
func1();

function Person(name) {
    this.name = name;
    console.log('3) ' +this.name); // 3) 생성자함수에서의 this: 객체 강감찬
}
const person = new Person('강감찬');

const hong = {
    name: '홍길동', 
    getName() {
        return this.name;
    },
    printName() {
        setTimeout(function(){
            console.log('5) ' +this.name); // 5) 함수 내 this 전역, undefined
        }, 100);
        setTimeout(() => console.log('6) ' +this.name)); // 6) 화살표 함수, 홍길동
    }
};
console.log('4) ' +hong.getName()); // 4) 메소드 에서의 this:객체 홍길동
hong.printName();

function func2() {
    const name = 'fucn2';
    console.log('7) ' +this.name); // 7) 함수 내 this 전역객체 global
    function func3() {
        const name = 'func3';
        console.log('8) ' +this.name); // 8) 콜백함수내 this는 전역객체 global
    }
    func3();
}
func2();