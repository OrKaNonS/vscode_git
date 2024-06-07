window.onload=function(){

    const num1 = document.getElementById("num1");
    const num2 = document.getElementById("num2");
    const btnplus = document.getElementById("btnplus");
    const btnmius = document.getElementById("btnmius");
    const btnmult = document.getElementById("btnmult");
    const btndevide = document.getElementById("btndevide");
    const result = document.getElementById("result");

    btnplus.addEventListener("click", function(event) {
        result.innerHTML = parseInt(num1.value) + parseInt(num2.value)
    });

    btnmius.addEventListener("click", function(event) {
        result.innerHTML = parseInt(num1.value) - parseInt(num2.value)
    });

    btnmult.addEventListener("click", function(event) {
        result.innerHTML = parseInt(num1.value) * parseInt(num2.value)
    });

    btndevide.addEventListener("click", function(event) {
        result.innerHTML = parseInt(num1.value) / parseInt(num2.value)
    });




}