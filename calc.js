let result = document.getElementById('result')
let buttons = document.getElementsByTagName('button')

for (let button of buttons) {
    button.onclick = (event) => {

        if (result.value == 0) {
            result.value = ''
        }

        if (event.target.innerText == '=') {

            result.value = eval(result.value)
            return
        }

        result.value += event.target.innerText

        if (event.target.innerText == 'AC') {
            result.value = 0
        }
    }
}
window.onkeyup = (event) => {
    if (result.value == 0) {
        result.value = ''
    }
        
    let list = [
        '1', '2', '3',
        '4', '5', '6',
        '7', '8', '9',
        '0', '+', '-',
        '/', '*', '.']

    for (i = 0; i < list.length; i++) {
        if (event.key == list[i]) {
            let lastChar = result.value[result.value.length - 1]
            let array = ['+', '-','/', '*', '.']
            if (array.includes(lastChar) && lastChar == event.key) {
                return
            }
            result.value += list[i]
            return
        }
    }
    if (event.key == 'Enter') {
        result.value = eval(result.value)
        return
    }
    if (event.key == 'Escape') {
        result.value = 0
    }
}