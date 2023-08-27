
const input = document.getElementById("text");
const buttons = document.querySelectorAll(
  ".grid-item, .grid-item1, .grid-item2"
);

buttons.forEach((button) => {
  button.addEventListener("click", handleButtonClick); // event lisner for each btn 
});

function handleButtonClick(event) {
  const clickedButton = event.target; // getting each btn clicked 
  const buttonText = clickedButton.textContent; // getting each text value of btn

  if (buttonText === "C") {
    input.value = "";  // clear all inputs 
  } else if (buttonText === "=") {
    try {
      const result = calculate(input.value);  // calculating function passed
      input.value = result; // displaying results 
    } catch (error) {
      input.value = "Error"; // catching errrors 
    }
  } else {
    input.value += buttonText; // appending clicked btn text
  }
}

function calculate(expression) {
  // Define operators and their corresponding functions
  const operators = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "x": (a, b) => a * b,
    "/": (a, b) => a / b,
  };
  //The match() method returns an array of strings that match the pattern. If no matches are found, it returns null.
  const tokens = expression.match(/[+\-*/x]|\d+\.\d+|\d+/g);
  console.log(tokens)
  const numbers = []; // store numbers.
  const ops = []; // store operators.

  for (const token of tokens) {
    if (token.trim() === "") continue; // skipping empty tokens

    if (operators[token]) {
      while (
        ops.length > 0 &&
        operators[ops[ops.length - 1]] &&
        hasPrecedence(token, ops[ops.length - 1])
      ) {
        const operator = ops.pop();
        const b = numbers.pop();
        const a = numbers.pop();
        numbers.push(operators[operator](a, b));
      }
      ops.push(token);
    } else {
      numbers.push(parseFloat(token));
    }
  }

  while (ops.length > 0) {
    const operator = ops.pop();
    const b = numbers.pop();
    const a = numbers.pop();
    numbers.push(operators[operator](a, b));
  }

  return numbers[0];
}

function hasPrecedence(op1, op2) {
  const precedence = {
    "+": 1,
    "-": 1,
    "x": 2,
    "/": 2,
  };
  return precedence[op1] <= precedence[op2];
}
