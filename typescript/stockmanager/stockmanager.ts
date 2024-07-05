const {JSDOM} = require('jsdom');
const windowObj = new JSDOM();
const documentObj = new JSDOM('').window;
global.document = documentObj.document;

const $$ = require('jquery')(windowObj.window);

let currentShno = null;

$$(() => {
    

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
        printStockList(currentShno);
    });

    // 초기 shopList 출력
    printShopList();

    // 매장 삭제 버튼 이벤트 _ 이벤트 위임???
    $$('#shoplist').on('click', '.deleteShopBtn', (e) => {
        const remove = $(e.target).data('index');
        (result) => {
            if (result.isConfirmed) {
                deleteShop(remove); 
            }
        }
    });
});

    // 매장 수정 버튼 이벤트 _ 이벤트 위임???
    $$('#shoplist').on('click', '.editShopBtn', (e) => {
        const index = $(e.target).data('index');  

        (result) => {
            if (result.isConfirmed && result.value.trim() !== '') {
                editShop(index, result.value.trim());
            }
        }
    });


    // 제품 삭제 버튼 이벤트 _ 이벤트 위임???
    $$('#stocklist').on('click', '.deleteStockBtn', (e) => {
        const remove = $(e.target).data('index');
        (result) => {
            if (result.isConfirmed) {
                deleteStock(remove);
            }
        }
    });


    // 제품 수정 버튼 이벤트 _ 이벤트 위임???
$$('#stocklist').on('click', '.editStockBtn', (e) => {
    const index = $(e.target).data('index');
    (result) => {
        if (result.isConfirmed) {
            editStock(index, result.value.newStName, result.value.newStAmt, result.value.newStindate);
        }
    }
});


    // 매장 클릭 이벤트
    $$('#shoplist').on('click', 'tr', (event) => {
        const thisRow = $(event.currentTarget).closest('tr');
        currentShno = thisRow.data('shno');
        const showShopName = thisRow.find('td:nth-child(2)').text();
        $('#stshopname').val(showShopName);
        console.log(currentShno);
        printStockList(currentShno);
    });
    


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
    const shopList = localStorage.getItem('shopList');
    if(!shopList) {
        throw new Error ('No saved shopList')
    }
    return JSON.parse(shopList);
};

// stockList 가져오는 함수
const getStockList = () => {
    const stockList = localStorage.getItem('stockList');
    if(!stockList) {
        throw new Error ('No saved stockList')
    } else {
    return JSON.parse(stockList);
    }
};

//매장등록
const addShop = () => {
    const shname = ($('#shname').val() as string) || ''; // as string 사용
    const shno = Number($('#shno').val() as number) || 0; //  Number로 변환
    if (!shname.trim() || shno <= 0) {
        alert('유효하지 않은 매장 정보입니다.');
        return;
    }
    const shopList = getShopList();
    const newShop = new Shop(shno, shname, 0);
    shopList.push(newShop);
    localStorage.setItem('shopList', JSON.stringify(shopList));
};

// 제품등록
const addStock = () => {
    if (currentShno === null) {
        alert('매장을 선택해주세요');
        return;
    }
    const stname = ($('#stname').val() as string) || '';
    const stamt = Number($('#stamt').val()) || 0; // Number로 변환하여 숫자로 처리
    const stindat = ($('#stindat').val() as string) || '';

    if (!stname.trim() || stamt < 0 || !stindat.trim()) {
        alert('유효하지 않은 제품 정보입니다.');
        return;
    }
    const stockList = getStockList();
    const newStock = new Stock(0, stname, stamt, new Date(stindat), new Date(), currentShno);
    stockList.push(newStock);

    localStorage.setItem('stockList', JSON.stringify(stockList));
    printStockList(currentShno);
};


// 매장번호 시퀀스
const getNextShopSeq = () => {
    const nextShopSeq = Number(localStorage.getItem('shopSeq')) + 1;
    localStorage.setItem('shopSeq', nextShopSeq.toString());
    return nextShopSeq;
};

// 제품번호 시퀀스
const getNextStockSeq = () => {
    const stockList = getStockList();
    const nextStockSeq = stockList.length ? Math.max(...stockList.map(stock => stock.stno)) + 1 : 1;
    localStorage.setItem('stockSeq', nextStockSeq.toString());
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
        <td>${i+1}</td>
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

    let stockArr = getStockList();
    const filterStockArr = stockArr.filter(stock => stock.shno === currentShno); // 선택한 매장 filter
    filterStockArr.splice(0);
    // filter된 제품의 번호 재선정_어뚱하게 삭제되어 번호 재선정 후 해당 배열 + 선택된 매장 외의 shno를 합하여 새로운 배열에 넣는다.
    // for (let i = 0; i < filterStockArr.length; i++) {
    //     filterStockArr[i].stno = i + 1;
    // }
    const updatedStockArr = stockArr.filter(stock => stock.shno !== currentShno).concat(filterStockArr);
    localStorage.setItem('stockList', JSON.stringify(updatedStockArr));
    printStockList(currentShno);
    shopTotalStock();
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
        <td>${i+1}</td>
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

// stockList 삭제
const deleteStock = (index) => {
    let stockArr = getStockList();
    const filterStockArr = stockArr.filter(stock => stock.shno === currentShno); // 선택한 매장 filter
    filterStockArr.splice(index, 1);
    // filter된 제품의 번호 재선정_어뚱하게 삭제되어 번호 재선정 후 해당 배열 + 선택된 매장 외의 shno를 합하여 새로운 배열에 넣는다.

    // for (let i = 0; i < filterStockArr.length; i++) {
    //     filterStockArr[i].stno = i + 1;
    // }


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





