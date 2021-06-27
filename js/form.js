const mapFilters = document.querySelector('.map__filters');
const addForm = document.querySelector('.ad-form');

const formDisabled = (form, disabledClass) => {
  for (let id = 0; id < form.length; ++id) {
    form[id].setAttribute('disabled', 'disabled');
  }

  form.classList.add(disabledClass);
};

formDisabled(mapFilters, 'map__filters--disabled');
formDisabled(addForm, 'ad-form--disabled');

const formActive = (form, disabledClass) => {
  for (let id = 0; id < form.length; ++id) {
    form[id].removeAttribute('disabled');
  }

  form.classList.remove(disabledClass);
};

formActive(mapFilters, 'map__filters--disabled');
formActive(addForm, 'ad-form--disabled');
