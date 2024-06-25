// Object.prototype

const person = {
    name: '홍길동'
};

// 객체의 생성자 함수
console.log(person.constructor);

// 객체가 가진 프라퍼티 조사
console.log(person.hasOwnProperty('name')); // true

//프로토타입 확인 (상속여부)
console.log(Object.prototype.isPrototypeOf(person)); // true

// 프라퍼티 열거가능여부 확인
console.log(person.propertyIsEnumerable('name')); // true

// 객체의 문자열 표현
console.log(Object.toString(person));
console.log(Object.toLocaleString(person));

// typeof 연산자(객체의 타입 확인)
console.log(typeof person); // Object

// instanceof 연산자 (상속여부 확인)
console.log(person instanceof Object); // true

// 프로토타입 체인 (프로토타입 연결)
const kang = {
    name: '강감찬'
};

if(Object.prototype == kang.__proto__) {
    console.log("kang은 Object를 상속받음!");
}

function Person(name, age) {
    this.name = name;
    this.age = age;
}
const person1 = new Person('유관순', 20);


// person1은 Person 상속
console.log(person1.__proto__ == Person.prototype); // true

// Person은 Function 상속
console.log(Person.__proto__ == Function.prototype); //true

// 그러므로 person1은 Person을 상속, Person은 Function을 상속
// person1 - Person - Function = 표현(코드상)
// person1.__proto - Person.prototype - Function.prototype  = 실질적 경로

// Function은 Object를 상속받지 않음
console.log(Function.__proto__ == Object.prototype); // false
console.log(typeof Function); // function
//Object = Object()는 생성자함수
console.log("==>" + typeof Object); // function
console.log(typeof Object.prototype); // Object

// in 연산자 : 객체에 프라퍼티 존재 여부 확인
console.log('name' in person1); // ture

// Object.keys/valure/entries
person1.age = 30;
person1.gender = '남';

console.log(Object.keys(person1));
console.log(Object.values(person1));
console.log(Object.entries(person1));


// 잠깐 실습)
// forEach 고차함수와 화살표함수 사용해서 person1의 프라퍼티를 나열
Object.entries(person1).forEach(
    ([key, value]) => console.log(key+ ':' +value+ ' ')
);
