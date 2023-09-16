let isNewCalculus = false; // this is the first calculation.
let previousResult = ""; // the result of the previous calculation
let lastChar = ""; // the last character typed into the calculator;
let memory = 0; // the memory is initially empty
let previousCalculations = []; //All of the previous calculations initially as an empty array;

function ipermax(event) {
  event.preventDefault(); // Prevents the default action of the button (like form submission).
  const clickedButton = event.target; // References the clicked button.
  const buttonValue = clickedButton.innerText || clickedButton.textContent; // Get the text inside the clicked button.
  const output = document.getElementById("result"); // Target the result textarea.
  const theButton = document.getElementById("button_clicked"); // Target the last clicked button textarea.
  const popup = document.getElementById("thePopup"); // target the popup.
  if (validation(output, buttonValue)) {
    // call the validation function on 2 arguments being output and buttonValue.
    if (buttonValue == "=") {
      let calculation = output.value + "=" + eval(output.value); // the whole calculation.
      previousCalculations.push(calculation); // Adding the whole calculation to history, pushing more calculations as they come.
      output.value = eval(output.value); // Evaluate the mathematical expression in the result textarea.
      theButton.value = output.value; // Update the last clicked button textarea with the result.
      previousResult = output.value; // Update the result of the very last calculation.
      isNewCalculus = true; // A new calculation is taking place now.
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
    } else if (buttonValue == "H") {
      popup.value = previousCalculations; // show all previous calculations, separated by a new line
      showPopup(); // call the showpopup function to show the popup.
    } else if (buttonValue == "HC") {
      previousCalculations = []; // delete all history from all previous calculations,
      closePopup(); // call the closePopup function to hide the popup.
    } else {
      if (isNewCalculus) {
        // If a result was just computed.
        output.value = thisIsANewCalculus(buttonValue); // call isNewCalculus function.
        isNewCalculus = false; // Reset the new calculation flag.
      } else {
        output.value += buttonValue;
        // Append the clicked value to the current expression.
      }
      theButton.value = buttonValue; // Update the last clicked button textarea with the clicked value.
    }
  }
  lastChar = buttonValue; // after the validation function was called, return the buttonValue as last character.
}

function thisIsANewCalculus(buttonValue) {
  if (isSign(buttonValue)) {
    // if the button value is a sign
    return previousResult + buttonValue; // Use the previous result and append the clicked operation.
  } else {
    return buttonValue; // Otherwise, start a new calculation with the clicked number.
  }
}

function validation(output, buttonValue) {
  if (!isNaN(buttonValue)) {
    // if the button cliked is a number.
    lastChar = buttonValue; // return the value of that button.
    return true;
  }
  if ((isSign(buttonValue) && isSign(lastChar)) || output == "") {
    // if the the button clicked is a sign and the last character was a sign or if there is nothing typed yet.
    return false; // don't return anything.
  }
  lastChar = buttonValue; // else, return last character as the value of the button clicked.
  return true;
}

function isSign(signValue) {
  if (
    signValue == "+" ||
    signValue == "-" ||
    signValue == "*" ||
    signValue == "/"
  ) {
    return true;
  }
  return false;
}

function showPopup() {
  const popup = document.getElementById("thePopup"); // target the main div for the popup
  const calculationsList = document.querySelector(".calculations_history"); // target the <ul> element for the popup

  // Clear existing list items
  calculationsList.innerHTML = "";

  // Loop through previousCalculations and create a new <li> for each calculation
  previousCalculations.forEach((calculation) => {
    const listItem = document.createElement("li");
    listItem.classList.add("previous_calculation");
    listItem.textContent = calculation;
    calculationsList.appendChild(listItem);
  });

  popup.style.display = "block"; // show the popup.
}

document.getElementById("HButton").addEventListener("click", showPopup); // override the fact that the popup is set as display:hidden and show it.

function closePopup() {
  const popup = document.getElementById("thePopup"); // target the main div for the popup
  popup.style.display = "none"; // hide the popup.
}
document.getElementById("HC").addEventListener("click", closePopup); //force the popup to hide.
