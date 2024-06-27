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

let currentShno = null;

$(() => {
    

    // localstorage 초기화
    initLocalStorage();

    // 매장 등록 이벤트핸들러
    $('#shwriteBtn').on('click', () => {
        addShop();
        printShopList();
    });

    // 제품 등록 이벤트핸들러
    $('#stwriteBtn').on('click', () => {
        addStock();
        printStockList();
    });

    // 초기 shopList 출력
    printShopList();

    // 매장 삭제 버튼 이벤트 _ 이벤트 위임???
    $('#shoplist').on('click', '.deleteShopBtn', (e) => {
        const remove = $(e.target).data('index');
        deleteShop(remove);
    });

    // 매장 수정 버튼 이벤트 _ 이벤트 위임???
    $('#shoplist').on('click', '.editShopBtn', (e) => {
        const index = $(e.target).data('index');
        const newName = prompt("새 매장명을 입력하세요","");
        editShop(index, newName);
    });


    // 제품 삭제 버튼 이벤트 _ 이벤트 위임???
    $('#stocklist').on('click', '.deleteStockBtn', (e) => {
        const remove = $(e.target).data('index');
        deleteStock(remove);
    });

    // 제품 수정 버튼 이벤트 _ 이벤트 위임???
    $('#stocklist').on('click', '.editStockBtn', (e) => {
        const index = $(e.target).data('index');
        const newStName = prompt("새 제품명을 입력하세요","");
        const newStAmt = prompt("변경된 수량을 입력하세요","");
        const newStindate = prompt("변경된 입고일자를 입력하세요","");

        editStock(index, newStName, newStAmt, newStindate );
    });

    // 매장 클릭 이벤트
        $('#shoplist').on('click', 'tr', (event) => {
            const thisRow = $(event.currentTarget).closest('tr');
            const currentShno = thisRow.data('shno');
            console.log(currentShno);
            printStockList(currentShno);
        });
    
})

// localstorage 초기화
const initLocalStorage = () => {
    if (localStorage) {
        if (!localStorage.getItem('shopSeq')) {
            localStorage.setItem('shopSeq', '0');
        }
        if (!localStorage.getItem('stockSeq')) {
            localStorage.setItem('stockSeq', '0');
        }                
        if (!localStorage.getItem('shopList')) {
            localStorage.setItem('shopList', '[]');
        }
        if (!localStorage.getItem('stockList')) {
            localStorage.setItem('stockList', '[]');
        }        
    }
};

// shopList 가져오는 함수
const getShopList = () => {
    const shopList = JSON.parse(localStorage.getItem('shopList')) || [];
    return shopList;
};

// stockList 가져오는 함수
const getStockList = () => {
    const stockList = JSON.parse(localStorage.getItem('stockList')) || [];
    return stockList;
};

//매장등록
const addShop = () => {
    const shopArr = getShopList() || [];
    shopArr.push(new Shop(getNextShopSeq(), $('#shname').val(), 0));
    localStorage.setItem('shopList', JSON.stringify(shopArr));
};

// 제품등록
const addStock = (currentShno) => {
    if(currentShno === null) {
        alert('매장을 선택해주세요');
        return;
    } else {
    const stockArr = getStockList() || [];
    stockArr.push(new Stock(getNextStockSeq(), $('#stname').val(), $('#stamt').val(), $('#stindate').val(), new Date().toLocaleString(), $('#stock.shno')));
    localStorage.setItem('stockList', JSON.stringify(stockArr));
    }
}

// 매장번호 시퀀스
const getNextShopSeq = () => {
    const nextShopSeq = Number(localStorage.getItem('shopSeq')) + 1;
    localStorage.setItem('shopSeq', nextShopSeq);
    return nextShopSeq;
};

// 제품번호 시퀀스
const getNextStockSeq = () => {
    const nextStockSeq = Number(localStorage.getItem('stockSeq')) + 1;
    localStorage.setItem('stockSeq', nextStockSeq);
    return nextStockSeq;
};

// 매장리스트 출력
const printShopList = () => {
    $('#shoplist tbody').empty();
    const shopList = getShopList() || [] ;
    const shopListLeng = shopList.length;
    for(let i=0 ; i < shopListLeng; i++) {
        const shop = shopList[i];
        const tr = `<tr data-shno="${shop.shno}">
        <td>${shop.shno}</td>
        <td>${shop.shname}</td>
        <td>${shop.shtotst}</td>
        <td>
            <input type='button' value='수정' class='editShopBtn' data-index='${i}' />
        </td>
        <td>
            <input type='button' value='삭제' class='deleteShopBtn' data-index='${i}' />
        </td>
    </tr>`;
    $('#shoplist tbody').append(tr) 
    }
}


// shopList 삭제
const deleteShop = (index) => {
    let shopArr = getShopList();
    shopArr.splice(index, 1);
    localStorage.setItem('shopList', JSON.stringify(shopArr));
    printShopList();
};

// shopList 수정
const editShop = (index, newName) => {
    const shopArr = getShopList();
    if (newName !== null && newName.trim() !== "") { // 이름이 없거나 공백만 있을 경우
        shopArr[index].shname = newName;
    }
    localStorage.setItem('shopList', JSON.stringify(shopArr));
    printShopList();
};

// 제품리스트 출력
const printStockList = (currentShno) => {
    $('#stocklist tbody').empty();
    const stockList = getStockList() || [] ;
    const filterStockList = stockList.filter(stock => stock.shno === currentShno);
    const stockListLeng = filterStockList.length;
    for(let i=0 ; i < stockListLeng; i++) {
        const stock = filterStockList[i];
        const tr = `<tr>
        <td>${stock.stno}</td>
        <td>${stock.stname}</td>
        <td>${stock.stamt}</td>
        <td>${stock.stindate}</td>
        <td>${new Date().toLocaleString()}</td>
        <td>
            <input type='button' value='수정' class='editStockBtn' data-index='${i}' />
        </td>
        <td>
            <input type='button' value='삭제' class='deleteStockBtn' data-index='${i}' />
        </td>
    </tr>`;
    $('#stocklist tbody').append(tr) 
    }
}

// shopList 삭제
const deleteStock = (index) => {
    let stockArr = getStockList();
    stockArr.splice(index, 1);
    localStorage.setItem('stockList', JSON.stringify(stockArr));
    printStockList();
};

// stockList 수정
const editStock = (index, newStName, newStAmt, newStindate) => {
    const stockArr = getStockList();
    if (newStName !== null && newStName.trim() !== "") { // 이름이 없거나 공백만 있을 경우
        stockArr[index].stname = newStName;
    }
    if (newStAmt !== null && newStAmt.trim() !== "") { // 이름이 없거나 공백만 있을 경우
        stockArr[index].stamt = newStAmt;
    }
    if (newStindate !== null && newStindate.trim() !== "") { // 이름이 없거나 공백만 있을 경우
        stockArr[index].stindate = newStindate;
    }
    localStorage.setItem('stockList', JSON.stringify(stockArr));
    printStockList();
};





