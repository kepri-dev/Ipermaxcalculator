let isNewCalculus = false;
let previousResult = "";
let lastChar = "";
let memory = "";
let previousCalculations = [];

function ipermax(event) {
  event.preventDefault();
  const clickedButton = event.target;
  const buttonValue = clickedButton.innerText || clickedButton.textContent;
  const output = document.getElementById("result");
  const theButton = document.getElementById("button_clicked");
  const popup = document.getElementById("thePopup");
  if (validation(output, buttonValue)) {
    if (buttonValue == "=") {
      let calculation = output.value + "=" + eval(output.value);
      previousCalculations.push(calculation);
      popup.value = calculation;
      output.value = eval(output.value).toFixed(2);
      theButton.value = output.value;
      previousResult = output.value;
      isNewCalculus = true;
    } else if (buttonValue == "+/-") {
      toggleSign();
    } else if (buttonValue == "AC") {
      erase();
    } else if (
      buttonValue == "M+" ||
      buttonValue == "M-" ||
      buttonValue == "MR" ||
      buttonValue == "MC"
    ) {
      isMemory(buttonValue);
    } else if (buttonValue == "H") {
      popup.value = previousCalculations;
      showPopup();
    } else if (buttonValue == "HC") {
      previousCalculations = [];
      closePopup();
    } else if (buttonValue == "X") {
      closePopup();
    } else {
      if (isNewCalculus) {
        output.value = thisIsANewCalculus(buttonValue);
        isNewCalculus = false;
      } else {
        output.value += buttonValue;
      }
      theButton.value = buttonValue;
    }
  }
  lastChar = buttonValue;
}

function thisIsANewCalculus(buttonValue) {
  if (isSign(buttonValue)) {
    return previousResult + buttonValue;
  } else {
    return buttonValue;
  }
}

function validation(output, buttonValue) {
  if (
    !isNaN(buttonValue) ||
    (buttonValue === "." && !output.value.includes("."))
  ) {
    lastChar = buttonValue;
    return true;
  }
  if ((isSign(buttonValue) && isSign(lastChar)) || output == "") {
    return false;
  }
  lastChar = buttonValue;
  return true;
}

function erase() {
  const output = document.getElementById("result");
  const theButton = document.getElementById("button_clicked");
  output.value = "";
  theButton.value = "";
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

function toggleSign() {
  const output = document.getElementById("result");
  if (output.value.charAt(0) === "-") {
    output.value = output.value.slice(1);
  } else {
    output.value = "-" + output.value;
  }
}

function isMemory(buttonValue) {
  const output = document.getElementById("result");
  if (buttonValue == "M+") {
    memory += output.value;
  } else if (buttonValue == "M-") {
    memory -= output.value;
  } else if (buttonValue == "MR") {
    output.value = output.value + memory.toString();
  } else if (buttonValue == "MC") {
    memory = "";
    output.value = "";
  }
}

function showPopup() {
  const popup = document.getElementById("thePopup");
  const calculationsList = document.querySelector(".calculations_history");
  calculationsList.innerHTML = "";
  previousCalculations.forEach((calculation) => {
    const listItem = document.createElement("li");
    listItem.classList.add("previous_calculation");
    listItem.textContent = calculation;
    calculationsList.appendChild(listItem);
  });
  popup.style.display = "block";
}

document.getElementById("HButton").addEventListener("click", showPopup);

function closePopup() {
  const popup = document.getElementById("thePopup");
  popup.style.display = "none";
}

document.getElementsByClassName("close").addEventListener("click", closePopup);
