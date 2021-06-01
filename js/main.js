const randomizeNumber = (firstNumber, secondNumber) => {
  if(firstNumber >= secondNumber) {
    return 'Второе число должно быть больше первого';
  }

  if(firstNumber < 0 || secondNumber < 0) {
    return 'Числа должны быть больше 0';
  }

  return Math.round(firstNumber + Math.random() * (secondNumber - firstNumber));
};

randomizeNumber(2, 4);

const randomizNumberWithFloatingPoint = (firstNumber, secondNumber, floatPoint) => {
  if(firstNumber >= secondNumber) {
    return 'Второе число должно быть больше первого';
  }

  if(firstNumber < 0 || secondNumber < 0) {
    return 'Числа должны быть больше 0';
  }

  return (firstNumber + Math.random() * (secondNumber - firstNumber)).toFixed(floatPoint);
};

randomizNumberWithFloatingPoint(3.2, 3.4, 2);
