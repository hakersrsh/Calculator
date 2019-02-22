"use strict";

const resultDom = document.getElementById("result");
const showDataDom = document.getElementById("showData");
const inputBtn = document.getElementById("inputBtn");
const searchBar = document.getElementById("searchBar");
const errorMsg =  document.getElementById("errSpan");
const showBtn = document.getElementById('showBtn');
let result;
let prevExpression;
let isFocussed = true;
let flag = 0;
let n = 0;
let cusrsorPoint;
resultDom.value = "";


resultDom.onfocus = function(){
    console.log('focussed');
    isFocussed = true;
};
resultDom.onblur = function(){
    console.log('Blur');
    isFocussed = false;
};
resultDom.keyup = function() {
    console.log("key up");
}

function drag(e) {
    console.log('text set');
    e.dataTransfer.setData("text", e.target.id);
};
function allowDrop(e) {
    if(e){
        e.preventDefault();
    }       
};
function drop(e) {
    if(e){
       console.log(e);
        e.preventDefault();
        var data = e.dataTransfer.getData("text");
        document.getElementById(e.target.id).appendChild(document.getElementById(data));
    }
};

function addEffect(e) {
    e.target.className = "ripple";
    e.target.addEventListener("click",calculate(event),false);
};

/*
 *  This method is to create the UI elements in the DOM
 *  Created by Suresh
 *  Dt: 15-02-2019 
 */
function createButton() {
    var buttonInputs = ["C","D","%","/","7","8","9","*","4","5","6","-","1","2","3","+","0",".","=","(",")","x2","sqrt"];
    buttonInputs.forEach(( val, index) => {
      
        var btn = document.createElement("button");
        btn.setAttribute("draggable","true");
        btn.setAttribute("id", `btn_${val}`);
        btn.innerText = val;
        btn.addEventListener("dragstart",drag,false);
        searchBar.appendChild(btn);
    });
}
/*
 *  This method is to restrict charecter inputs from keyboard
 *  Created by Suresh
 *  Dt: 15-02-2019 
 */
function workarea(e){
    if(e.key >= "a" && e.key <= "z" || e.key >= "A" && e.key <= "Z"){
        e.preventDefault();
    }
    if(e.code === 'Equal' && !e.shiftKey){
        e.preventDefault();
    }
}

/*
 *  This is the method does additional functionalities of calculator
 *  Created by Suresh
 *  Dt: 15-02-2019 
 */
function calculate(e){
    if(flag == 1){
        flag = 0;
        let val = e.target.innerText || e.key;
        if(!isNaN(val)){
            console.log(val)
            resultDom.value = val;
            return;
        }   
    }
  
    let val;
  
    resultDom.focus();
    if(e.type == 'click')
    {
        console.log("click");
        let vall = e.target.innerText;
        val = vall.charCodeAt(0);
    }
    if(e.type == 'keypress' || e.type == 'keyup')
    {
        console.log("keypress");
        val= e.keyCode;
        console.log(val);
   }
    switch(val){
        case 61:
        case 13:
            flag = 1;
            if(resultDom.value == prevExpression){
                resultDom.value = result;
                return;
            }
            if(resultDom.value == result){
                resultDom.value = prevExpression;
                return;
            }
            if(resultDom.value == "") {
                resultDom.value = "";
                showDataDom.innerText = "";
            }
            else {
                console.log("value"+ resultDom.value);
                try {
                    
                    errorMsg.innerText = "";
                    prevExpression = resultDom.value;
                    updateValue(resultDom.value);
                }
                catch(e) {
                  errorMsg.innerText = e.message;
                  
                }  
            } break;
        case 67:resultDom.value = "";break;
        case 127:
        case 8:
        case 68:cusrsorPoint =  resultDom.selectionEnd;
                resultDom.value = (resultDom.value).slice(0,cusrsorPoint-1) + (resultDom.value).slice(cusrsorPoint);break;
        case 88:resultDom.value = Math.pow(resultDom.value,2);break;
        case 83:if(Math.sign(resultDom.value) == -1){
                    resultDom.value *= -1;
                }
                resultDom.value = Math.sqrt(resultDom.value);console.log(resultDom.value);break;
        default:resultDom.value += String.fromCharCode(val);
    };
};

/*
 *  This is the method does calculus operations
 *  Created by Suresh
 *  Dt: 15-02-2019 
 */
function updateValue(res){
    let val1,val2;
    result = eval(res);
    if(result == undefined){
        resultDom.value=res;
        errorMsg.innerText = "Malformed Expression";
        errorMsg.style.display = "block";
        return;
    }
    resultDom.value=result;
    let para = document.createElement('p');
    let span1 = document.createElement("span");
    let span2=document.createElement("span");
    let span3=document.createElement("span");
    span1.setAttribute("class","leftSpan");
    span2.setAttribute("class","rightSpan");
    span3.setAttribute("class","midSpan");
    span1.innerText = res;
    span2.innerText = result;
    span3.innerText = '=';
    if(res.length > 10){
        val1 = res.slice(0,10) + "..";
        span1.innerText = val1;
    }
    if(result.length > 10){
        val2 = result.slice(0,10) + "..";
        span2.innerText = val2;
    }
    para.appendChild(span1);
    para.appendChild(span3);
    para.appendChild(span2);
    showDataDom.appendChild(para);

    let newHeight = showDataDom.scrollHeight;
    showDataDom.scrollTop = newHeight;
};
