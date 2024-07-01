// event 핸들러 등록 방법 3가지

// 1. html의 이벤트속성에 등록
// 단점 : html 코드와 자바스크립크 코드가 혼용
// <input id="btn" type="button" onclick="alert('눌렀당~'); alert('한번 더?')";  value="눌러보삼" _ html에 넣음


// 2. 이벤트타겟의 이벤트속성을 자바스크립트에서 등록
// 단점 : 이벤트핸들러를 하나만 등록 가능
/*
document.querySelector("#btn").onclick = function() {
    alert('눌렀심');
};
document.querySelector("#btn").onclick = function() {
    alert('또 눌렀심');
};
*/


// 3. addEventListener 함수를 사용
// - 발생한 이벤트에 대해 여러개의 이벤트핸들러 등록이 가능하다.
// - 이벤트핸들러를 필요에 따라 등록 및 제거하여 유연하게 처리가 가능하다.
//   (발생한 이벤트에 대해서 처리하거나 처리하지 않을 수 있다.)
// 이벤트 타겟 :document.querySelector("#btn")
// 이벤트 타입 : click
// 이벤트 핸들러 : function(e) {}
// 이벤트 객체 : e


/*
// 발생한 이벤트에 대해 여러개의 이벤트핸들러 등록이 가능하다.
document.querySelector("#btn").addEventListener('click', function(e){
    alert('눌렀심');
});

document.querySelector("#btn").addEventListener('click', function(e){
    alert('또 눌렀심');
});

document.querySelector("#btn").addEventListener('click', function(e){
    alert('또 또 눌렀심');    
});
*/

// 이벤트핸들러 분리
const first = function(e) { alert('눌렀심');};
const second = function(e) { alert('또 눌렀심');};
const third = function(e) { alert('또 또 눌렀심');};

// 이벤트핸들러 등록
document.querySelector("#btn").addEventListener('click', first);
document.querySelector("#btn").addEventListener('click', second);
document.querySelector("#btn").addEventListener('click', third);

// 이벤트핸들러 제거
document.querySelector("#btn").removeEventListener('click', second);