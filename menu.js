

fontFamilyInput.addEventListener("change", function () {
    let fontFamily = fontFamilyInput.value;
    console.log(fontFamily);
    console.log(inputAddressBar.value);
    let ridCidObj = getRidCidFromAddressBar(inputAddressBar.value);
    console.log(ridCidObj);
    let cElement = document.querySelector(`.grid .cell[rid='${ridCidObj.rid}'][cid='${ridCidObj.cid}']`);
    console.log(cElement);
    cElement.style.fontFamily = fontFamily;
    //data changed
    // console.log(ridCidObj.rid,ridCidObj.cid);
    let obj = db[ridCidObj.rid-1][ridCidObj.cid-1];
    obj.fontFamily = fontFamily;
    saveToLocalStorage();
});

fontSizeInput.addEventListener("change", function () {
    let fontSize = fontSizeInput.value;
    let ridCidObj = getRidCidFromAddressBar(inputAddressBar.value);
    let cElement = document.querySelector(`.grid .cell[rid='${ridCidObj.rid}'][cid='${ridCidObj.cid}']`);
    cElement.style.fontSize = fontSize + "px";
    //data changed
    let obj = db[ridCidObj.rid-1][ridCidObj.cid-1];
    obj.fontSize = fontSize;
    // console.log(obj);
    saveToLocalStorage();
});

boldIcon.addEventListener("click", function () {
    // console.log(fontSize);
    let ridCidObj = getRidCidFromAddressBar(inputAddressBar.value);
    //    console.log(ridCidObj);
    let cElement = document.querySelector(`.grid .cell[rid='${ridCidObj.rid}'][cid='${ridCidObj.cid}']`);
    let obj = db[ridCidObj.rid-1][ridCidObj.cid-1];
    console.log(obj);

    if(obj.bold=="none"){
        cElement.style.fontWeight = "bold";
        boldIcon.classList.add("selected");
        //data changed 
        obj.bold = "bold";
    }
    else{
        // working change 
        cElement.style.fontWeight = "normal";
        //ui change 
        boldIcon.classList.remove("selected");
        //data changed 
        obj.bold = "none";
    }   
    saveToLocalStorage();    
});

underlineIcon.addEventListener("click", function () {
    // console.log(fontSize);
    let ridCidObj = getRidCidFromAddressBar(inputAddressBar.value);
    //    console.log(ridCidObj);
    let cElement = document.querySelector(`.grid .cell[rid='${ridCidObj.rid}'][cid='${ridCidObj.cid}']`);
    let obj = db[ridCidObj.rid-1][ridCidObj.cid-1];
    

    // cElement.style.textDecoration = "underline";
    // underlineIcon.classList.add("selected");
    // obj.underline = "underline";
   
    if(obj.underline=="none"){
        cElement.style.textDecoration = "underline";
        underlineIcon.classList.add("selected");
        //data changed 
        obj.underline = "underline";
    }
    else{
        // working change 
        cElement.style.textDecoration = "none";
        //ui change 
        underlineIcon.classList.remove("selected");
        //data changed 
        obj.underline = "none";
    } 
    saveToLocalStorage();      
});

italicIcon.addEventListener("click", function () {
    // console.log(fontSize);
    let ridCidObj = getRidCidFromAddressBar(inputAddressBar.value);
    //    console.log(ridCidObj);
    let cElement = document.querySelector(`.grid .cell[rid='${ridCidObj.rid}'][cid='${ridCidObj.cid}']`);
    let obj = db[ridCidObj.rid-1][ridCidObj.cid-1];

    if(obj.italic=="none"){
        cElement.style.fontStyle = "italic";
        italicIcon.classList.add("selected")
        //data changed 
        obj.italic = "italic";
    }
    else{
        // working change 
        cElement.style.fontStyle = "normal";
        //ui change 
        italicIcon.classList.remove("selected");
        //data changed 
        obj.italic = "none";
    }       
    saveToLocalStorage();
});

leftAlignIcon.addEventListener("click", function () {
    // console.log(fontSize);
    let ridCidObj = getRidCidFromAddressBar(inputAddressBar.value);
    //    console.log(ridCidObj);
    let cElement = document.querySelector(`.grid .cell[rid='${ridCidObj.rid}'][cid='${ridCidObj.cid}']`);
    let obj = db[ridCidObj.rid-1][ridCidObj.cid-1];

    if(obj.textAlign!="left"){
        cElement.style.textAlign = "left";
        leftAlignIcon.classList.add("selected");
        obj.textAlign = "left";

        centerAlignIcon.classList.remove("selected");
        rightAlignIcon.classList.remove("selected");
        justifyAlignIcon.classList.remove("selected");
    }
    else{
        // working change 
        cElement.style.textAlign = "center";
        //ui change 
        leftAlignIcon.classList.remove("selected");
        //data changed 
        obj.textAlign = "center";
    }   
    saveToLocalStorage();  
});

