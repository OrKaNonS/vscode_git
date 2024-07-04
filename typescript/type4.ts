/* 타입 호환 (type compatability) */
// 좁은타입의 값이 넓은타입의 값이 되는 것은 OK
// 넓은타입의 값이 좁은타입의 값이 되는 것은 error

// 타입호환의 범위
let s1: string = 'h1';
let s2: 'hello' = 'hello';
// s2 = s1; // hello 타입이 string 타입보다 좁음으로 ERROR
s1 = s2; // string 타입이  hello 타입보다 넓음으로 OK

// 구조적 타이핑(structural typing)
// 타입이 무엇인지가 중요한 것이 아니라 타입이 가지는 프라퍼티명과 
// 프라퍼티의 타입이 중요
// I4, I5 자체는 중요하지 않다. name: string 인게 중요한거다.
interface I4 {
    name: string;    
}
interface I5 {
    name: string;
}
let i4: I4 = {name: '홍길동'};
let i5: I5 = {name: '강감찬'};
i4 = i5;
i5 = i4;

interface I6 {
    name: number;
}
let i6: I6 = {name: 30};
// i4 = i6; // 호환 X
// i6 = i4; // 호환 X

// 객체간 타입 호환
// 할당받는 측의 타입을 만족해야 호환

interface Animal3 {
    name: string;
}

interface Dog3 {
    name: string;
    sound: string;
}

interface Bird3 {
    name: string;
    leg: number;
}
let animal3: Animal3 = {name: '동물'};
let dog3: Dog3 = {name: '강아지', sound:'왈왈'};
let bird3: Bird3 = {name: '새', leg:2}
// dog3 = bird3; // dog3에 넣으려면 sound가 필요하다.
// bird3 = dog3; // bird3에 넣으려면 leg가 필요하다.
// dog3 = animal3 // animal3에 sound 필요
// bird3 = animal3 // animal3에 leg 필요
animal3 = dog3;
animal3 = bird3;

// 옵셔널을 활용한 타입호환
interface Dog4 {
    name: string;
    sound?: string;
}
interface Bird4 {
    name: string;
    leg?: number;
}

let dog4: Dog4 = {name: '강아지', sound:'왈왈'};
let bird4: Bird4 = {name: '새', leg:2}
dog4 = bird4;
bird4 = dog4;

// 함수타입의 타입호환
let func6 = function(a: number, b: number) : number {
    return a + b;
};
let func7 = function(a:number): number {
    return a;
}

func6 = func7; // func7의 a 파라미터를 잃지 않음.
// func7 = func6 // func6의 b 파라미터를 잃어버림

// enum 타입의 타입 호환
// enum 타입은 같은 프라피티를 가져도 호환되지 않음.
enum Enum1 {A, B, C};
enum Enum2 {A, B, C};
let e1: Enum1 = Enum1.A;
let e2: Enum2 = Enum2.A;
// e1 = e2;
// e2 = e1;

// 제네릭의 타입 호환
// 제네릭은 트랜스파일 타임이 아니라 실행 타임에
// 타임체크가 가능하므로 트랜스파일시에는 에러감지 불가능
interface In1<T> {
}
let in1:In1<string> = 'string';
let in2:In1<number> = 30;
in1 = in2;
in2 = in1;

interface In2<T> {
    data: T
}
let in3:In2<string> = {data: 'string'}; // 데이터가 들어온 후에 비교하기 떄문에
let in4:In2<number> = {data: 30};       // 서로 호환이 안된다.
// in3 = in4; // data : number => string(x)
// in4 = in3; // data : string => number(x)
