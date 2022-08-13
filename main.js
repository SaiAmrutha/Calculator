const display1El = document.querySelector(".display-1"); //displays element 1
const display2El = document.querySelector(".display-2");
const tempResultEl = document.querySelector(".temp-display");
const numbersEl = document.querySelectorAll(".number");
const operationEl = document.querySelectorAll(".operation");
const equalEl = document.querySelector(".equal");
const clearAllEl = document.querySelector(".all-clear");
const clearLastEl = document.querySelector(".last-entity-clear");

let dispNum1 = "";
let dispNum2 = "";
let result = null;
let lastOperation = "";
let haveDot = false;

numbersEl.forEach((number) => {
  number.addEventListener("click", (e) => {
    // checking if we already have a dot in our number or not
    // if we don't have a dot then we let it to have a dot or else we return simply
    if (e.target.innerText === "." && !haveDot) {
      haveDot = true; // this makes sure that there is dot only once in one number
    } else if (e.target.innerText === "." && haveDot) {
      return;
    }
    dispNum2 += e.target.innerText; //whenever we click a number it will be displayed instead of 0
    display2El.innerText = dispNum2; // this line helps us in showing that number
  });
});

operationEl.forEach((operation) => {
  operation.addEventListener("click", (e) => {
    if (!dispNum2) return; // checking if display 2 is present or not
    haveDot = false; // this helps us to add dot to the other numbers
    const operationName = e.target.innerText;
    if (dispNum1 && dispNum2 && lastOperation) {
      mathOperation();
    } else {
      result = parseFloat(dispNum2); // we parse a string here and it gets converted into a number
    }
    clearVar(operationName);
    lastOperation = operationName;
    console.log(result);
  });
});

function clearVar(name = "") {
  dispNum1 += dispNum2 + " " + name + " ";
  display1El.innerText = dispNum1; // updating the number in display 1
  // to clear display number 2
  display2El.innerText = ""; // this will update display 2
  dispNum2 = ""; // this is used for storing display number 2
  tempResultEl.innerText = result; // shows the temporary result
}

function mathOperation() {
  if (lastOperation === "+") {
    result = parseFloat(result) + parseFloat(dispNum2);
  } else if (lastOperation === "-") {
    result = parseFloat(result) - parseFloat(dispNum2);
  } else if (lastOperation === "X") {
    result = parseFloat(result) * parseFloat(dispNum2);
  } else if (lastOperation === "/") {
    result = parseFloat(result) / parseFloat(dispNum2);
  } else if (lastOperation === "%") {
    result = parseFloat(result) % parseFloat(dispNum2);
  }
}

equalEl.addEventListener("click", (e) => {
  if (!dispNum1 || !dispNum2) return;
  haveDot = false;
  mathOperation();
  clearVar();
  display2El.innerText = result;
  tempResultEl.innerText = "";
  dispNum2 = result;
  dispNum1 = "";
});

clearAllEl.addEventListener("click", (e) => {
  display1El.innerText = "0";
  display2El.innerText = "0";
  dispNum1 = "";
  dispNum2 = "";
  result = "";
  tempResultEl.innerText = "0";
});

clearLastEl.addEventListener("click", (e) => {
  display2El.innerText = "";
  dispNum2 = "";
});

window.addEventListener("keydown", (e) => {
  if (
    e.key === "0" ||
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9" ||
    e.key === "."
  ) {
    clickButtonEl(e.key);
  } else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "%") {
    clickOperation(e.key);
  } else if (e.key === "*") {
    clickOperation("X");
  } else if (e.key == "Enter" || e.key === "=") {
    clickEqual();
  }
});

function clickButtonEl(key) {
  numbersEl.forEach((button) => {
    if (button.innerText === key) {
      button.click();
    }
  });
}

function clickOperation(key) {
  operationEl.forEach((button) => {
    if (button.innerText === key) {
      button.click();
    }
  });
}

function clickEqual() {
  equalEl.click();
}
