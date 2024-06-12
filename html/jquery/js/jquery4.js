$(function() {

    let fileNum = 2;

    $("#fileplus").click(function() {
        //<p><input id = file1 type="file" /></p>
        const newP = document.createElement("P"); // <p></p> 만듬
        const newInput = document.createElement("INPUT"); //<input
        newInput.setAttribute("id", "file" + fileNum++); // id = file1
        newInput.setAttribute("type", "file"); // type="file"
        newP.appendChild(newInput);
        document.getElementById("filelist").appendChild(newP);
    });

    $("#fileminus").click(function() {
        const filelist = document.getElementById("filelist");
        if (fileNum!=1) {
            filelist.removeChild(filelist.lastChild);
            fileNum--
        }
    });




    //     $("#fileminus").click(function() {
    //     const newP = document.createElement("P");
    //     const Output = document.createElement("OUTPUT");
    //     Output.setAttribute("id", "file" + fileNum--);
    //     Output.setAttribute("type", "file");
    //     newP.removeChild(Output);        
    //     document.getElementById("filelist").removeChild(newP);
    // });




});
