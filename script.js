class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement;
      this.currentOperandTextElement = currentOperandTextElement;
      this.clear();
    };
    
    /* Setting the values of the display to empty strings */
    clear() {
      this.currentOperand = '';
      this.previousOperand = '';
      this.operation = undefined;
    };
  
    /* Setting the delete button */
    delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
    };

    /* We use toString() because when we write eleven,
    the App will add 1+1 otherwise, instead of appending them */
    appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) return;
      this.currentOperand = this.currentOperand.toString() + number.toString();
    };
  
    chooseOperation(operation) {
      /* If there is no operand, don't do math */
      if (this.currentOperand === '') return;
      /* Else, do math and get ready for next operation */
      if (this.previousOperand !== '') {
        this.compute();
      };

      /* When we choose operation, we are done typing the number */
      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = '';
    };

    compute() {
      /* Display values + result(computation) */
      let computation;
      const prev = parseFloat(this.previousOperand);
      const current = parseFloat(this.currentOperand);
      /* Breaks computation if some of the values is not a number */
      if (isNaN(prev) || isNaN(current)) return;
      /* Switch case for different operations */
      switch (this.operation) {
        case '+':
          computation = prev + current;
          break;
        case '-':
          computation = prev - current;
          break;
        case '*':
          computation = prev * current;
          break;
        case '÷':
          computation = prev / current;
          break;
      /* Invalid operation */
        default:
          return;
      };
      /* Defining the values after computation */
      this.currentOperand = computation;
      this.operation = undefined;
      this.previousOperand = '';
    };
  
    getDisplayNumber(number) {
      const stringNumber = number.toString();
      /* Split the number into integer and decimal parts for better computation */
      const integerDigits = parseFloat(stringNumber.split('.')[0]);
      const decimalDigits = stringNumber.split('.')[1];
      let integerDisplay;
      /* Check to see if we can format this number */
      if (isNaN(integerDigits)) {
        integerDisplay = '';
      } else {
      /* Maximum fraction digits = 0 doesn't allow second decimal point */
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
      };
      /* Visualization of the output */
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`;
      } else {
        return integerDisplay;
      };
    };
  
    updateDisplay() {
      /* Connecting helper function */
      this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand);
      /* Visualization of the top part of the display */  
      if (this.operation != null) {
        this.previousOperandTextElement.innerText =
          `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
      } 
      /* Clears the operand from previous performed operation */
      else {
        this.previousOperandTextElement.innerText = '';
      };
    };
  };
  
  /* Connect JS to html buttons */
  const numberButtons = document.querySelectorAll('[data-number]');
  const operationButtons = document.querySelectorAll('[data-operation]');
  const equalsButton = document.querySelector('[data-equals]');
  const deleteButton = document.querySelector('[data-delete]');
  const allClearButton = document.querySelector('[data-all-clear]');
  const previousOperandTextElement = document.querySelector('[data-previous-operand]');
  const currentOperandTextElement = document.querySelector('[data-current-operand]');
  
  const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);
  
  /* Add onClick events to each button */
  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText);
      calculator.updateDisplay();
    });
  });
  
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText);
      calculator.updateDisplay();
    }); 
  });
  
  equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
  });
  
  allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
  });
  
  deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
  });