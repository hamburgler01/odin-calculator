let isInitialized = true;
let firstOperand = null;
let secondOperand = null;
let middleOperator = null;
let fullOperand = null;


function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    console.log("divide: ", a, b);
    return b == 0 ? NaN : a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '*': return multiply(a, b);
        case '/': return divide(a, b);
        default:  return NaN;
    }
}

function getResultString(result) {
    console.log("result =", result)
    if (Number.isNaN(result)) {
        console.log("returning nan");
        return "NaN";
    }
    if (result > 99999999999) {
        return result.toExponential(2);
    }
    
    let resultStr = result.toString();
    if (resultStr.length > 11) {
        resultStr = result.toFixed(11 - Math.round(result).toString().length - 1);
    }
    return resultStr;

    
}

function handleOperand(e) {
    let operand = e.target.textContent;

   // e.target.style.backgroundColor = 'white';

    let screen = document.querySelector('#screen');

    if (isInitialized) {
        // Nothing has been entered yet (no first or second operand and no operator).
        // This case has special treatment in order to clear the initial 0 or the
        // previous operand instead of concatenating the rest of the operand to them.
        screen.textContent = operand;
        fullOperand = operand;
        isInitialized = false;
    } else {
        // Digits of the operand have already been entered.  Concatenate the next digit.
        if (operand == '.' && fullOperand.includes('.')) {
            return;
        }
        fullOperand += operand;
        screen.textContent += operand;
        screen.textContent = screen.textContent.slice(-11);
    }

    if (!middleOperator) {
        firstOperand = Number(fullOperand);
    } else {
        secondOperand = Number(fullOperand);
    }
}

function handleClear() {
    document.querySelector('#screen').textContent = '0';
    isInitialized = true;
    firstOperand = null;
    secondOperand = null;
    middleOperator = null;
    fullOperand = null;
}

function handleOperator(e) {
    if (firstOperand == null) {
        return;
    }

    // If there is already an operator and second operand, the operator behaves as an equals.
    if (middleOperator != null && secondOperand != null) {
        let result = operate(middleOperator, firstOperand, secondOperand);
        document.querySelector('#screen').textContent = getResultString(result);
        
        firstOperand = result;
        secondOperand = null;
    }

    middleOperator = e.target.textContent;
    isInitialized = true;
}

function handleEquals(e) {
    if (firstOperand == null || middleOperator == null || secondOperand == null) {
        return;
    }
    
    let result = operate(middleOperator, firstOperand, secondOperand);
    document.querySelector('#screen').textContent = getResultString(result);

    firstOperand = result;
    middleOperator = null;
    secondOperand = null;
}

function addPressedClass(e) {
    console.log("====> add pressed");
    e.target.classList.add('pressed');
    setTimeout(() => e.target.classList.remove('pressed'), 200);
}

let operands = document.querySelectorAll('.operand');
operands.forEach(operand => operand.addEventListener('click', handleOperand));

let clear = document.querySelector('.clear');
clear.addEventListener('click', handleClear);

let operators = document.querySelectorAll('.operator');
operators.forEach(operator => operator.addEventListener('click', handleOperator));

let equals = document.querySelector('.equals');
equals.addEventListener('click', handleEquals);

let keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('click', addPressedClass));