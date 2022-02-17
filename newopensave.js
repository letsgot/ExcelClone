let newBtn = document.querySelector(".fa-file");
let download = document.querySelector('.fa-save');
let openIcon = document.querySelector(".fa-envelope-open");
let inputFile = document.querySelector("#file_Input");

newBtn.addEventListener('click',function(){
    // set db to empty
    sheetsDB = [];

    // set initial entries
    initialDB(); // -> initial Db
    // ui -> map accoriding to new db
    db = sheetsDB[0];
    setinitUI();
    setSheets();
    // ui se remove sheets and sheetsDB;
})

download.addEventListener('click', function () {
    let a = document.createElement("a");

    let StringDB = encodeURIComponent(JSON.stringify(sheetsDB));

    let encodedData = "data:text/json;charset=utf-8," + StringDB;
    a.href = encodedData;
    a.download = "file.json";
    a.click();
})

openIcon.addEventListener("click", function () {
    inputFile.click();
})

inputFile.addEventListener("change", function (event) {
    filecontent = "";
    let file = inputFile.files[0];
    let reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.addEventListener('load', function (e) {
        filecontent = e.target.result;
        sheetsDB = JSON.parse(filecontent);
        db = sheetsDB[0];
        noOfSheet.children = [];
        setSheets();
        setinitUI();
    });
})

function setSheets() {
    // console.log(sheetsDb.length)
    noOfSheet.innerHTML="";
    for (let i = 0; i < sheetsDB.length; i++) {
        sheetOpenHandler();
    }
}

function setinitUI() {
    for (let i = 0; i < 100; i++) {

        for (let j = 0; j < 26; j++) {
            //    set all the properties on ui with matchiing rid,cid
            let cellObject = db[i][j];
            let tobeChangedCell = document.querySelector(`.grid .cell[rId='${i+1}'][cId='${j+1}']`);
            // console.log(cellObject.value);
            // console.log(tobeChangedCell)
            tobeChangedCell.innerText = cellObject.value;
            tobeChangedCell.style.color = cellObject.color;
            tobeChangedCell.style.backgroundColor = cellObject.backgroundColor;
            tobeChangedCell.style.fontFamily = cellObject.fontFamily;
            tobeChangedCell.style.textAlign = cellObject.textAlign;
            tobeChangedCell.style.textDecoration = cellObject.underline == "none" ? "none" : "underline";
            tobeChangedCell.style.fontStyle = cellObject.italic == "none" ? "normal" : "italic";
            tobeChangedCell.style.fontWeight = cellObject.bold == "none" ? "none" : "bold";
            tobeChangedCell.style.fontSize = cellObject.fontSize;
        }
    }
}

