import {formDisabled, formActive} from './util.js';
import {statusPage, removeMap} from './map.js';

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
