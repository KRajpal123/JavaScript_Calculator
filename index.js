
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

  console.log("Button Text:", buttonText);
  console.log("Current Input Value:", input.value);

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
  const operators = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
  };

  const tokens = expression.match(/[+\-*/]|\d+\.\d+|\d+/g);
  const numbers = [];
  const ops = [];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.trim() === "") continue;

    if (operators[token]) {
      if (i === 0 || tokens[i - 1] === "(") {
        // Unary minus case
        const number = parseFloat(tokens[i + 1]) * -1;
        numbers.push(number);
        i++; // Skip the next token
      } else {
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
      }
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
    "*": 2,
    "/": 2,
  };
  return precedence[op1] < precedence[op2];
}


const Delete_Elm_OneByone = document.getElementById("delete");

Delete_Elm_OneByone.addEventListener("click", removeElem);

function removeElem() {
  const storeValues = input.value;
  if (storeValues.length > 0) {
    input.value = storeValues.slice(0, -1); // Remove the last character
  }
}
