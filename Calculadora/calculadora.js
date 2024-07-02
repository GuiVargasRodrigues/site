document.addEventListener("DOMContentLoaded", function() {
    const display = document.getElementById("display");
    let operand1 = '';
    let operator = '';
    let operand2 = '';
    let result = '';

    function clearDisplay() {
        display.value = '';
    }

    function updateDisplay(value) {
        display.value += value;
    }

    function calculate() {
        switch (operator) {
            case '+':
                result = parseFloat(operand1) + parseFloat(operand2);
                break;
            case '-':
                result = parseFloat(operand1) - parseFloat(operand2);
                break;
            case 'x':
                result = parseFloat(operand1) * parseFloat(operand2);
                break;
            case '÷':
                result = parseFloat(operand1) / parseFloat(operand2);
                break;
        }
        display.value = result;
        operand1 = result.toString();
        operand2 = '';
        operator = '';
    }

    document.querySelectorAll('td').forEach(item => {
        item.addEventListener('click', event => {
            const buttonValue = event.target.textContent;
            switch (buttonValue) {
                case 'C':
                    clearDisplay();
                    operand1 = '';
                    operator = '';
                    operand2 = '';
                    break;
                case '←':
                    display.value = display.value.slice(0, -1);
                    break;
                case '+':
                case '-':
                case 'x':
                case '÷':
                    if (operand1 !== '') {
                        operator = buttonValue;
                        updateDisplay(buttonValue);
                    }
                    break;
                case '=':
                    if (operand1 !== '' && operator !== '' && operand2 !== '') {
                        calculate();
                    }
                    break;
                default:
                    if (operator === '') {
                        operand1 += buttonValue;
                    } else {
                        operand2 += buttonValue;
                    }
                    updateDisplay(buttonValue);
                    break;
            }
        });
    });
});
