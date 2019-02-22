"use strict";

const resultDom = document.getElementById("result");
const showDataDom = document.getElementById("showData");
const inputBtn = document.getElementById("inputBtn");
const searchBar = document.getElementById("searchBar");
const errorMsg =  document.getElementById("errSpan");
const showBtn = document.getElementById('showBtn');

const symbols = document.getElementById("operatorsDiv");
const symbolList = document.getElementById("operatorsList");
const others = document.getElementById("othersDiv");
const othersList = document.getElementById("othersList");
const numbers  = document.getElementById("numbersDiv");
const numberList = document.getElementById("numbersList");
let result;
let buttonInputs;
let prevExpression;
let isFocussed = true;
let flag = 0;
let n = 0;
let cusrsorPoint;
resultDom.value = "";
let count =0;
let bl;
/*
 *  This method is to allow drag property and get id of draggable item
 *  Created by Suresh
 *  Dt: 15-02-2019 
 */
function drag(e) {
    console.log('text set');
    e.dataTransfer.setData("text", e.target.id);
    // let holder = document.createElement("div");
    // holder.setAttribute("id",`subDiv${count}`)
    // holder.addEventListener("drop",drop,false);
    // holder.addEventListener("dragover",allowDrop,false);
    // holder.addEventListener("dragend",addEffect,false);
    // showBtn.appendChild(holder);
    // count++;
};

/*
 *  This method is executed while dragging
 *  Created by Suresh
 *  Dt: 15-02-2019 
 */
function onDrag(e) { 
    let droppable = showBtn.children;
    console.log(droppable);
    for(let holder of droppable){
        console.log(holder.hasChildNodes());
        if(!holder.hasChildNodes())
        {
            holder.classList.add("blink");
            // bl = setInterval(()=>{
            //     holder.hidden = !holder.hidden
            // },1000);
        }
            
    }
};
/*
 *  This method is to prevent default behaviour of drag
 *  Created by Suresh
 *  Dt: 15-02-2019 
 */
function allowDrop(e) {
    if(e){
        e.preventDefault();
        let droppable = showBtn.children;
        console.log(droppable);
    }     
};
/*
 *  This method is to append draggable item to target item
 *  Created by Suresh
 *  Dt: 15-02-2019 
 */
function drop(e) {
    if(e){
       console.log(e);
        e.preventDefault();
        var data = e.dataTransfer.getData("text");
        console.log(document.getElementById(data).classList);
        if(document.getElementById(data).classList.contains("CIR")){
            document.getElementById(data).classList.add("circle");
            document.getElementById(data).classList.remove("CIR");
        }
        else if(document.getElementById(data).classList.contains("SQUARE")){
            document.getElementById(data).classList.add("square");
            document.getElementById(data).classList.remove("SQUARE");
        }
        else if(document.getElementById(data).classList.contains("RECT")){
            document.getElementById(data).style.width = 68+"px";
        }
        let droppable = showBtn.children;
        console.log(droppable);
        for(let holder of droppable){
                holder.classList.remove("blink");
                // holder.clearInterval();
        }
        document.getElementById(data).addEventListener("click",calculate,false);
        document.getElementById(e.target.id).appendChild(document.getElementById(data));
    }
};
function addEffect(e) {
    // e.preventDefault();
    e.target.classList.add("ripple");
};


/*
 *  This method is to create the UI elements in the DOM
 *  Created by Suresh
 *  Dt: 15-02-2019 
 */
