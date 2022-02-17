let topRow = document.querySelector(".top_row");
let leftCol = document.querySelector(".left_col");
let grid = document.querySelector(".grid");
let template = document.querySelector("template");

let formulaInput = document.querySelector('.formula_execute_bar');

//  *************** menu.js ka ********************

// let formulaInput = document.querySelector('.formula_execute_bar');

let fontFamilyInput = document.querySelector(".font_family_input");
let fontSizeInput = document.querySelector(".font_size_input");
let boldIcon = document.querySelector(".fa-bold");
let underlineIcon = document.querySelector(".fa-underline");
let italicIcon = document.querySelector(".fa-italic");
let leftAlignIcon = document.querySelector(".fa-align-left");
let centerAlignIcon = document.querySelector(".fa-align-center");
let rightAlignIcon = document.querySelector(".fa-align-right");
let justifyAlignIcon = document.querySelector(".fa-align-justify");
let textColor = document.querySelector(".fa-tint")
let colorIcon = document.querySelector("input[action='fg-color']");
let backgroundColor = document.querySelector(".fa-fill-drip")
let bgColorIcon = document.querySelector("input[action='bg-color']");


for (let i = 0; i < 26; i++) {
    let divKiCopy = template.content.querySelector(".cell");
    let div = document.importNode(divKiCopy, true);
    div.innerHTML = String.fromCharCode(65 + i);
    topRow.appendChild(div);
}

for (let i = 1; i <= 100; i++) {
    let divKiCopy = template.content.querySelector(".cell");
    let div = document.importNode(divKiCopy, true);
    div.innerHTML = i;
    leftCol.appendChild(div);
}

for (let i = 1; i <= 100; i++) {
    let row = document.createElement("div");
    row.setAttribute("class", "row");
    for (let j = 1; j <= 26; j++) {
        let divKiCopy = template.content.querySelector(".cell");
        let div = document.importNode(divKiCopy, true);
        div.setAttribute("rId", i);
        div.setAttribute("cId", j);
        // div.innerHTML = i + " , "+j;
        row.appendChild(div);
    }
    grid.appendChild(row);
}

let sheetsDB = [];
function initialDB(){
    let db = [];
    for(let i=1;i<=100;i++){
        let row = [];
        for(let j=1;j<=26;j++){
            let obj = {
                color : "black",
                backgroundColor : "white",
                fontSize : 14,
                fontFamily : "sans serif",
                bold : "none",
                italic : "none",
                underline : "none",
                textAlign : "center",
                value : "",
                formula : "",
                children : []
            }
            row.push(obj);
        }
        db.push(row);
    }
    sheetsDB.push(db);
}
initialDB();

let db = sheetsDB[0];

