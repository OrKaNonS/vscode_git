// 콜백함수 (callback function)

// 1. 이벤트리스너(event listener)
// javascript
// load 이벤트에 대한 콜백함수
// window.addEventListener('load', function() {

//     // click이벤트에 대한 콜백함수, onclick로 할 시 1가지의 작업만 가능
//     // document.getElementById("btn").onclick = function() {
//     //     document.getElementById("result").innerHTML = 
//     //         document.getElementById("txt").value;
//     // };

//     // click 이벤트에 대한 콜백함수 2), addEventListener로 할 시 여러가지 작업 가능
//     document.getElementById("btn").addEventListener('click', function() {
//         document.getElementById("result").innerHTML = 
//         document.getElementById("txt").value;
//     });
//     document.getElementById("btn").addEventListener('click', function() {
//         alert('버튼이 클릭됨!');
//     });
// });


// JQuery
// load 이벤트콜백_위의 load 이벤트에 대한 콜백함수를 JQuery로 변경
// $(function () {
//     // click이벤트 콜백
//     $("#btn").click(function () {
//         $("#result").html($("#txt").val());
//     });
//     $("#btn").click(function () {
//         console.log(('1'));
//     });
//     $("#btn").click(function () {
//         console.log(('2'));
//     });
// });

// 2. AJAX 콜백함수
// window.onload = function () {
//     const xhr = new XMLHttpRequest();
//     xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');
//     xhr.send();
    // readystatechange 이벤트 콜백 함수
    // xhr.onreadystatechange = function () {
    //     if (xhr.readyState == 4 && xhr.status == 200) {
    //         document.getElementById("result").innerHTML
    //             = xhr.responseText;
    //     }
    // };
    // 위의 주석된 이벤트 콜백함수를 이벤트리스터 방식으로 변경
//     xhr.addEventListener('readystatechange', function () {
//         if (xhr.readyState == 4 && xhr.status == 200) {
//             document.getElementById("result").innerHTML
//                 = xhr.responseText;
//         }
//     });
//     xhr.addEventListener('readystatechange', function () {
//         if (xhr.readyState == 4 && xhr.status == 200) {
//             alert(xhr.responseText);
//         }
//     });
// };

// JQuery로 변경

// $(function () {
//     $.ajax({
//         method: 'GET',
//         url: 'https://jsonplaceholder.typicode.com/posts',
//     }).done(function (result) {
//         $("#result").html(JSON.stringify(result));
//     }).fail(function(err){
//         console.log(err);
//     });
// });

// axios로
// axios.get('https://jsonplaceholder.typicode.com/posts')
//     .then(function (response) {
//         $("#result").html(JSON.stringify(response));
//     })
//     .catch(function (error) {
//         console.log(error);
//     })
//     .finally(function () {
//     });

// 3. timing function
// setTimeout : 특정 시간 후에 콜백 수행
// setInterval : 특정 시간 간격으로 콜백 수행

// 1) setTimeout(callback, milliseconds)
// $(function(){
//     setTimeout(cbfunc, 3000); // 3초 후 실행
// });
// const cbfunc = function() {
//     console.log("cbfunc수행됨!");
// }

// 1) setInterval(callback, milliseconds)
//실습_ 타이머멈춰! 버튼 누르면 타이머 멈추도록 코드 수정
let count = 0;
let timer = null;
$(function () {
    timer = setInterval(cbfunc, 1000); // 1초 마다 실행
    $("#stop").on('click', function () {
        clearInterval(timer);
    });
    $("#start").on('click', function () {
        timer = setInterval(cbfunc, 1000);
    });
});

const cbfunc = function () {
    console.log(`cbfunc ${++count}번 수행됨!`);
}















// $(function () {
//     // click이벤트 콜백
//     $("#btn").click(function () {
//         $("#result").html($("#txt").val());
//     });
//     $("#btn").click(function () {
//         console.log(('1'));
//     });
//     $("#btn").click(function () {
//         console.log(('2'));
//     });
// });