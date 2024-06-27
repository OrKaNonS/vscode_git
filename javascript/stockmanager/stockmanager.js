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
        currentShno = thisRow.data('shno');
        const showShopName = thisRow.find('td:nth-child(2)').text();
        $('#stshopname').val(showShopName);
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
const addStock = () => {
    if (currentShno === null) {
        alert('매장을 선택해주세요');
        return;
    }
    const stockArr = getStockList() || [];
    stockArr.push(new Stock(getNextStockSeq(), $('#stname').val(), $('#stamt').val(), $('#stindate').val(), new Date().toLocaleString(), currentShno));
    localStorage.setItem('stockList', JSON.stringify(stockArr));
    printStockList(currentShno);
    shopTotalStock();
};


// 매장번호 시퀀스
const getNextShopSeq = () => {
    const nextShopSeq = Number(localStorage.getItem('shopSeq')) + 1;
    localStorage.setItem('shopSeq', nextShopSeq);
    return nextShopSeq;
};

// 제품번호 시퀀스
const getNextStockSeq = () => {
    const stockList = getStockList();
    const nextStockSeq = stockList.length ? Math.max(...stockList.map(stock => stock.stno)) + 1 : 1;
    localStorage.setItem('stockSeq', nextStockSeq);
    return nextStockSeq;
};

// 매장리스트 출력
const printShopList = () => {
    $('#shoplist tbody').empty();
    const shopList = getShopList() || [] ;
    const stockList = getStockList() || [];
    const shopListLeng = shopList.length;
    for(let i=0 ; i < shopListLeng; i++) {
        const shop = shopList[i];
        const totalStock = stockList.filter(stock => stock.shno === shop.shno) // 선택한 매장 shno filter
                            .reduce((sum, stock) => sum + Number(stock.stamt), 0);  // sum : 총값, stock : 현재값 , Number(stock.stamt) 스택 수량을 숫자로 변경, 0은 초기값
        const tr = `<tr data-shno="${shop.shno}">
        <td>${shop.shno}</td>
        <td>${shop.shname}</td>
        <td>${totalStock}</td>
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
    const stockList = getStockList() || [];
    const filterStockList = stockList.filter(stock => stock.shno === currentShno);
    const stockListLeng = filterStockList.length;
    for (let i = 0; i < stockListLeng; i++) {
        const stock = filterStockList[i];
        const tr = `<tr>
        <td>${stock.stno}</td>
        <td>${stock.stname}</td>
        <td>${stock.stamt}</td>
        <td>${stock.stindate}</td>
        <td>${stock.strgdate}</td>
        <td>
            <input type='button' value='수정' class='editStockBtn' data-index='${i}' />
        </td>
        <td>
            <input type='button' value='삭제' class='deleteStockBtn' data-index='${i}' />
        </td>
    </tr>`;
    $('#stocklist tbody').append(tr) 
    }
};

// shopList 삭제
const deleteStock = (index) => {
    let stockArr = getStockList();
    const filterStockArr = stockArr.filter(stock => stock.shno === currentShno); // 선택한 매장 filter
    filterStockArr.splice(index, 1);
    // filter된 제품의 번호 재선정_어뚱하게 삭제되어 번호 재선정 후 해당 배열 + 선택된 매장 외의 shno를 합하여 새로운 배열에 넣는다.
    for (let i = 0; i < filterStockArr.length; i++) {
        filterStockArr[i].stno = i + 1;
    }
    const updatedStockArr = stockArr.filter(stock => stock.shno !== currentShno).concat(filterStockArr);
    localStorage.setItem('stockList', JSON.stringify(updatedStockArr));
    printStockList(currentShno);
    shopTotalStock();
};

// stockList 수정
const editStock = (index, newStName, newStAmt, newStindate) => {
    const stockArr = getStockList();
    const filterStockArr = stockArr.filter(stock => stock.shno === currentShno);

    if (newStName && newStName.trim()) {
        filterStockArr[index].stname = newStName;
    }

    if (newStAmt && newStAmt.trim()) {
        filterStockArr[index].stamt = newStAmt;
    }
    
    if (newStindate && newStindate.trim()) {
        filterStockArr[index].stindate = newStindate;
    }

    for (let i = 0; i < filterStockArr.length; i++) {
        filterStockArr[i].stno = i + 1;
    }

    const updatedStockArr = stockArr.filter(stock => stock.shno !== currentShno).concat(filterStockArr);
    localStorage.setItem('stockList', JSON.stringify(updatedStockArr));
    printStockList(currentShno);
    shopTotalStock();
};

// 매장 재고 총 수량
const shopTotalStock = () => {
    const shopList = getShopList();
    const stockList = getStockList();
    for (let i = 0; i < shopList.length; i++) {
        const shop = shopList[i];
        const totalStock = stockList.filter(stock => stock.shno === shop.shno) // 선택한 매장 shno filter
                            .reduce((sum, stock) => sum + Number(stock.stamt), 0);  // sum : 총값, stock : 현재값 , Number(stock.stamt) 스택 수량을 숫자로 변경, 0은 초기값
        shop.shtotst = totalStock;
    }
    localStorage.setItem('shopList', JSON.stringify(shopList));
    printShopList();
}





