const randomizeNumber = (firstNumber, secondNumber) => {
  const lower = Math.ceil(Math.min(Math.abs(firstNumber), Math.abs(secondNumber)));
  const upper = Math.floor(Math.max(Math.abs(firstNumber), Math.abs(secondNumber)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const randomizNumberWithFloatingPoint = (firstNumber, secondNumber, floatPoint = 1) => {
  const lower = Math.min(Math.abs(firstNumber), Math.abs(secondNumber));
  const upper = Math.max(Math.abs(firstNumber), Math.abs(secondNumber));

  const result = Math.random() * (upper - lower) + lower;

  return result.toFixed(floatPoint);
};

export {randomizeNumber, randomizNumberWithFloatingPoint};
