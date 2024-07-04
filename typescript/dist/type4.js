/* 타입 호환 (type compatability) */
// 좁은타입의 값이 넓은타입의 값이 되는 것은 OK
// 넓은타입의 값이 좁은타입의 값이 되는 것은 error
// 타입호환의 범위
let s1 = 'h1';
let s2 = 'hello';
// s2 = s1; // hello 타입이 string 타입보다 좁음으로 ERROR
s1 = s2; // string 타입이  hello 타입보다 넓음으로 OK
let i4 = { name: '홍길동' };
let i5 = { name: '강감찬' };
i4 = i5;
i5 = i4;
let i6 = { name: 30 };
let animal3 = { name: '동물' };
let dog3 = { name: '강아지', sound: '왈왈' };
let bird3 = { name: '새', leg: 2 };
// dog3 = bird3; // dog3에 넣으려면 sound가 필요하다.
// bird3 = dog3; // bird3에 넣으려면 leg가 필요하다.
// dog3 = animal3 // animal3에 sound 필요
// bird3 = animal3 // animal3에 leg 필요
animal3 = dog3;
animal3 = bird3;
let dog4 = { name: '강아지', sound: '왈왈' };
let bird4 = { name: '새', leg: 2 };
dog4 = bird4;
bird4 = dog4;
// 함수타입의 타입호환
let func6 = function (a, b) {
    return a + b;
};
let func7 = function (a) {
    return a;
};
func6 = func7; // func7의 a 파라미터를 잃지 않음.
// func7 = func6 // func6의 b 파라미터를 잃어버림
// enum 타입의 타입 호환
// enum 타입은 같은 프라피티를 가져도 호환되지 않음.
var Enum1;
(function (Enum1) {
    Enum1[Enum1["A"] = 0] = "A";
    Enum1[Enum1["B"] = 1] = "B";
    Enum1[Enum1["C"] = 2] = "C";
})(Enum1 || (Enum1 = {}));
;
var Enum2;
(function (Enum2) {
    Enum2[Enum2["A"] = 0] = "A";
    Enum2[Enum2["B"] = 1] = "B";
    Enum2[Enum2["C"] = 2] = "C";
})(Enum2 || (Enum2 = {}));
;
let e1 = Enum1.A;
let e2 = Enum2.A;
let in1 = 'string';
let in2 = 30;
in1 = in2;
in2 = in1;
let in3 = { data: 'string' }; // 데이터가 들어온 후에 비교하기 떄문에
let in4 = { data: 30 }; // 서로 호환이 안된다.
// in3 = in4; // data : number => string(x)
// in4 = in3; // data : string => number(x)
