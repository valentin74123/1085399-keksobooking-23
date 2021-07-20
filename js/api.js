const API = 'https://23.javascript.pages.academy/';

const getData = (onSuccess, onFail) => {
  fetch(`${API}keksobooking/data`)
    .then((response) => response.json())
    .then((data) => onSuccess(data))
    .catch(() => onFail());
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    `${API}keksobooking`,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      response.ok ? onSuccess() : onFail();
    })
    .catch(() => onFail());
};

export {getData, sendData};
