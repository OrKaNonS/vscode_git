let timer = null;
let dogTop = 265;   // 처음 이미지 top 값
let dogLeft = 265;  // 처음 이미지 left 값
let dogSpeed = 1;   // 처음 스피즈 1 => 1px/0.005초 이동

$(function () {

    $("#accel").val("속도:" + dogSpeed);

    $("#moveToTop").on("click", function () {
        pause();
        timer = setInterval(moveToTop, 5);
    });

    $("#moveToBottom").on("click", function () {
        pause();
        timer = setInterval(moveToBottom, 5);
    });

    $("#pause").on("click", function () {
        pause();
    });

    $("#moveToLeft").on("click", function () {
        pause();
        timer = setInterval(moveToLeft, 5);
    });

    $("#moveToRight").on("click", function () {
        pause();
        timer = setInterval(moveToRight, 5);
    });

    $("body").on("keydown", function (event) {
        if (event.keyCode == 37) moveToLeft();
        if (event.keyCode == 38) moveToTop();
        if (event.keyCode == 39) moveToRight();
        if (event.keyCode == 40) moveToBottom();
        if (event.keyCode == 37 && event.keyCode == 38) {
            moveToLeft();
            moveToTop();
        }
        if (event.keyCode == 37 && event.keyCode == 40) {
            moveToLeft();
            moveToBottom();
        }
        if (event.keyCode == 39 && event.keyCode == 38) {
            moveToRight();
            moveToTop();
        }
        if (event.keyCode == 39 && event.keyCode == 40) {
            moveToRight();
            moveToBottom();
        }
    });

    $("#accel").on("click", function () {
        dogSpeed++;
        $("#accel").val("속도:" + dogSpeed);
    });

});

const moveToTop = function () {
    if (dogTop >= 10) {
        console.log("dogTop:" + dogTop);
        dogTop -= dogSpeed;
        $("#dog").css("top", dogTop + "px");
    }
};

const moveToBottom = function () {
    if (dogTop <= 540) {
        console.log("dogTop:" + dogTop);
        dogTop += dogSpeed;
        $("#dog").css("top", dogTop + "px");
    }
};

const pause = function () {
    clearInterval(timer);
};

const moveToLeft = function () {
    if (dogLeft >= 10) {
        console.log("dogLeft:" + dogLeft);
        dogLeft -= dogSpeed;
        $("#dog").css("left", dogLeft + "px");
    }
};

const moveToRight = function () {
    if (dogLeft <= 540) {
        console.log("dogLeft:" + dogLeft);
        dogLeft += dogSpeed;
        $("#dog").css("left", dogLeft + "px");
    }
};