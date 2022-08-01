let topDisplay = document.querySelector("#screen-top");
let bottomDisplay = document.querySelector("#screen-bottom");
let buttons = document.querySelectorAll(".button");
let currentOperator = null;

function add(a, b) { return a + b; }

function subtract(a, b) { return a - b; }

function multiply(a, b) { return a * b }

function divide(a, b) {return a / b }

function operate(operator, a, b) {
    switch(operator) {
        case "+":
            return add(a, b);
            break;
        case "-":
            return subtract(a, b);
            break;
        case "*":
            return multiply(a, b);
            break;
        case "/":
            return divide(a, b);
    }
}

for (let button of buttons) {
    button.addEventListener("click", () => {
        let id = button.getAttribute("id");
        let buttonType = button.getAttribute("type");
        switch (buttonType) {
            case "number":
                printNumber(id);
                break;
            case "operator":
                migrateValues(id);
                break;
            case "equals":
                displayOperation();
                break;
            case "C":
                clearData();
                break;
            case "CE":
                correctError();
        }
    })
}

function printNumber(n) {
    if (n === "dec") {
        bottomDisplay.textContent = bottomDisplay.textContent + 0.0; //TODO: return float
    } else {
        bottomDisplay.textContent = (bottomDisplay.textContent * 10) + +n;
    }
}

function migrateValues(operator) {
    if (currentOperator && bottomDisplay.textContent === "0") {
        replaceOperator(operator);
        return;
    } else if (currentOperator) {
        displayOperation();
    }
    currentOperator = operator;
    topDisplay.textContent = `${bottomDisplay.textContent} ${currentOperator}`;
    bottomDisplay.textContent = 0;
}

function replaceOperator(operator) {
    currentOperator = operator;
    topDisplay.textContent = topDisplay.textContent.replace(/[\*-\/\+]/, operator);
}

function displayOperation() {
    topDisplay.textContent += ` ${bottomDisplay.textContent}`;
    let [num1, op, num2] = topDisplay.textContent.split(" ");
    bottomDisplay.textContent =
        Math.round(operate(currentOperator, +num1, +num2) * 10000000) / 10000000;
    topDisplay.textContent += " =";
    currentOperator = null;
}

function clearData() {
    currentOperator = null;
    topDisplay.textContent = null;
    bottomDisplay.textContent = 0;
}

function correctError() {
    bottomDisplay.textContent = 0;
}