centerAlignIcon.addEventListener("click", function () {
    // console.log(fontSize);
    let ridCidObj = getRidCidFromAddressBar(inputAddressBar.value);
    //    console.log(ridCidObj);
    let cElement = document.querySelector(`.grid .cell[rid='${ridCidObj.rid}'][cid='${ridCidObj.cid}']`);
    let obj = db[ridCidObj.rid-1][ridCidObj.cid-1];
    if(obj.textAlign!="center"){
        cElement.style.textAlign = "center";
        centerAlignIcon.classList.add("selected");
        obj.textAlign = "center";

        justifyAlignIcon.classList.remove("selected");
        rightAlignIcon.classList.remove("selected");
        leftAlignIcon.classList.remove("selected");
    }
    else{
        // working change 
        cElement.style.textAlign = "center";
        //ui change 
        centerAlignIcon.classList.remove("selected");
        //data changed 
        obj.textAlign = "center";
    }     
    saveToLocalStorage();
});

rightAlignIcon.addEventListener("click", function () {
    // console.log(fontSize);
    let ridCidObj = getRidCidFromAddressBar(inputAddressBar.value);
    //    console.log(ridCidObj);
    let cElement = document.querySelector(`.grid .cell[rid='${ridCidObj.rid}'][cid='${ridCidObj.cid}']`);
    let obj = db[ridCidObj.rid-1][ridCidObj.cid-1];
    if(obj.textAlign!="right"){
        cElement.style.textAlign = "right";
        rightAlignIcon.classList.add("selected");
        obj.textAlign = "right";

        centerAlignIcon.classList.remove("selected");
                leftAlignIcon.classList.remove("selected");
                justifyAlignIcon.classList.remove("selected");
    }
    else{
        // working change 
        cElement.style.textAlign = "center";
        //ui change 
        rightAlignIcon.classList.remove("selected");
        //data changed 
        obj.textAlign = "center";
    }   
    saveToLocalStorage();
});

justifyAlignIcon.addEventListener("click", function () {
    // console.log(fontSize);
    let ridCidObj = getRidCidFromAddressBar(inputAddressBar.value);
    //    console.log(ridCidObj);
    let cElement = document.querySelector(`.grid .cell[rid='${ridCidObj.rid}'][cid='${ridCidObj.cid}']`);
    let obj = db[ridCidObj.rid-1][ridCidObj.cid-1];
    if(obj.textAlign!="justify"){
        cElement.style.textAlign = "justify";
        justifyAlignIcon.classList.add("selected");
        obj.textAlign = "justify";

        centerAlignIcon.classList.remove("selected");
        rightAlignIcon.classList.remove("selected");
        leftAlignIcon.classList.remove("selected");
    }
    else{
        // working change 
        cElement.style.textAlign = "center";
        //ui change 
        justifyAlignIcon.classList.remove("selected");
        //data changed 
        obj.textAlign = "center";
    }     
    saveToLocalStorage();
});

textColor.addEventListener('click', function () {
    colorIcon.click();
})

colorIcon.addEventListener("change", function () {
    let color = colorIcon.value;
    // console.log(fontSize);
    let ridCidObj = getRidCidFromAddressBar(inputAddressBar.value);
    //    console.log(ridCidObj);
    let cElement = document.querySelector(`.grid .cell[rid='${ridCidObj.rid}'][cid='${ridCidObj.cid}']`);
    //data changed
    let obj = db[ridCidObj.rid-1][ridCidObj.cid-1];

    if(obj.color=="black"){
        cElement.style.color = color;
        textColor.classList.add("selected");
        //data changed 
        obj.color = color;
    }
    else{
        // working change 
        cElement.style.color = color;
        //ui change 
        textColor.classList.remove("selected");
        //data changed 
        obj.color = color;
    }    
    saveToLocalStorage();
});

backgroundColor.addEventListener('click', function () {
    bgColorIcon.click();
    backgroundColor.classList.add("selected");
})

bgColorIcon.addEventListener("change", function () {
    let bg_color = bgColorIcon.value;
    // console.log(fontSize);
    let ridCidObj = getRidCidFromAddressBar(inputAddressBar.value);
    //    console.log(ridCidObj);
    let cElement = document.querySelector(`.grid .cell[rid='${ridCidObj.rid}'][cid='${ridCidObj.cid}']`);
    

    //data changed
    let obj = db[ridCidObj.rid-1][ridCidObj.cid-1];

    if(obj.backgroundColor=="white"){
        cElement.style.backgroundColor = bg_color;
        bgColorIcon.classList.add("selected");
        //data changed 
        obj.backgroundColor = bg_color;
    }
    else{
        // working change 
        cElement.style.backgroundColor = bg_color;
        //ui change 
        bgColorIcon.classList.remove("selected");
        //data changed 
        obj.backgroundColor = bg_color;
    }    
    saveToLocalStorage();
});

