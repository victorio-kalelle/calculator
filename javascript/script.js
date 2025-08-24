const displayBox = document.querySelector(".display"),
    displayInput = document.querySelector(".display-input"),
    displayResult = document.querySelector(".display-result"),
    buttons = document.querySelectorAll("button"),
    operators = ["%", "÷", "x", "-", "+"];

let input = "";
    result = "";

// calculator logic
const calculate = btnValue => {
    // =
    if (btnValue === "="){
        const formattedInput = replaceOperators(input);
        try {
            const calculatedValue = eval(formattedInput);
            result = parseFloat(calculatedValue.toFixed(10));
        }
        catch {
            result = "Error";
        }

        displayBox.classList.add("active");
    }

    input += btnValue;
    displayInput.value = input;
    displayResult.value = result;
    displayInput.scrollLeft = displayInput.scrollWidth;
};

const replaceOperators = input => input.replaceAll("÷", "/").replaceAll("x", "*");

// click event listeners to buttons
buttons.forEach(button =>
    button.addEventListener("click", e => calculate(e.target.textContent))
);