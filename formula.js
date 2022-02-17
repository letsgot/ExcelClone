for (let i = 0; i < gridCell.length; i++) {
    gridCell[i].addEventListener('blur', function (e) {
        let content = gridCell[i].textContent;
        let ridCidObj = getRidCidFromAddressBar(inputAddressBar.value);
        let obj = db[ridCidObj.rid - 1][ridCidObj.cid - 1];
        let formula = formulaInput.value;
        if (obj.value == content) {
            return;
        }
        //remove formula
        if (obj.formula) {
            removeFormula(inputAddressBar.value, obj.formula);
            obj.formula = "";
        }
        
        setUI(content, ridCidObj.rid, ridCidObj.cid);
        saveToLocalStorage()
    })
}
 //enter event in formula bar  
formulaInput.addEventListener('keydown', function (e) {
    if (e.key == "Enter" && formulaInput.value != "") {
        let formula = formulaInput.value;
        let ridCidObj = getRidCidFromAddressBar(inputAddressBar.value);
        let obj = db[ridCidObj.rid - 1][ridCidObj.cid - 1];
        //update formula wla part to removal
        if (obj.formula != formula) {
            removeFormula(inputAddressBar.value, obj.formula);
        }
        
        let value = evalFormula(formula);
        obj.formula = formula;
        setUI(value, ridCidObj.rid, ridCidObj.cid);
        setFormula(inputAddressBar.value, formula);
        saveToLocalStorage()
    }
})
 
// set ui here 
function setUI(value, rid, cid) {
    let obj = db[rid - 1][cid - 1];
    let cElement = document.querySelector(`.grid .cell[rid='${rid}'][cid='${cid}']`);
    cElement.textContent = value;
    obj.value = value;
    saveToLocalStorage()

    //recursion works on children array to set ui 
    let childrenArr = db[rid - 1][cid - 1].children;
    for (let i = 0; i < childrenArr.length; i++) {
        let chriciobj = getRidCidFromAddressBar(childrenArr[i]);
        // console.log(chriciobj);
        let chCellObj = db[chriciobj.rid - 1][chriciobj.cid - 1];
        // console.log(chCellObj);
        let value = evalFormula(chCellObj.formula);
        // console.log(value);
        setUI(value, chriciobj.rid, chriciobj.cid)
    }

}

// isko formula milega string ki form usko ye value bna k dega according param on formula 
function evalFormula(formula) {
    // console.log(formula);
    let formulaArray = formula.split(" ");
    // console.log(formulaArray);
    for (let i = 0; i < formulaArray.length; i++) {
        // console.log(formulaArray[i]);
        let ascii = formulaArray[i].charCodeAt(0);

        if (ascii >= 65 && ascii <= 90) {
            // console.log(ascii);
            let ridCidObj = getRidCidFromAddressBar(formulaArray[i]);
            let value = db[ridCidObj.rid - 1][ridCidObj.cid - 1].value;
            // console.log(value);
            formula = formula.replace(formulaArray[i], value);
            // console.log(formula);
        }
    }
    // console.log(formula);
    let evalValue = eval(formula);
    // console.log(evalValue);
    return evalValue;
}

// set formula in db and add this in parent k children array m also 
function setFormula(address, formula) {
    // console.log(formula);
    let formulaArray = formula.split(" ");
    // console.log(formulaArray);
    for (let i = 0; i < formulaArray.length; i++) {
        // console.log(formulaArray[i]);
        let ascii = formulaArray[i].charCodeAt(0);

        if (ascii >= 65 && ascii <= 90) {
            // address -> rid cId
            let parentrcObj = getRidCidFromAddressBar(formulaArray[i]);
            // console.log(parentrcObj);
            // db -> value
            let children = db[parentrcObj.rid - 1][parentrcObj.cid - 1].children;
            children.push(address);
        }
        saveToLocalStorage()
    }
}

// remove formula in db and remove this in parent k children array m also
function removeFormula(address, formula) {
    // console.log(formula);
    let formulaArray = formula.split(" ");
    // console.log(formulaArray);
    for (let i = 0; i < formulaArray.length; i++) {
        // console.log(formulaArray[i]);
        let ascii = formulaArray[i].charCodeAt(0);

        if (ascii >= 65 && ascii <= 90) {
            // address -> rid cId
            let parentrcObj = getRidCidFromAddressBar(formulaArray[i]);
            // console.log(parentrcObj);
            // db -> value
            let children = db[parentrcObj.rid - 1][parentrcObj.cid - 1].children;
            let idx = children.indexOf(address);
            children.splice(idx, 1);
        }
    }
    saveToLocalStorage()
}


function saveToLocalStorage(){
    let rjson = JSON.stringify(sheetsDB); // used to convert jso to a json string which can be saved
    localStorage.setItem("data", rjson);
}


function loadFromStorage(){
    let rjson = localStorage.getItem("data");
    if(!rjson){
        return;
    }

    // console.log(rjson);
   
    sheetsDB = JSON.parse(rjson);
    
    // console.log(db);
    db = sheetsDB[0];
    noOfSheet.children = [];
    setSheets();
    setinitUI();
   
}

loadFromStorage();