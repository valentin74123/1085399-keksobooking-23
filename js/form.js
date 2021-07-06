import {statusPage, formDisabled, formActive, closeModalWindow} from './util.js';
import {removeMap, resetMap} from './map.js';
import {sendData} from './api.js';
import {priceValue} from './form-inputs.js';

const mapFilters = document.querySelector('.map__filters');
const addForm = document.querySelector('.ad-form');

if(statusPage.load === false) {
  formDisabled(mapFilters, 'map__filters--disabled');
  formDisabled(addForm, 'ad-form--disabled');
  removeMap();
} else {
  formActive(mapFilters, 'map__filters--disabled');
  formActive(addForm, 'ad-form--disabled');
}

const resetPage = () => {
  addForm.reset();
  resetMap();
  priceValue('1000', 1000);
};

const resetButton = document.querySelector('.ad-form__reset');
resetButton.addEventListener('click', () => {
  resetPage();
});


const modalWindowFormAccept = function () {
  const success = document.querySelector('#success');

  const clone = success.content.cloneNode(true);

  document.body.appendChild(clone);

  closeModalWindow('.success');

  resetPage();
};

const modalWindowFormError = function () {
  const error = document.querySelector('#error');

  const clone = error.content.cloneNode(true);

  document.body.appendChild(clone);

  const errorButton = document.querySelector('.error__button');

  errorButton.addEventListener('click', () => {
    document.querySelector('.error').remove();
  }, {once: true});

  closeModalWindow('.error');
};


const formSubmit = (onSuccess, onFail) => {
  addForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(),
      () => onFail(),
      new FormData(evt.target),
    );
  });
};

formSubmit(modalWindowFormAccept, modalWindowFormError);
