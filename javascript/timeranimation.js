let box = $("#box");

// 처음 x, y 좌표
let startx;
let starty;

// 끝 x,y좌표
let endx;
let endy;

//변동값
let currentx;
let currenty;

//움직이는 속도
let stepx = 10;
let stepy = 10;

//intetVal
let Intervalx;
let Intervaly;

$(function(){
    // 이미지 선언
    const img = $("#dog");

    // 최초 위치
    startx = img.position().left;
    starty = img.position().top;

    // 가장자리
    endx = box.innerWidth()- img.outerWidth();
    endy = box.innerHeight()- img.outerHeight();

    // 현재위치
    currentx = startx;
    currenty = starty;

    // 버튼 이벤트
    $("#moveToRight").bind("click", mtr);
    $("#pause").bind("click", pause);
    $("#moveToLeft").bind("click", mtl);
    $("#moveToUp").bind("click", mtu);
    $("#moveToDown").bind("click", mtd);



    function mtr() {
        Intervalx = setInterval( xMoving, 10);
        clearInterval(Intervaly);
    }

    function mtl() {
        Intervalx = setInterval( dxMoving, 10);
        clearInterval(Intervaly);
    }

    function pause() {
        clearInterval(Intervalx);
        clearInterval(Intervaly);
    }

    function mtu() {
        Intervaly = setInterval( dyMoving, 10);
        clearInterval(Intervalx);
    }

    function mtd() {
        Intervaly = setInterval( yMoving, 10);
        clearInterval(Intervalx);
    }

    function xMoving() {
        currentx = currentx + stepx;
        img.css("left", currentx);
        }
    

    function dxMoving() {
        currentx = currentx - stepx;
        img.css("left", currentx);
        }
    

    function yMoving() {
        currenty = currenty + stepy;
        img.css("top", currenty);
        }
    

    function dyMoving() {
        currenty = currenty - stepy;
        img.css("top", currenty);
    }
});



