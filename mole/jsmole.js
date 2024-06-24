$(document).ready(function () {
    let score = 0; 
    let currentMolePosition = -1;
    let gameTimeOut;
    let moleTimeout;
    let moleClicked = false; 
    let gameRunning = false; 
    let minTime = 1000; 
    let maxTime = 2000; 
    const gameDuration = 10000; 

    // 두더지 출현 함수
    function showMole() { 
        if (!gameRunning) return; 

        clearTimeout(moleTimeout); 
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

        // 출현 빈도(시간) 조정
        const ddgMoveTime = randomTime(minTime, maxTime);

        // 두더지 클릭 안했을 시
        moleTimeout = setTimeout(function () {
            if (!moleClicked && gameRunning) { 
                $('.mole').remove();
                $('.super-mole').remove();
                showMole(); 
            }
        }, ddgMoveTime);
    }

    // 게임 시작 함수
    function startGame() { 
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
        gameRunning = true; 
        showMole();
        gameTimeOut = setTimeout(endGame, gameDuration);
    }

    // 최대 최소 값 랜덤 주기
    const randomTime = function (min, max) {
        return Math.floor(Math.random() * (max - min) + 1) + min;
    }

    // 게임 끝났을 시
    function endGame() { 
        gameRunning = false; 
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

        // localStorage에 저장을 위해 
        let nickname = $('#nickname').val();
        if (nickname) {
            let record = {
                name: nickname,
                score: score,
                regdate: new Date().toLocaleString()
            };
            saveRecord(record);
            printRecordList();  // 점수판 갱신
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

    // 클릭했을 떄 메소드
    $(document).on('click', '.cell', function () { 
        const getPoint = parseInt(this.id);
        if ((getPoint === currentMolePosition) && !moleClicked && gameRunning) {
            if ($(this).find('.super-mole').length) {
                score += 50; 
                moleClicked = true; 
                $('#score').text(`Score: ${score}`);
                $('.super-mole').css('background-image', 'url(super-moleshot.png)');
            } else {
                score += 10; 
                moleClicked = true; 
                $('#score').text(`Score: ${score}`);
                $('.mole').css('background-image', 'url(moleshot.png)');
            }

            // 시간 다 되었을 떄
            setTimeout(function () {
                $('.mole').remove();
                $('.super-mole').remove();
                if (gameRunning) {
                    showMole();
                }
            }, 100);
        }
    });

    // 시작버튼
    $('#startbutton').on('click', function () { 
        $('#difficulty').show(); 
        $(this).hide(); 
    });

    // 난이도 버튼
    $('.difficulty-btn').on('click', function () { 
        minTime = parseInt($(this).attr('spd-min'));
        maxTime = parseInt($(this).attr('spd-max'));
        $('#difficulty').hide(); 

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
                startGame(); 
            }
        });
    });

    printRecordList(); // 점수판 갱신
});