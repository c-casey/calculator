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

function handleInput(button) {
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
}

function printNumber(n) {
    if (errorFlag) return;
    else if (topDisplay.textContent.includes("=")) {
        clearData();
    };
    (bottomDisplay.textContent === "0") ? bottomDisplay.textContent = n
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
    topDisplay.textContent = topDisplay.textContent.replace(currentOperator, operator);
    currentOperator = operator;
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
        topDisplay.textContent = "YOU'VE DOOMED US ALL"; //max chars 26
        bottomDisplay.textContent = "ERR: DIVISION BY 0"; //max chars 19
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
    if (errorFlag || bottomDisplay.textContent.includes(".")) return;
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
            bottomDisplay.textContent = "REFORM AND REPENT";
            break;
        case 4:
            topDisplay.textContent = "QUIT WHILE YOU'RE AHEAD";
            bottomDisplay.textContent = "DON'T BE FOOLISH";
            break;
        case 5:
            topDisplay.textContent = "  ,QUI% WHILE Y%U'RE AHE^D";
            bottomDisplay.textContent = "   DON'T #E+FOOLISH";
            break;
        case 6:
            topDisplay.textContent = "  ,$UI^ W*ILE=Y)U'RE AHE%D";
            bottomDisplay.textContent = "   DO^'T %E+FO$LIS*";
            break;
        case 7:
            topDisplay.textContent = "9 ,&UI# W^I!E=Y%U/RE$*HE^D";
            bottomDisplay.textContent = "  ~DO/%T #E FO$(IS%";
            break;
        case 8:
            topDisplay.textContent = "9*,#U)^/W&I@E=Y,+%R-^)HE$D";
            bottomDisplay.textContent = "< ~_O=?T (E+#O&*IS.";
            break;
            //                          PAX-sh $ ENTER AUTHCODE:
        case 9:
            topDisplay.textContent = "9*,AX)s/W$I@N=E, AR-H)HD$D";
            bottomDisplay.textContent = "< ~_ =?  (E # &* S ";
            break;
        case 10:
            topDisplay.textContent = " *,AX-s/ $I@N=ER AU-H)OD$:";
            bottomDisplay.textContent = "  ~  =?  (  # &* S ";
            break;
        case 11:
            topDisplay.textContent = "  ,AX-sh $ EN=ER AU-SCOD$:";
            bottomDisplay.textContent = "     =?     # &    ";
            break;
        case 12:
            topDisplay.textContent = "  ,AX-sh $ ENTER AUTHCODE:";
            bottomDisplay.textContent = "      ?            ";
            break;
        case 13:
            topDisplay.textContent = "  PAX-sh $ ENTER AUTHCODE:";
            bottomDisplay.textContent = "                   ";
            document.querySelector("#screen").style.color = "yellow";
            document.querySelector("#screen").style.textShadow =
                "0 0 4px lightgreen, 0 0 4px lightgreen, 0 0 20px lightgreen";
            break;
    };
}

for (let button of buttons) {
    button.addEventListener("click", function(button) {
        handleInput(button.target);
    });
};

document.addEventListener("keypress", (e) => {
    let key = e.key;
    let buttonMatch = document.querySelector(`.button[data_key~="${key}"]`);
    console.log(buttonMatch);
    if (buttonMatch) {
        handleInput(buttonMatch);
    };
});
