// JavaScript clock
// 2024년  6월 27일 오후 2:27:10
$(function() {

    setInterval(getTime, 1);

});

const getTime = () => {
    const now = new Date();

    let yoil = '';
    switch (now.getDay()) {
        case 0: yoil = '일요일'; break;
        case 1: yoil = '월요일'; break;
        case 2: yoil = '화요일'; break;
        case 3: yoil = '수요일'; break;
        case 4: yoil = '목요일'; break;
        case 5: yoil = '금요일'; break;
        case 6: yoil = '토요일'; 
    }

    let timeStr = `${now.getFullYear()}년 ${now.getMonth()+1}월 ${now.getDate()}일 ${now.getHours() > 12 ? '오후' : '오전'} \
    ${yoil} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}:${now.getMilliseconds()}`;
    $('h1').html(timeStr);

}


