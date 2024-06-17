/*
    ### jQuery 메모장 구현
    1. 제목과 내용을 입력하고 등록 버튼을 누르면
       localStorage에 메모객체를 저장한다.
    2. 좌측에는 메모의 리스트를 최신순으로 리스팅하고
       각 메모에는 삭제버튼이 우측에 존재한다.
    3. 삭제버튼을 클릭하면 해당 메모가 삭제되고 리스트가 갱신된다.
    4. 메모리스트의 가장 최근 메모가 우측에 표시된다.
*/

/* 
1. 처음 시작시 등장화면                             - printMemoList
 - 메모리스트가 없으면 등장화면         
 - 메모리스트가 있으면 메모리스트 출력

2. 등록 버튼 누르면 메모 객체 생성해서 addMemo 호출
 - localStorage를 불러와서 메모객체 추가            - addMemo(getMemoList)
 - 메모리스트 갱신                                 - printMemoList

3. li 클릭시 content 보여주기
 - localStorage에서 메모리스트 가져온 후 출력       - printMemoList(getMemoList)
 - 메모리스트 클릭 시 우측에 content 보여주기       - showMemoContent(click)

4. 메모리스트 삭제 버튼 
 - 삭제버튼 클릭시 해당 메모리스트에서 삭제         - splice
 - 메모리스트에서 삭제 후 localStorage에 저장      - setItem
 - 메모리스트 갱신                                - printMemoList
*/



$(function() {

    printMemoList();

    // 제목과 내용을 입력하고 등록 버튼 누르면
    // 메모 객체 생성해서 addMemo 호출
    $("#writeBtn").click(function() {
        const memoObj = {
            title: $("#title").val(),
            content: $("#content").val(),
            regdate: new Date().toLocaleString()
        };
        addMemo(memoObj);
    });

/* 아래 코드는 추가되때마다 웹페이지 새로고침해줘야 읽어올 수 있음.
    // li 클릭시 content 보여주는 함수(showMemoContent)를 호출하는 함수
    $("#listL ul li").click(function() {
        const index = $(this).attr("id").substr(4);
        showMemoContent(index);
    });
*/

});
    

// localStorage에 메모객체를 저장한다.
function addMemo(memoObj) {
    const memoListArr = getMemoList();
    memoListArr[memoListArr.length] = memoObj;
    localStorage.setItem("memoList", JSON.stringify(memoListArr));
    printMemoList();
}

// localStorage의 메모리스트를 가져오는 함수
function getMemoList() {
    let memoList = localStorage.getItem("memoList");
    if (memoList==null || memoList=="") {
        localStorage.setItem("memoList", "[]");
        return [];
    } else {
        return JSON.parse(memoList);
    }
}

// 메모 내용을 표시하는 함수
function showMemoContent(index) {
    const memoListArr = getMemoList();
    const memo = memoListArr[index];
    $("#listR textarea").val(`등록날짜: ${memo.regdate}\n제목: ${memo.title}\n내용: ${memo.content}`);

}

// 메모리스트를 출력하는 함수
function printMemoList() {
    $("#listL ul").empty();
    const memoList = getMemoList();
    const memoListLeng = memoList.length;
    for (let i=0; i<memoListLeng; i++) {
        $("#listL ul").append(
            "<li id='memo" + i + "'>" +
                "<div class='memo-details'>" +
                    "<div class='memo-title'>" + memoList[i].title + "</div>" +
                    "<div class='memo-date'>" + memoList[i].regdate + "</div>" +
                "</div>" +
                "<input id='removeBtn" + i + "' class='removeBtn' type='button' value='삭제'/>" +
            "</li>"
        );
    }


// 삭제 버튼 이벤트
    memoList.forEach(function(memo, index) {
    $("#removeBtn" + index).click(function() {
    removeMemo(index);
    });
    
// 메모 클릭시 내용 보여주기
    $("#memo" + index).click(function() {
        showMemoContent(index);
        });
    });
}


// localStorage의 메모리스트에서 메모를 삭제하는 함수
function removeMemo(index) {
    const memoListArr = getMemoList();
    memoListArr.splice(index, 1);       // 배열에서 index(선택한 삭제버튼의 인데스)  1은 제거할 요소의 수
    localStorage.setItem("memoList", JSON.stringify(memoListArr));
    printMemoList();
}