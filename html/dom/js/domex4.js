window.onload=function() {


    document.getElementById("btnrec").addEventListener(
        "click",
        function() {
            const svg = document.getElementById("rectsvg").value;
            const rect = document.getElementById("rect").value;
            rect.setAttribute("x", document.getElementById("x").value);
            rect.setAttribute("y", document.getElementById("y").value);
            rect.setAttribute("wide", document.getElementById("wide").value);
            rect.setAttribute("height", document.getElementById("height").value);
            rect.setAttribute("stroke", "red");
            rect.setAttribute("stroke-width", "6");
            rect.setAttribute("fill", "yellow");
            svg.appendChild(rect);
            document.getElementById("wrapper").appendChild(svg);           
        }
    )

    document.getElementById("btncir").addEventListener(
        "click",
        function() {
            const svg = document.getElementById("cirsvg").value;
            const circle = document.getElementById("circle").value;
            circle.setAttribute("x", document.getElementById("x").value);
            circle.setAttribute("y", document.getElementById("y").value);
            circle.setAttribute("r", document.getElementById("r").value);
            circle.setAttribute("stroke", "red");
            circle.setAttribute("stroke-width", "6");
            circle.setAttribute("fill", "yellow");
            svg.appendChild(circle);
            document.getElementById("wrapper").appendChild(svg);           
        }
    )
}