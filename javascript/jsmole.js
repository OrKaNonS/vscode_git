$(document).ready(function () {
    let score = 0; // score 초기화
    let currentMolePosition = -1;   // 현재 두더지 위치 초기화
  
    let gameTimeOut;
    let moleClicked = false; // 두더지 클릭되었는지

    const gameDuration = 60000; // 게임시간 60초

    function showMole() { // 두더지 나타나기
        $('.mole').remove();
        moleClicked = false;
        currentMolePosition = Math.floor(Math.random() * 9);
        $(`.cell[id=${currentMolePosition}]`)
            .append('<div class="mole"></div>');

        const ddgMoveTime = randomTime(500, 2000);

        $('.mole').show();
        setTimeout(function () {
            if (!moleClicked) { // 두더지가 클릭 되었다면
                $('.mole').remove();
                showMole(); // 새로운 두더지를 나타나게 함
            }
        }, ddgMoveTime);
    }

    function startGame() { // 게임 시작
        score = 0;
        $('#score').text(`Score : ${score})`)
        showMole();
        gameTimeOut = setTimeout(endGame, gameDuration);

    };

    const randomTime = function (min, max) {
        return Math.floor(Math.random() * (max - min) + 1) + min;
    };

    function endGame() {    // 게임 끝
        clearInterval(gameTimeOut);
        $('.mole').remove();
        alert(`Game over! Your score is ${score}`);
    }



    $(document).on('click', '.cell', function () { // 클릭이벤트

        const getPoint = parseInt(this.id);
        if (getPoint === currentMolePosition ) {
            score++;
            moleClicked = true; // 두더지 클릭함.
            $('#score').text(`Score: ${score}`);
            $('.mole').css('background-image', 'url(moleshot.png)');


            // setTimeout(function () {
            //     $('.mole').remove();
            //     currentMolePosition = -1;
            // }, 300);
            // showMole();
        };
    });

    $('#startbutton').on('click', function () { // 시작 버튼 이벤트
        const playerId = prompt("이름 혹은 아이디를 입력해주세요");
        if (playerId != '') {
            startGame();
        } else {
            alert("이름 혹은 아이디를 확인해주세요.")
        };
    });
});


// function ddgMove() {
//     const ddbMoveTime = randomTime(800, 1200);
//     setInterval (function() {
//         const ddgAnimate = function () {
//             const timer = setInterval(function () {
//                 if (ddgTop == 100) ddgTop = 250;
//                 console.log(`$(ddgTop -= 5)px`);
//                 $("#dong").css("top", `${ddgtop -= 5}px`);
//             }, 100);
//         }

//     }, ddgMoveTime);
// }



// 게임시작
// 게임시간 setInterval
// 랜덤슬롯선택 > setTimeout 두더지 활동종료 랜덤 > 랜덤슬롯선택
// setTimeout(두더지하는일에대한함수, 0) => 0의 값 랜덤변경
// 두더지하는일에대한함수에서 애니메이션 > setInterval

// 수정해야 할것
// 1. 두더지 잡았을 시 그림 바뀌고 멈추는 현상
// 2. 한번에 여러번 클릭시 score 중첩되는 현상
// 3. 처음 화면에 난이도 선택하면 min, max 조절되어 난이도 올라가는 함수
// 4. 이미지 밑에서 올라오고 하는 animation 기능
// 5. 입력 데이터 localStorage 에 저장 (memo 확인)
// 6. 우측 위에 최고 점수 표기되게
// 7. 화면 클릭시 이미지 변경 후 0.3초뒤 삭제 or 마우스 떼면 삭제





// const ddgAnimate = function () {
//     const timer = setInterval(function () {
//         if (ddgTop == 100) ddgTop = 250;
//         console.log(`$(ddgTop -= 5)px`);
//         $("#dong").css("top", `${ddgtop -= 5}px`);
//     }, 100);
// }






