import {statusPage, formDisabled, formActive, closeModalWindow} from './util.js';
import {removeMap, resetMap} from './map.js';
import {sendData} from './api.js';
import {priceValue} from './form-inputs.js';
import {resetImages} from './images-preview.js';

const DEFAULT_PRICE_VALUE = 1000;

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
  mapFilters.reset();
  resetMap();
  priceValue(String(DEFAULT_PRICE_VALUE), DEFAULT_PRICE_VALUE);
  resetImages();
};

const resetButton = document.querySelector('.ad-form__reset');
resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetPage();
});


const modalWindowFormAccept = () => {
  const success = document.querySelector('#success');

  const clone = success.content.cloneNode(true);

  document.body.appendChild(clone);

  const successElement = document.querySelector('.success');
  closeModalWindow(successElement);

  resetPage();
};

const modalWindowFormError = () => {
  const error = document.querySelector('#error');

  const clone = error.content.cloneNode(true);

  document.body.appendChild(clone);

  const errorButton = document.querySelector('.error__button');

  const errorElement = document.querySelector('.error');
  closeModalWindow(errorElement, errorButton);
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