let inputAddressBar = document.querySelector('.address_bar');
let gridCell = document.querySelectorAll(".grid>.row>.cell");
for (let i = 0; i < gridCell.length; i++) {
    gridCell[i].addEventListener('click', function (e) {
        let prevAddress = inputAddressBar.value;
        if (prevAddress != "") {
            //    console.log(prevAddress);
            let ridCidObj = getRidCidFromAddressBar(prevAddress);
            //    console.log(ridCidObj.rid + " " +ridCidObj.cid);
            let prevElement = document.querySelector(`.grid .cell[rid='${ridCidObj.rid}'][cid='${ridCidObj.cid}']`);
            prevElement.style.borderStyle = "none";
            prevElement.style.borderRight = "0.2px solid lightgrey";
            prevElement.style.borderBottom = "0.2px solid lightgrey";
        }

        let rId = parseInt(gridCell[i].getAttribute("rId"));
        let cId = parseInt(gridCell[i].getAttribute("cId"));
        // alert(rId + " "+ cId);

        // console.log(cId+64);
        inputAddressBar.value = String.fromCharCode(cId + 64) + "" + rId;
        gridCell[i].style.border = "1px solid green";
        // gridCell[i].focus();

        boldIcon.classList.remove("selected");
        underlineIcon.classList.remove("selected");
        italicIcon.classList.remove("selected");
        leftAlignIcon.classList.remove("selected");
        centerAlignIcon.classList.remove("selected");
        rightAlignIcon.classList.remove("selected");
        justifyAlignIcon.classList.remove("selected");
        textColor.classList.remove("selected");
        colorIcon.classList.remove("selected");
        backgroundColor.classList.remove("selected");


        fontFamilyInput.value = "sans-serif";
        fontSizeInput.value = 14;

        let obj = db[rId-1][cId-1];

        if(obj.bold=="bold"){
            boldIcon.classList.add("selected");
        }

        if(obj.color!="black"){
            textColor.classList.add("selected");
        }

        if(obj.backgroundColor!="white"){
            backgroundColor.classList.add("selected");
        }

        if(obj.fontSize!=14){
            fontSizeInput.value = obj.fontSize;
        }

        if(obj.fontFamily!="sans serif"){
            fontFamilyInput.value = obj.fontFamily;
        }

        if(obj.italic=="italic"){
            italicIcon.classList.add("selected");
        }

        if(obj.underline!="none"){
            underlineIcon.classList.add("selected");
        }

        if(obj.textAlign!="center"){
            if(obj.textAlign=="left"){
                leftAlignIcon.classList.add("selected");
                centerAlignIcon.classList.remove("selected");
                rightAlignIcon.classList.remove("selected");
                justifyAlignIcon.classList.remove("selected");
            }
            else if(obj.textAlign=="right"){
                rightAlignIcon.classList.add("selected");
                centerAlignIcon.classList.remove("selected");
                leftAlignIcon.classList.remove("selected");
                justifyAlignIcon.classList.remove("selected");
            }
            else if(obj.textAlign=="justify"){
                justifyAlignIcon.classList.add("selected");
                centerAlignIcon.classList.remove("selected");
                rightAlignIcon.classList.remove("selected");
                leftAlignIcon.classList.remove("selected");
            }
        }

        formulaInput.value = obj.formula;
    })

    // gridCell[i].addEventListener('keydown', function (event){
    //     if (event.keyCode == 9) {
           
    //        gridCell[i+1].click();
    //        return;
    //     }
    // })
}

let firstCell = document.querySelector(".grid .cell[rid='1'][cid='1']");
firstCell.click();

function getRidCidFromAddressBar(address) {
    let cid = address.charCodeAt(0) - 64;
    let rid = parseInt(address.substring(1));

    return {
        rid: rid,
        cid: cid
    }
}


let noOfSheet = document.querySelector('.sheets-list');
noOfSheet.children[0].addEventListener('click',function(){
    // console.log(noOfSheet);
    for(let i =0;i<noOfSheet.children.length;i++){
        // console.log(8);
        noOfSheet.children[i].classList.remove("active-sheet");
    }
    noOfSheet.children[0].classList.add("active-sheet");
    db = sheetsDB[0];
    setinitUI();
})



// new sheets
let sheetIcon = document.querySelector('.fa-plus');
sheetIcon.addEventListener('click',sheetHandler);
function sheetHandler(){
    let templateNode = template.content.querySelector('.sheet');
    let divFolder = document.importNode(templateNode,true);
    // console.log(divFolder);
    let noOfSheetLength = noOfSheet.children.length;
    divFolder.textContent = `Sheet ${noOfSheetLength+1}`;
    divFolder.setAttribute("sheetIdx",noOfSheetLength);
    noOfSheet.appendChild(divFolder);
    initialDB();
    divFolder.addEventListener('click',function(){
        // console.log(noOfSheet);
        for(let i =0;i<noOfSheet.children.length;i++){
            // console.log(8);
            noOfSheet.children[i].classList.remove("active-sheet");
        }
        divFolder.classList.add("active-sheet");
        let idx = divFolder.getAttribute("sheetIdx");
        db = sheetsDB[idx];
        setinitUI();
    }) 
    divFolder.click();
}

function sheetOpenHandler() {
    let templateNode = template.content.querySelector('.sheet');
    let divFolder = document.importNode(templateNode,true);
    // console.log(divFolder);
    let noOfSheetLength = noOfSheet.children.length;
    divFolder.textContent = `Sheet ${noOfSheetLength+1}`;
    divFolder.setAttribute("sheetIdx",noOfSheetLength);
    noOfSheet.appendChild(divFolder);
    // initialDB();
    divFolder.addEventListener('click',function(){
        // console.log(noOfSheet);
        for(let i =0;i<noOfSheet.children.length;i++){
            // console.log(8);
            noOfSheet.children[i].classList.remove("active-sheet");
        }
        divFolder.classList.add("active-sheet");
        let idx = divFolder.getAttribute("sheetIdx");
        db = sheetsDB[idx];
        setinitUI();
    }) 
}

