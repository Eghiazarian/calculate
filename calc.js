let resultHtml = document.getElementById('result')
let buttons = document.getElementsByTagName('button')

const operators = [
    '+', '-', '/', '*',
]

const operands = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'
]

let result = "0";
let input = ''
let lastInputedData = ''

function render() {
    resultHtml.innerText = result
}

function addToCalcString(input) {
    input = String(input)
    lastInputedData = input
    result += input
}

function zero() {
    if (result === "0" && input === '.') {
        result = "0"
        return
    }

    if (result === "0" && ['*', '/'].includes(input)) {
        result = "0"
        return
    }

    if (result === "0") {
        result = ''
    }

}

function commonActions(event) {

    input = event.key ?? event.target.innerText
    
    if (input == '.' && lastInputedData == '.') {
        return
    }

    if (operators.includes(lastInputedData) && input == '.') {
        addToCalcString("0")
    }

    if (operators.includes(lastInputedData) && operators.includes(input)) {
        return
    }

    if (input !== '=') {
        lastInputedData = input
    }

    if (input == 'Enter' || input == '=') {

        if (operators.includes(lastInputedData)) {
            return
        }

        result = String(eval(result))
        render()
        return
    }

    if (input == 'Escape' || input == 'AC') {
        result = "0"
        render()
        return
    }

    return true
}

for (let button of buttons) {
    button.onclick = (event) => {
        if (commonActions(event)) {
            zero()
            addToCalcString(input)
            render()
        }
    }
}

// window.onkeyup = (event) => {
//     commonActions(event);
// }
render()