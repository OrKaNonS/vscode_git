window.onload=function() {


    document.getElementById("btnrec").addEventListener(
        "click",
        function() {
            const x = document.getElementById("x").value;
            const y = document.getElementById("y").value;
            const wide = document.getElementById("wide").value; 
            const height = document.getElementById("height").value; 
            
            const canvas = document.getElementById("Canvas");
            const ctx = canvas.getContext("2d");

            ctx.fillStyle = "blue";
            ctx.fillRect(x, y, wide, height);
        }
    )

    document.getElementById("btncir").addEventListener(
        "click",
        function() {
            const x = document.getElementById("x").value;
            const y = document.getElementById("y").value;
            const r = document.getElementById("r").value;
            const canvas = document.getElementById("Canvas");
            const ctx = canvas.getContext("2d");

            //ctx.beginPath();
            ctx.arc(x,y,r,0,2*Math.PI);
            ctx.stroke();
        }
    )



}