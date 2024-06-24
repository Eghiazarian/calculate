let resultHtml = document.getElementById('result');
let buttons = document.getElementsByTagName('button');

const operators = ['+', '-', '/', '*'];
const operands = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];

let result = "0";
let input = '';
let lastInputedData = '';

function render() {
    resultHtml.innerText = result;
}

function addToCalcString(input) {
    input = String(input);
   
    if (result === "0" && input === '-') {
        result = "";
    }
    
    lastInputedData = input;
    result += input;
}

function zero() {
    if (result === "0" && input === '.') {
        result = "0";
        return;
    }

    if (result === "0" && ['*', '/'].includes(input)) {
        result = "0";
        return;
    }

    if (result === "0") {
        result = '';
    }
}

function roundResult(value, num) {
    return Number(Math.round(value + 'e' + num) + 'e-' + num);
}

function validatePoint() {
    let partials = result.split(/[\+\-\*\/]/);
    let lastPart = partials[partials.length - 1];

    if (input === '.' && lastPart.includes('.')) {
        return true;
    }
    return false
}

function backspace() {
    result = result.slice(0, -1)

    if (result == '') {
        addToCalcString(0)
    }
}

function commonActions(event) {
    input = event.key ?? event.target.innerText;

    if (validatePoint()) {
        return false
    }

    if (operators.includes(lastInputedData) && operators.includes(input)) {
        backspace()
        addToCalcString(input)
        render()
        return false;
    }

    if (input === '=' || input === 'Enter') {
        if (operators.includes(lastInputedData)) {
            return false;
        }

        try {
            result = String(roundResult(eval(result), 10));
            // result = String(eval(result));
        } catch (error) {
            result = "Error";
        }

        render();
        return false;
    }

    if (input === 'Del' || input === "Backspace") {
        backspace()
        render()
        return
    }

    if (input === 'Escape' || input === 'AC') {
        result = "0";
        render();
        return false;
    }

    if (!(operators.includes(input) || operands.includes(input))) {
        return false
    }

    if (input !== '=') {
        lastInputedData = input;
    }

    return true;
}

for (let button of buttons) {
    button.onclick = (event) => {
        if (commonActions(event)) {
            zero();
            addToCalcString(input);
            render();
        }
    };
}

window.onkeyup = (event) => {
    if (commonActions(event)) {
        zero();
        addToCalcString(input);
        render();
    }
};

render();
