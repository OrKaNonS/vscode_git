// event 객체의 프라퍼티

document.querySelector("#btn").addEventListener("click", function(e) {
    console.log("이벤트타겟 : " + e.target);
    console.log("이벤트currentTarget : " + e.currentTarget);
    console.log("이벤트phase : " + e.eventPhase);
    console.log("이벤트타입 : " + e.type);
});


document.querySelector("#btn").addEventListener("mouseover", function(e) {
    console.log("이벤트타겟 : " + e.target);
    console.log("이벤트currentTarget : " + e.currentTarget);
    console.log("이벤트phase : " + e.eventPhase);
    console.log("이벤트타입 : " + e.type);
});

// 디폴트이벤트 방지
document.querySelector("a").addEventListener("click", function(e) {
    e.preventDefault(); // google로의 이동을 막음.
});

// 폼내의 input 엘리먼트에 입력된 값에 따라 submit을 수행
document.querySelector("form").addEventListener("submit", function(e) {
    e.preventDefault(); // form의 submit을 막음_event1.html로의 이동을 막음.
    const txtValue = document.querySelector("#txt").value;
    if (txtValue && txtValue.length>5) {
        this.submit();
    } else {
        alert("값을 5글자 이상 입력해 주세요!");
        return false;
    }
});