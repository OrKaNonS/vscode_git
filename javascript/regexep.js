//  정규표현식 (Rehular Expression)
// * 패턴과 플래그로 구성된 문자열에서 서브문자열을 탐색하기 위한 표현식
// * // : 정규표현식 리터럴
// * '/패턴/플래그' 문법을 사용

// 패턴
/*
\d : 숫자 하나
\D : 숫자가 아닌 것 하나
\w : 알파벳, 숫자, 언더스코어('_') 하나 
\W : 알파벳, 숫자, 언더스코어('_')가 아닌 것 하나 => 특수 문자 같은...
\s : 공백문자 하나
\S : 공백문자가 아닌것 하나
. : 문자하나
... or .{3} : 문자 3개
? : 문자 0개 또는 1개 => ? 앞 문자가 있거나 없거나
* : 문자 0개 또는 1개 이상
+ : 문자 1개 이상
{n} : n번 반복
{n, m} : 최소 n번, 최대 m번 반복
| : or
[] : or
^ : 시작
$ : 끝
[^] : not (부정)
*/

// 플래그
/*
i : 대소 문자구별 안함 (ignore case)
g : 전체 문자열에서 검색 (global)
m : 문자열이 여러 라인일때 여러 라인에서 모두 검색 (multi-line)
*/

// 정규표현식 메소드

// 1.  RegExp 객체 메소드
// text() : 정규표현식에 일치하는 문자열이 있는지 true/false 반환
// exec() : 정규표현식에 일치하는 문자열을 반환

// 2. String 객체 메소드
// match() : 정규표현식에 일치하는 문자열을 반환
// replace() : 정규표현식에 일치하는 문자열을 다른 문자열로 대체
// search() : 정규표현식에 일치하는 첫번쨰 문자열의 인덱스를 반환
// split() : 정규표현식에 있는 것을 대상으로 잘라서 앞에 것 부터 나열한다.
// String str = "1aA2bB3cC";
// String[] results = str.split("[0-9]");
// for (int i = 0; i < results.length; i++) {
// 	System.out.println("results[" +i + "] = " + results[i]); }
// results[0] = 
// results[1] = aA
// results[2] = bB
// results[3] = cC
// 출력을 index 기준으로 설명하자면
// - index 0 : 1 앞에 아무 것도 없으므로 공백이 나옵니다.
// - index 1 : 1과 2 사이에 있는 aA를 자릅니다.
// - 그 이후 숫자 사이의 알파벳만 추출합니다.

// 1) 아이디 : 문자로 시작하고 문자 또는 숫자 또는  _만 허용
//            최소 8자리 최대 12이하로 된 패턴
const reg1 = /^[A-Za-z][\w]{7,11}$/;
const testid1 = 'djstnddl';
const testid2 = '07hslee';
console.log(reg1.test(testid1));
console.log(reg1.test(testid2));

// 2) 주민번호 : 숫자6자리-숫자7자리 // 확인할 것
//              년도2자리 월2자리 일2자리 -성별숫자(1~4) 숫자6개
const testSno = '990101-1234567';
const reg2 = /^\d{6}-\d{7}$/
const reg3 = /^\d{2}(0[1-9]|1[0-2]])(0[1-9]|1\d|2\d|3[0-1])-[1-4]\d{6}$/;
console.log(reg2.test(testSno));
console.log(reg3.test(testSno));



// 3) 아이피주소 : 숫자 1~3자리.숫자 1~3자리.숫자 1~3자리.숫자 1~3자리
//                숫자는 0~255로 제한 // 확인할 것

const strIp = '127.0.0.1'
const reg4 =  /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/;
console.log(reg4.test(strIp));
