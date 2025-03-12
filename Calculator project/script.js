let runningtotal= 0; //running total of the calculator
let buffer = "0"; //buffer of the calculator
let previousOperator;  //previous operator of the calculator

const screen = document.querySelector('.screen'); //screen of the calculator

function buttonClick(value){ //function to handle the button click
     if(isNaN(value)){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol){ //function to handle the symbol
    switch(symbol){
        case 'C':
            buffer = "0";
            runningtotal = 0;
            break;
        case '=':
            if(previousOperator === null){
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningtotal;
            runningtotal = 0;
            break;
        case '←':
            if(buffer.length === 1){
                buffer = "0";
            }else{
                buffer = buffer.toString(0, buffer.length - 1);
            }
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol){ //function to handle the math
    if(buffer === "0"){
        return;
    }
    const intBuffer = parseInt(buffer);
    if(runningtotal === 0){
        runningtotal = intBuffer;
    }else{
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = "0";
}

function flushOperation(intBuffer){ //function to flush the operation
    if(previousOperator === "+"){
        runningtotal += intBuffer;
    }else if(previousOperator === "-"){
        runningtotal -= intBuffer;
    }else if(previousOperator === "*"){
        runningtotal *= intBuffer;
    }else{
        runningtotal /= intBuffer;
    }
}

function handleNumber(numberString){ //function to handle the number
    if(buffer === "0"){
        buffer = numberString;
    }else{
        buffer += numberString;
    }
}

function init(){ //function to initialize the calculator
    document.querySelector('.calc-buttons').addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    });
}

init(); //initialize the calculator