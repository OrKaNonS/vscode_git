/* 
1. 처음 시작시 등장화면                             - shopList
 - shopList 없으면 등장화면         
 - shopList 있으면 shopList 출력

2. 등록 버튼 누르면 메모 객체 생성해서 addShop 호출
 - localStorage를 불러와서 메모객체 추가            - addShop(getShopList)
 - shopList 갱신                                  - printShopList

3. li 클릭시 content 보여주기
 - localStorage에서 메모리스트 가져온 후 출력       - printShopList(getShopList)
 - shopList 클릭 시 우측에 detail 보여주기         - showShopDetail(click)

4. shopList 삭제 버튼 
 - 삭제버튼 클릭시 해당 shopList에서 삭제          - splice
 - shopList에서 삭제 후 localStorage에 저장       - setItem
 - shopList 갱신                                 - printMemoList
*/

// 구현사항
// 1) 모든데이터는 클래스와 객체로 관리
// 2) 모든 함수는 화살표함수 사용
// 3) 모든 파라미터는 rest파라미터를 사용
// 4) 데이터는 JSON형태로 localStorage에 저장
// 5) 화면 임의 구성


$(() => {

    // localstorage 초기화
    initLocalStorage();


    $("#shwriteBtn").on('click', () => {
        addShop();

    });
})




const initLocalStorage = () => {
    if (localStorage) {
        if(!localStorage.getItem('shopSeq')){
            localStorage.setItem('shopSeq', '0');
        }
        if(!localStorage.getItem('stockSeq')){
            localStorage.setItem('stockSeq', '0');
        }
        if(!localStorage.getItem('shopList')){
            localStorage.setItem('shopList', '[]');
        }
        if(!localStorage.getItem('stockList')){
            localStorage.setItem('stockList', '[]');
        }
    }
};

    //매장 등록버튼 클릭 시
    const addShop = () => {
        const shopArr = JSON.parse(localStorage.getItem('shopList'))
        shopArr.push(new Shop(getNextShopSeq(), $('#shname').val(), 0));
        localStorage.setItem('shopList', JSON.parse(shopArr));
    };

    // 매장번호 시퀀스
    const getNextShopSeq = () => {
        const nextShopSeq = Number(localStorage.getItem('shopSeq')) + 1;
        localStorage.setItem('shopSeq', nextShopSeq);
        return Number(nextShopSeq);
    }

    





