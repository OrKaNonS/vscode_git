<<<<<<< HEAD
$(document).ready(function () {
    let score = 0; // score 초기화
    let currentMolePosition = -1; // 현재 두더지 위치 초기화
    let gameTimeOut;
    let moleTimeout;
    let moleClicked = false; // 두더지 클릭되었는지
    let gameRunning = false; // 게임이 진행 중인지 확인
    let minTime = 1000; // 난이도에 따른 최소 시간
    let maxTime = 2000; // 난이도에 따른 최대 시간
    const gameDuration = 10000; // 게임시간 60초

    function showMole() { // 두더지 나타나기
        if (!gameRunning) return; // 게임이 진행 중이지 않으면 반환

        clearTimeout(moleTimeout); // 시간 초기화
        $('.mole').remove();
        $('.super-mole').remove();
        moleClicked = false;
        currentMolePosition = Math.floor(Math.random() * 10);

        if (currentMolePosition === 9) {
            console.log("슈퍼 두더지 출현");
            currentMolePosition = Math.floor(Math.random() * 9);
            $(`.cell[id=${currentMolePosition}]`).append('<div class="super-mole"></div>');
            setTimeout(() => {
                $('.super-mole').addClass('up');
            }, 10);
        } else {
            $(`.cell[id=${currentMolePosition}]`).append('<div class="mole"></div>');
            setTimeout(() => {
                $('.mole').addClass('up');
            }, 10);
        }

        const ddgMoveTime = randomTime(minTime, maxTime);

        moleTimeout = setTimeout(function () {
            if (!moleClicked && gameRunning) { // 두더지가 클릭되지 않았고 게임이 진행 중이라면
                $('.mole').remove();
                $('.super-mole').remove();
                showMole(); // 새로운 두더지를 나타나게 함
            }
        }, ddgMoveTime);
    }

    function startGame() { // 게임 시작
        const nickname = $('#nickname').val();
        if (!nickname) {
            Swal.fire({
                icon: 'warning',
                title: '닉네임을 입력해주세요!',
                showConfirmButton: true,
                timer: 2000
            });
            $('#startbutton').show();
            return;
        }

        score = 0;
        $('#score').text(`Score: ${score}`);
        gameRunning = true; // 게임 시작
        showMole();
        gameTimeOut = setTimeout(endGame, gameDuration);
    }

    const randomTime = function (min, max) {
        return Math.floor(Math.random() * (max - min) + 1) + min;
    }

    function endGame() { // 게임 끝
        gameRunning = false; // 게임 종료
        clearTimeout(gameTimeOut);
        clearTimeout(moleTimeout);
        $('.mole').remove();
        $('.super-mole').remove();

        Swal.fire({
            icon: 'info',
            title: 'Time over!',
            text: `당신의 점수는 ${score}입니다!`,
            showConfirmButton: true,
            timer: 5000
        });

        let nickname = $('#nickname').val();
        if (nickname) {
            let record = {
                name: nickname,
                score: score,
                regdate: new Date().toLocaleString()
            };
            saveRecord(record);
            printRecordList(); // 점수판 업데이트
        }
        $('#startbutton').show();
    }

    function saveRecord(record) {
        const recordArr = getRecordList();
        recordArr.push(record);
        localStorage.setItem("recordList", JSON.stringify(recordArr));        
    };

    function getRecordList() {
        let recordList = localStorage.getItem("recordList");
        if (recordList==null || recordList=="") {
            localStorage.setItem("recordList", "[]");
            return [];
        } else {
            return JSON.parse(recordList);
        }
    }


    function printRecordList() {
        const recordList = getRecordList();
        let printStr = '';
        for (let i = 0; i < recordList.length; i++) {
            printStr += `<tr>
                            <td>${recordList[i].name}</td>
                            <td>${recordList[i].score}</td>
                            <td>${recordList[i].regdate}</td>
                        </tr>`;
        }
        $('#recordList').html(printStr);
    };

    $(document).on('click', '.cell', function () { // 클릭이벤트
        const getPoint = parseInt(this.id);
        if ((getPoint === currentMolePosition) && !moleClicked && gameRunning) {
            if ($(this).find('.super-mole').length) {
                score += 50; // 슈퍼 두더지 클릭 시 50점 추가
                moleClicked = true; // 두더지 클릭함
                $('#score').text(`Score: ${score}`);
                $('.super-mole').css('background-image', 'url(super-moleshot.png)');
            } else {
                score += 10; // 일반 두더지 클릭 시 10점 추가
                moleClicked = true; // 두더지 클릭함
                $('#score').text(`Score: ${score}`);
                $('.mole').css('background-image', 'url(moleshot.png)');
            }

            setTimeout(function () {
                $('.mole').remove();
                $('.super-mole').remove();
                if (gameRunning) {
                    showMole();
                }
            }, 100);
        }
    });

    $('#startbutton').on('click', function () { // 시작 버튼 이벤트
        $('#difficulty').show(); // 난이도 선택 창 표시
        $(this).hide(); // 시작 버튼 숨기기
    });

    $('.difficulty-btn').on('click', function () { // 난이도 버튼 이벤트
        minTime = parseInt($(this).attr('spd-min'));
        maxTime = parseInt($(this).attr('spd-max'));
        $('#difficulty').hide(); // 난이도 선택 창 숨기기

        Swal.fire({
            icon: 'info',
            title: '게임이 곧 시작됩니다!',
            text: '3초 후에 게임이 시작됩니다.',
            timer: 3000,
            timerProgressBar: true,
            onBeforeOpen: () => {
                Swal.showLoading();
            },
            onClose: () => {
                startGame(); // 3초 후에 게임 시작
            }
        });
    });

    printRecordList();
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
// 1. 두더지 잡았을 시 그림 바뀌고 멈추는 현상_ 완료
// 2. 한번에 여러번 클릭시 score 중첩되는 현상_ 완료
// 3. 처음 화면에 난이도 선택하면 min, max 조절되어 난이도 올라가는 함수_완료
// 4. 이미지 밑에서 올라오고 하는 animation 기능_완료
// 5. 입력 데이터 localStorage 에 저장 (memo 확인)
// 6. 우측 위에 최고 점수 표기되게
// 7. 화면 클릭시 이미지 변경 후 0.1초뒤 삭제 or 마우스 떼면 삭제_완료
// 8. 슈퍼두더지?





// const ddgAnimate = function () {
//     const timer = setInterval(function () {
//         if (ddgTop == 100) ddgTop = 250;
//         console.log(`$(ddgTop -= 5)px`);
//         $("#dong").css("top", `${ddgtop -= 5}px`);
//     }, 100);
// }






=======
$(document).ready(function () {
    let score = 0; // score 초기화
    let currentMolePosition = -1; // 현재 두더지 위치 초기화
    let gameTimeOut;
    let moleTimeout;
    let moleClicked = false; // 두더지 클릭되었는지
    let gameRunning = false; // 게임이 진행 중인지 확인
    let minTime = 1000; // 난이도에 따른 최소 시간
    let maxTime = 2000; // 난이도에 따른 최대 시간
    const gameDuration = 10000; // 게임시간 60초

    function showMole() { // 두더지 나타나기
        if (!gameRunning) return; // 게임이 진행 중이지 않으면 반환

        clearTimeout(moleTimeout); // 시간 초기화
        $('.mole').remove();
        $('.super-mole').remove();
        moleClicked = false;
        currentMolePosition = Math.floor(Math.random() * 10);

        if (currentMolePosition === 9) {
            console.log("슈퍼 두더지 출현");
            currentMolePosition = Math.floor(Math.random() * 9);
            $(`.cell[id=${currentMolePosition}]`).append('<div class="super-mole"></div>');
            setTimeout(() => {
                $('.super-mole').addClass('up');
            }, 10);
        } else {
            $(`.cell[id=${currentMolePosition}]`).append('<div class="mole"></div>');
            setTimeout(() => {
                $('.mole').addClass('up');
            }, 10);
        }

        const ddgMoveTime = randomTime(minTime, maxTime);

        moleTimeout = setTimeout(function () {
            if (!moleClicked && gameRunning) { // 두더지가 클릭되지 않았고 게임이 진행 중이라면
                $('.mole').remove();
                $('.super-mole').remove();
                showMole(); // 새로운 두더지를 나타나게 함
            }
        }, ddgMoveTime);
    }

    function startGame() { // 게임 시작
        const nickname = $('#nickname').val();
        if (!nickname) {
            Swal.fire({
                icon: 'warning',
                title: '닉네임을 입력해주세요!',
                showConfirmButton: true,
                timer: 2000
            });
            $('#startbutton').show();
            return;
        }

        score = 0;
        $('#score').text(`Score: ${score}`);
        gameRunning = true; // 게임 시작
        showMole();
        gameTimeOut = setTimeout(endGame, gameDuration);
    }

    const randomTime = function (min, max) {
        return Math.floor(Math.random() * (max - min) + 1) + min;
    }

    function endGame() { // 게임 끝
        gameRunning = false; // 게임 종료
        clearTimeout(gameTimeOut);
        clearTimeout(moleTimeout);
        $('.mole').remove();
        $('.super-mole').remove();

        Swal.fire({
            icon: 'info',
            title: 'Time over!',
            text: `당신의 점수는 ${score}입니다!`,
            showConfirmButton: true,
            timer: 5000
        });

        let nickname = $('#nickname').val();
        if (nickname) {
            let record = {
                name: nickname,
                score: score,
                regdate: new Date().toLocaleString()
            };
            saveRecord(record);
            printRecordList(); // 점수판 업데이트
        }
        $('#startbutton').show();
    }

    function saveRecord(record) {
        const recordArr = getRecordList();
        recordArr.push(record);
        localStorage.setItem("recordList", JSON.stringify(recordArr));        
    };

    function getRecordList() {
        let recordList = localStorage.getItem("recordList");
        if (recordList==null || recordList=="") {
            localStorage.setItem("recordList", "[]");
            return [];
        } else {
            return JSON.parse(recordList);
        }
    }


    function printRecordList() {
        const recordList = getRecordList();
        let printStr = '';
        for (let i = 0; i < recordList.length; i++) {
            printStr += `<tr>
                            <td>${recordList[i].name}</td>
                            <td>${recordList[i].score}</td>
                            <td>${recordList[i].regdate}</td>
                        </tr>`;
        }
        $('#recordList').html(printStr);
    };

    $(document).on('click', '.cell', function () { // 클릭이벤트
        const getPoint = parseInt(this.id);
        if ((getPoint === currentMolePosition) && !moleClicked && gameRunning) {
            if ($(this).find('.super-mole').length) {
                score += 50; // 슈퍼 두더지 클릭 시 50점 추가
                moleClicked = true; // 두더지 클릭함
                $('#score').text(`Score: ${score}`);
                $('.super-mole').css('background-image', 'url(super-moleshot.png)');
            } else {
                score += 10; // 일반 두더지 클릭 시 10점 추가
                moleClicked = true; // 두더지 클릭함
                $('#score').text(`Score: ${score}`);
                $('.mole').css('background-image', 'url(moleshot.png)');
            }

            setTimeout(function () {
                $('.mole').remove();
                $('.super-mole').remove();
                if (gameRunning) {
                    showMole();
                }
            }, 100);
        }
    });

    $('#startbutton').on('click', function () { // 시작 버튼 이벤트
        $('#difficulty').show(); // 난이도 선택 창 표시
        $(this).hide(); // 시작 버튼 숨기기
    });

    $('.difficulty-btn').on('click', function () { // 난이도 버튼 이벤트
        minTime = parseInt($(this).attr('spd-min'));
        maxTime = parseInt($(this).attr('spd-max'));
        $('#difficulty').hide(); // 난이도 선택 창 숨기기

        Swal.fire({
            icon: 'info',
            title: '게임이 곧 시작됩니다!',
            text: '3초 후에 게임이 시작됩니다.',
            timer: 3000,
            timerProgressBar: true,
            onBeforeOpen: () => {
                Swal.showLoading();
            },
            onClose: () => {
                startGame(); // 3초 후에 게임 시작
            }
        });
    });

    printRecordList();
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
// 1. 두더지 잡았을 시 그림 바뀌고 멈추는 현상_ 완료
// 2. 한번에 여러번 클릭시 score 중첩되는 현상_ 완료
// 3. 처음 화면에 난이도 선택하면 min, max 조절되어 난이도 올라가는 함수_완료
// 4. 이미지 밑에서 올라오고 하는 animation 기능_완료
// 5. 입력 데이터 localStorage 에 저장 (memo 확인)
// 6. 우측 위에 최고 점수 표기되게
// 7. 화면 클릭시 이미지 변경 후 0.1초뒤 삭제 or 마우스 떼면 삭제_완료
// 8. 슈퍼두더지?





// const ddgAnimate = function () {
//     const timer = setInterval(function () {
//         if (ddgTop == 100) ddgTop = 250;
//         console.log(`$(ddgTop -= 5)px`);
//         $("#dong").css("top", `${ddgtop -= 5}px`);
//     }, 100);
// }






>>>>>>> 274cb2bd6dea604e29a7d9ca4015f8291886718e
