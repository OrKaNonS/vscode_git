window.onload=function() {
    document.getElementById("btn").addEventListener(
        "click",
        function() {
            const r = document.getElementById("r").value;
            const g = document.getElementById("g").value;
            const b = document.getElementById("b").value; 
            document.body.style.backgroundColor = 
                `rgb(${r}, ${g}, ${b})`;
        }
    );
}




/*
    const r = document.getElementById("r");
    const g = document.getElementById("g");
    const b = document.getElementById("b");    
    const btn = document.getElementById("btn");
    const result = document.getElementById("result");
       
   

    btn.addEventListener("click", function(event) {
        result.innerHTML = "background-colorrgb(parseInt(r.value),parseInt(g.value),parseInt(b.value)")
    };
    
}
*/
