let resultHtml = document.getElementById('result')
let buttons = document.getElementsByTagName('button')

const operators = [
    '+', '-', '/', '*',
]

const operands = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'
]

let result = 0;

function render() {
    resultHtml.innerText = result
}

function commonActions(event) {
    result = String(result)

    let input = event.key ?? event.target.innerText

    if ((input == '.')
        && result.includes('.')) {
        return
    }

    if (result == "0") {
        if (input = 0) {
            result = "0"
            return
        }

        if (input == '.') {
            result += '.'
            return
        }
        result = ""
    }


    if (input == 'Enter' || input == '=') {
        result = eval(result)
        render()
        return
    }

    if (input == 'Escape' || input == 'AC') {
        result = 0
        render()
        return
    }

    return true
}



for (let button of buttons) {

    button.onclick = (event) => {
        if (commonActions(event)) {
            result += event.target.innerText
            render()
        }
    }
}

window.onkeyup = (event) => {
    commonActions(event);
}
render()