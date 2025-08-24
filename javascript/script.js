const displayBox = document.querySelector(".display"),
    displayInput = document.querySelector(".display-input"),
    displayResult = document.querySelector(".display-result"),
    buttons = document.querySelectorAll("button"),
    operators = ["%", "÷", "x", "-", "+"];

let input = "";
    result = "", 
    lastCalculation = false;

// calculator logic
const calculate = btnValue => {
    const lastChar = input.slice(-1),
        secondToLastChar = input.slice(-2, -1),
        withoutLastChar = input.slice(0, -1),
        isLastCharOperator = operators.includes(lastChar);

    // =
    if (btnValue === "="){
        if (
            input === "" ||
            lastChar === "." ||
            lastChar === "(" ||
            isLastCharOperator && lastChar !== "%" ||
            lastCalculation
        )return;
        const formattedInput = replaceOperators(input);
        try {
            const calculatedValue = eval(formattedInput);
            result = parseFloat(calculatedValue.toFixed(10));
        }
        catch {
            result = "Error";
        }

        input += btnValue;
        lastCalculation = true;
        displayBox.classList.add("active");
    }
    // AC 
    else if (btnValue === "AC") {
        resetCalculator("");
    }

    else if (btnValue === "") {
        input = withoutLastChar;
    }

    else {
        if (lastCalculation) resetCalculator(btnValue);
        else input += btnValue;
    }

    displayInput.value = input;
    displayResult.value = result;
    displayInput.scrollLeft = displayInput.scrollWidth;
};

const replaceOperators = input => input.replaceAll("÷", "/").replaceAll("x", "*");

const resetCalculator = newInput => {
    input = newInput;
    result = "";
    lastCalculation = false;
    displayBox.classList.remove("active");
}

// click event listeners to buttons
buttons.forEach(button =>
    button.addEventListener("click", e => calculate(e.target.textContent))
);