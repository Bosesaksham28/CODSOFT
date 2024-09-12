// Select the display and buttons
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const clearButton = document.getElementById('clear');
const equalsButton = document.getElementById('equals');

let currentInput = ''; // To store the current input
let operator = '';     // To store the operator
let firstOperand = ''; // To store the first operand
let secondOperand = ''; // To store the second operand
let result = ''; // To store the result

// Add event listeners to all buttons
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.getAttribute('data-value');
        
        // Check if the button clicked is an operator
        if (isOperator(value)) {
            if (currentInput === '' && firstOperand === '') {
                // If nothing has been entered, do nothing
                return;
            }
            if (operator === '' && currentInput !== '') {
                // Store the first operand and operator
                firstOperand = currentInput;
                operator = value;
                currentInput = '';
            } else if (operator !== '' && currentInput !== '') {
                // If operator is already pressed, calculate result
                secondOperand = currentInput;
                result = calculate(firstOperand, secondOperand, operator);
                display.value = result;
                firstOperand = result;
                currentInput = '';
                operator = value; // Update operator
            }
        } else if (value === '.') {
            // Prevent multiple dots
            if (!currentInput.includes('.')) {
                currentInput += value;
                display.value = currentInput;
            }
        } else if (value !== '=' && value !== 'C') {
            // Update the current input
            currentInput += value;
            display.value = currentInput;
        }
    });
});

// Clear button functionality
clearButton.addEventListener('click', () => {
    currentInput = '';
    firstOperand = '';
    secondOperand = '';
    operator = '';
    result = '';
    display.value = '0';
});

// Equals button functionality
equalsButton.addEventListener('click', () => {
    if (currentInput !== '' && firstOperand !== '' && operator !== '') {
        secondOperand = currentInput;
        result = calculate(firstOperand, secondOperand, operator);
        display.value = result;
        currentInput = result;
        operator = '';
        firstOperand = '';
        secondOperand = '';
    }
});

// Helper function to check if the input is an operator
function isOperator(value) {
    return ['+', '-', '*', '/'].includes(value);
}

// Helper function to calculate the result based on operator
function calculate(first, second, operator) {
    let num1 = parseFloat(first);
    let num2 = parseFloat(second);

    switch (operator) {
        case '+':
            return (num1 + num2).toString();
        case '-':
            return (num1 - num2).toString();
        case '*':
            return (num1 * num2).toString();
        case '/':
            return (num2 !== 0) ? (num1 / num2).toString() : 'Error'; // Avoid division by zero
        default:
            return '';
    }
}
