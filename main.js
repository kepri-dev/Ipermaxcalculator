let isNewCalculus = false;
let previousResult = "";
let memory = 0;

function ipermax(event) {
  event.preventDefault(); // Prevents the default action of the button (like form submission).
  const clickedButton = event.target; // References the clicked button.
  const buttonValue = clickedButton.innerText || clickedButton.textContent; // Get the text inside the clicked button.
  const output = document.getElementById("result"); // Target the result textarea.
  const theButton = document.getElementById("button_clicked"); // Target the last clicked button textarea.

  if (buttonValue == "=") {
    output.value = eval(output.value); // Evaluate the mathematical expression in the result textarea.
    theButton.value = output.value; // Update the last clicked button textarea with the result.
    previousResult = output.value; // Store the current result for future use.
    isNewCalculus = true;
  } else if (buttonValue == "AC") {
    output.value = ""; // Clear the result textarea.
    theButton.value = ""; // Clear the last clicked button textarea.
  } else if (buttonValue == "M+") {
    memory += output.value; // store the current result for future use,
  } else if (buttonValue == "M-") {
    memory -= output.value; // store the current result, multiplied by -1, for future use,
  } else if (buttonValue == "MR") {
    output.value = output.value + memory.toString(); // recall the last stored value,
  } else if (buttonValue == "MC") {
    memory = 0; // delete stored value from the memory.
  } else {
    if (isNewCalculus) {
      // If a result was just computed.
      output.value = thisIsANewCalculus(buttonValue);
      isNewCalculus = false; // Reset the new calculation flag.
    } else {
      output.value += buttonValue; // Append the clicked value to the current expression.
    }
    theButton.value = buttonValue; // Update the last clicked button textarea with the clicked value.
  }
}

function thisIsANewCalculus(buttonValue) {
  if (
    buttonValue == "+" ||
    buttonValue == "-" ||
    buttonValue == "*" ||
    buttonValue == "/"
  ) {
    return previousResult + buttonValue; // Use the previous result and append the clicked operation.
  } else {
    return buttonValue; // Otherwise, start a new calculation with the clicked number.
  }
}
