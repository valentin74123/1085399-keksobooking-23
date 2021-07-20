const ALERT_SHOW_TIME = 5000;

const statusPage = {
  load: false,
};

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

const closeModalWindow = (element, button) => {
  const removeElement = () => {
    element.remove();
  };

  const clickEvent = () => {
    removeElement();

    document.removeEventListener('click', clickEvent);
  };

  const escEvent = (evt) => {
    if (evt.key === 'Escape') {
      removeElement();

      document.removeEventListener('click', escEvent);
    }
  };

  if (button) {
    const closeButton = () => {
      removeElement();

      button.removeEventListener('click', closeButton);
      document.removeEventListener('click', clickEvent);
    };

    button.addEventListener('click', closeButton);
  }

  document.addEventListener('click', clickEvent);
  document.addEventListener('keydown', escEvent);
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const getChekedInputValues = (selector) => {
  const chekedValues = [];

  const filterFeatures = document.querySelectorAll(selector);

  filterFeatures.forEach((features) => chekedValues.push(features.value));

  return chekedValues;
};

export {randomizeNumber, randomizNumberWithFloatingPoint, statusPage, formDisabled, formActive, closeModalWindow, showAlert, debounce, getChekedInputValues};
