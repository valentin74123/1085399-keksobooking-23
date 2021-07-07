// Заголовок объявления
const title = document.querySelector('#title');

const changeTitle = () => title.reportValidity();

title.addEventListener('change', () => changeTitle());

// Тип жилья и цена за ночь
const typeOfHousing = document.querySelector('#type');
const pricePerNight = document.querySelector('#price');

const priceValue = function (placeholder, min) {
  pricePerNight.placeholder = placeholder;
  pricePerNight.min = min;
};

pricePerNight.addEventListener('change', () => pricePerNight.reportValidity());

const changePricePerNight = () => {
  const typeOfHousingOption = typeOfHousing.options[typeOfHousing.selectedIndex].value;

  if (typeOfHousingOption === 'bungalow') {
    priceValue('0', 0);
  } else if (typeOfHousingOption === 'flat') {
    priceValue('1000', 1000);
  } else if (typeOfHousingOption === 'hotel') {
    priceValue('3000', 3000);
  } else if (typeOfHousingOption === 'house') {
    priceValue('5000', 5000);
  } else if (typeOfHousingOption === 'palace') {
    priceValue('10000', 10000);
  }

  pricePerNight.reportValidity();
};

typeOfHousing.addEventListener('change', () => changePricePerNight());


// Время заезда и выезда
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');

const changeTime = (time, value) => time.value = value;

timeIn.addEventListener('change', () => changeTime(timeOut, timeIn.value));
timeOut.addEventListener('change', () => changeTime(timeIn, timeOut.value));


// Количество комнат и количество мест
const roomNumber = document.querySelector('#room_number');
const numberOfSeats = document.querySelector('#capacity');

const countRoomsAndSeats = () => {
  const roomNumberOption = roomNumber.options[roomNumber.selectedIndex].value;
  const numberOfSeatsOption = numberOfSeats.options[numberOfSeats.selectedIndex].value;

  if (numberOfSeatsOption <= roomNumberOption) {
    numberOfSeats.setCustomValidity('');
  } else {
    numberOfSeats.setCustomValidity('Количество мест должно быть равно или меньше количества комнат!');
  }

  numberOfSeats.reportValidity();

  if ((numberOfSeatsOption !== '0' && roomNumberOption === '100') || (numberOfSeatsOption === '0' && roomNumberOption !== '100')) {
    roomNumber.setCustomValidity('100 комнат не для гостей!');
  } else {
    roomNumber.setCustomValidity('');
  }

  roomNumber.reportValidity();
};

roomNumber.addEventListener('change', () => countRoomsAndSeats());
numberOfSeats.addEventListener('change', () => countRoomsAndSeats());

export {priceValue};
