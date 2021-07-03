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

const formDisabled = (form, disabledClass) => {
  for (let id = 0; id < form.length; ++id) {
    form[id].setAttribute('disabled', 'disabled');
  }

  form.classList.add(disabledClass);
};

const formActive = (form, disabledClass) => {
  for (let id = 0; id < form.length; ++id) {
    form[id].removeAttribute('disabled');
  }

  form.classList.remove(disabledClass);
};

export {randomizeNumber, randomizNumberWithFloatingPoint, formDisabled, formActive};
