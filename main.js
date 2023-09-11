let isNewCalculus = false;
let previousResult = "";

function ipermax(event) {
  event.preventDefault();
  const clickedButton = event.target;
  const buttonValue = clickedButton.innerText || clickedButton.textContent;
  const output = document.getElementById("result");
  const theButton = document.getElementById("button_clicked");

  if (buttonValue == "=") {
    output.value = eval(output.value);
    theButton.value = output.value;
    previousResult = output.value;
    isNewCalculus = true;
  } else if (buttonValue == "AC") {
    output.value = "";
    theButton.value = "";
  } else {
    if (isNewCalculus) {
      if (
        buttonValue == "+" ||
        buttonValue == "-" ||
        buttonValue == "*" ||
        buttonValue == "/"
      ) {
        output.value = previousResult + buttonValue;
      } else {
        output.value = buttonValue;
      }
      isNewCalculus = false;
    } else {
      output.value += buttonValue;
    }
    theButton.value = buttonValue;
  }
}
