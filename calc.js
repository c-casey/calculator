let topDisplay = document.querySelector("#screen-top");
let bottomDisplay = document.querySelector("#screen-bottom");
let buttons = document.querySelectorAll(".button");
let currentOperator = null;
let errorFlag = 0;

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

//TODO: convert switch statement to external callback function
//(NOTE: OR switch to assign only the relevant function to each button?)
for (let button of buttons) {
    button.addEventListener("click", () => {
        let id = button.getAttribute("id");
        let buttonType = button.getAttribute("type");
        switch (buttonType) {
            case "number":
                printNumber(id);
                break;
            case "decimal":
                insertDecimal();
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
        };
    })
}

function printNumber(n) {
    if (errorFlag) return;
    (bottomDisplay.textContent == 0) ? bottomDisplay.textContent = n
    : bottomDisplay.textContent += n;
}

function migrateValues(operator) {
    if (errorFlag) return;
    else if (currentOperator && bottomDisplay.textContent === "0") {
        replaceOperator(operator);
        return;
    } else if (currentOperator) {
        displayOperation();
    };
    currentOperator = operator;
    topDisplay.textContent = `${bottomDisplay.textContent} ${currentOperator}`;
    bottomDisplay.textContent = 0;
}

function replaceOperator(operator) {
    currentOperator = operator;
    topDisplay.textContent = topDisplay.textContent.replace(/[\*-\/\+]/, operator);
}

function displayOperation() {
    if (errorFlag) return;
    else if (!currentOperator) {
        topDisplay.textContent = `${bottomDisplay.textContent} =`;
        return;
    };
    topDisplay.textContent += ` ${bottomDisplay.textContent}`;
    let [num1, op, num2] = topDisplay.textContent.split(" ");
    if (op === "/" && num2 === "0") {
        topDisplay.textContent = "YOU'VE DOOMED US ALL";
        bottomDisplay.textContent = "ERROR: DIVISION BY ZERO";
        errorFlag = 1;
        return;
    }
    bottomDisplay.textContent =
        Math.round(operate(currentOperator, +num1, +num2) * 10000000) / 10000000;
    topDisplay.textContent += " =";
    currentOperator = null;
}

function clearData() {
    currentOperator = null;
    topDisplay.textContent = null;
    bottomDisplay.textContent = 0;
    errorFlag = 0;
}

function correctError() {
    if (errorFlag) {
        printErrorDialogue(errorFlag);
    } else {
        bottomDisplay.textContent = 0;
    };
}

function insertDecimal() {
    if (errorFlag) return;
    bottomDisplay.textContent += ".";
}

function printErrorDialogue(flag) {
    errorFlag++;
    switch (errorFlag) {
        case 2:
            topDisplay.textContent = "IT'S TOO LATE FOR THAT NOW";
            bottomDisplay.textContent = "OWN YOUR MISTAKES";
            break;
        case 3:
            topDisplay.textContent = "SOME THINGS YOU CAN'T UNDO";
            bottomDisplay.textContent = "REPENT AND BE CHANGED";
            break;
        case 4:
            topDisplay.textContent = "QUIT WHILE YOU'RE AHEAD";
            bottomDisplay.textContent = "DON'T BE FOOLISH";
            break;
        case 5:
            topDisplay.textContent = "QUI% WHILE Y%U'RE AHE^D";
            bottomDisplay.textContent = "DON'T #E FOOLISH";
            break;
        case 6:
            topDisplay.textContent = "$UI% W*ILE Y%U'RE AHE^D";
            bottomDisplay.textContent = "DO^'T #E FO$LIS%";
            break; //TODO: implement puzzle type thing, TIS-100 style
    };
}