function createButton() {
    var buttonInputs = [{
                            type: "accordion",
                            title: "Numbers",
                            children: [
                                {value:"1",type:"CIR",tags:["1","one"]},
                                {value:"2",type:"CIR",tags:["2","two"]},
                                {value:"3",type:"CIR",tags:["3","three"]},
                                {value:"4",type:"CIR",tags:["4","four"]},
                                {value:"5",type:"CIR",tags:["5","five"]},
                                {value:"6",type:"CIR",tags:["6","six"]},
                                {value:"7",type:"CIR",tags:["7","seven"]},
                                {value:"8",type:"CIR",tags:["8","eight"]},
                                {value:"9",type:"CIR",tags:["9","nine"]},
                            ]
                        },
                        {
                            type: "accordion",
                            title: "Operators",
                            children: [
                                {value:"%",type:"SQUARE",tags:["%","percent"]},
                                {value:"/",type:"SQUARE",tags:["/","divide"]},
                                {value:"*",type:"SQUARE",tags:["*","multiply"]},
                                {value:"+",type:"SQUARE",tags:["+","add"]},
                                {value:"-",type:"SQUARE",tags:["-","sub"]},
                                {value:"=",type:"RECT",tags:["=","equal"]},
                                {value:".",type:"CIR",tags:[".","dot"]},
                                {value:"(",type:"SQUARE",tags:["(","left parenthesis"]},
                                {value:")",type:"SQUARE",tags:[")","right parenthesis"]},
                            ]
                        },
                        {
                            type: "accordion",
                            title: "Others",
                            children: [
                                {value:"C",type:"RECT",tags:["c","clear"]},
                                {value:"D",type:"RECT",tags:["d","delete"]},
                                {value:"x2",type:"RECT",tags:["x2","pow"]},
                                {value:"sqrt",type:"RECT",tags:["sqrt","root"]}
                            ]
                        }];   
          
    buttonInputs.forEach(( tab, index) => {
        let title = tab.title;
        title = title.toLowerCase();
        let buttons = tab.children;
        let container = document.createElement("div");
        let tabName = document.createElement("div");
        let buttonList = document.createElement("div");
        container.setAttribute("id",`${title}Div`);
        tabName.setAttribute("id",title);
        tabName.innerText = tab.title;
        tabName.setAttribute("class",tab.type);
        buttonList.setAttribute("id",`${title}List`);
        buttonList.setAttribute("class","panel");

        buttons.forEach((btnObj)=>{
            let btn  = document.createElement("button");
            btn.setAttribute("draggable","true");
            btn.setAttribute("id", `btn_${btnObj.value}`);
            btn.setAttribute("class",btnObj.type);
            btn.innerText = btnObj.value;
            btn.addEventListener("dragstart",drag,false);
            btn.addEventListener("drag",onDrag,false);
            buttonList.appendChild(btn); 
        });
        container.appendChild(tabName);
        container.appendChild(buttonList);
        searchBar.appendChild(container);

    });
};

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
    errorMsg.innerText = "";
    console.log(e);
    if(flag == 1){
        flag = 0;
        let val = e.target.innerText || e.key;
        console.log(val)
        if(!isNaN(val)){
            console.log("hi")
            console.log(val)
            resultDom.value = val;
            return;
        }   
    }
    let val;
    resultDom.focus();
    console.log("click");
    let vall = e.target.innerText;
    val = vall.charCodeAt(0);
    console.log(val);
    switch(val){
        case 61:
        case 13:
            flag = 1;
            // if(count == 1){
            //     return;
            // }
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
                    console.log("value"+ resultDom.value);
                    // errorMsg.innerText = "";
                    prevExpression = resultDom.value;
                    updateValue(resultDom.value);
                }
                catch(e) {
                    errorMsg.innerText = e.message;
                    resultDom.value = resultDom.value;
                }  
            } break;
        case 67:resultDom.value = "";break;
        case 127:
        case 8:
        case 68:cusrsorPoint =  resultDom.selectionEnd;
                console.log(cusrsorPoint);
                console.log(resultDom.value);
                resultDom.value = (resultDom.value).slice(0,cusrsorPoint-1) + (resultDom.value).slice(cusrsorPoint);break;
        case 120:
        case 88:resultDom.value = Math.pow(resultDom.value,2);break;
        case 115:
        case 83:if(Math.sign(resultDom.value) == -1){
                    resultDom.value *= -1;
                }
                resultDom.value = Math.sqrt(resultDom.value);break;
        default:resultDom.value += String.fromCharCode(val);
    };
    };
    
    /*
     *  This is the method does calculus operations
     *  Created by Suresh
     *  Dt: 15-02-2019 
     */
    function updateValue(res){
        let output;
        let regX = /[+||-||*||%||/]/;
        // if(!res.includes(regX)){
        //     console.log("ok")
        //     resultDom.value=res;
        //     return;
        // }
        result = eval(res);
        output = result;
        if(result == undefined){
            resultDom.value=res;
             errorMsg.innerText = "Malformed Expression";
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
        let zee = res.match(regX);;
        console.log(zee[0]);
        let str = res.split(zee[0]);
        let str1 = str[0];
        let str2 = str[1];
        if(str1.length > 7){
            str1 = str1.slice(0,5) + "..";
        }
        if(str2.length > 7){
            str2 = str2.slice(0,5) + "..";
        }
        if(output.length > 9){
            output = output.slice(0,8) + "..";
        }
        span1.innerText = str1+" "+zee[0]+" "+str2;
        span2.innerText = output;
        span3.innerText = '='+ ' ';
        para.appendChild(span1);
        para.appendChild(span3);
        para.appendChild(span2);
        showDataDom.appendChild(para);
    
        let newHeight = showDataDom.scrollHeight;
        showDataDom.scrollTop = newHeight;
    };
   
    
    function sortBtn(e){

    }

function sortBtn1(event) {
let last;
console.log(event.keyCode);
let input = document.querySelector("#input").value;
if(event.keyCode == 8){
    console.log(input == "");
    if(input == ""){
        // let zee = searchBar.children;
        // let z = zee[0].children;
        for(let i =0;i<last.length;i++){
            last[i].style.display = "block";
        }
        symbols.style.display = "block";
        numbers.style.display = "block";
        others.style.display = "block";
        return;
    }
}
input = input.toLowerCase();
var currentBtn = buttonInputs.find((obj)=> {
    let tags = obj.tags;
    let bool = tags.includes(input);
    if(bool){
      return obj;
    }
    else{
        return null;
    }
});
console.log(currentBtn == null);
if(currentBtn == null){
    console.log("null ")
    symbols.style.display = "none";
    numbers.style.display = "none";
    others.style.display = "none";
    return;
}
let showBtn = document.getElementById(`btn_${currentBtn.value}`);
let showBtnDiv = document.getElementById(showBtn.parentElement.id);
let showBtnDivParent = document.getElementById(showBtnDiv.parentElement.id);
console.log(showBtnDivParent);
console.log(showBtnDiv);
console.log(showBtn);
symbols.style.display = "none";
numbers.style.display = "none";
others.style.display = "none";

showBtnDivParent.style.display = "block";
let z = showBtnDivParent.children;
// for(let i =0;i<z.length;i++){
//     z[i].style.display = "none";
// }
showBtnDiv.style.display = "block";
let currentDivChildren = showBtnDiv.children;
last = currentDivChildren;
for(let i =0;i<currentDivChildren.length;i++){
    currentDivChildren[i].style.display = "none";
}
showBtn.style.display = "block";
};
      
window.onmousedown = function (e) {
    let targetId = e.target.id;
    console.log(targetId.includes("subDiv"));
    if(targetId.includes("subDiv") && e.button == 2){
        console.log(event.clientX);
        console.log(event.clientY);
        e.preventDefault();
    }
};