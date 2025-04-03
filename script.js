// let string = "";
// let buttons = document.querySelectorAll('.button');
// Array.from(buttons).forEach((button)=>{
//     button.addEventListener('click',(e)=>{
//         if(e.target.innerHTML == '='){
//             string = eval(string);
//             document.querySelector('input').value = string;
//         }
//         else if(e.target.innerHTML == 'C'){
//             string = "";
//             document.querySelector('input').value = string;
//         }
//         else{
//         console.log(e.target)
//         string = string + e.target.innerHTML;
//         document.querySelector('input').value = string;
//         }
//     })

// })

const inputField = document.querySelector('.input');
const buttons = document.querySelectorAll('.button');
let currentInput = '';
let previousInput = '';
let operation = undefined;
let memory = 0;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const buttonText = button.innerText;

    if (buttonText === 'C') {
      currentInput = '';
      previousInput = '';
      operation = undefined;
      inputField.value = '';
      return;
    }

    if (buttonText === '=') {
      if (operation === undefined || currentInput === '') return;

      previousInput = parseFloat(previousInput);
      currentInput = parseFloat(currentInput);

      switch (operation) {
        case '+':
          currentInput = previousInput + currentInput;
          break;
        case '-':
          currentInput = previousInput - currentInput;
          break;
        case '×':
          currentInput = previousInput * currentInput;
          break;
        case '÷':
          if (currentInput === 0) {
            currentInput = 'Error';
          } else {
            currentInput = previousInput / currentInput;
          }
          break;
        case '%':
          currentInput = previousInput % currentInput;
          break;
      }

      inputField.value = currentInput;
      previousInput = '';
      operation = undefined;
    }

    else if (['+', '-', '×', '÷', '%'].includes(buttonText)) {
      if (currentInput === '') return;

      if (previousInput !== '') {
        inputField.value = previousInput + ' ' + operation + ' ' + currentInput;
      }

      operation = buttonText;
      previousInput = currentInput;
      currentInput = '';
    }

    else if (buttonText === 'M+') {
      memory += parseFloat(currentInput);
      currentInput = '';
      inputField.value = memory;
    }

    else if (buttonText === 'M-') {
      memory -= parseFloat(currentInput);
      currentInput = '';
      inputField.value = memory;
    }

    else if (buttonText === '.') {
      if (!currentInput.includes('.')) {
        currentInput += '.';
        inputField.value = currentInput;
      }
    }

    else {
      currentInput += buttonText;
      inputField.value = currentInput;
    }
  });
});
