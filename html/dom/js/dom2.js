function clickbtn() {
    alert("눌럿으!");
}

function changebgcolor() {
    document.body.style.backgroundColor = 'pink';
}


function changeText() {
    let txt = document.getElementById("txt");
    let result = document.getElementById("result");
    result.innerHTML = txt.value;


}