const BUNGALOW_MIN_PRICE_VALUE = 0;
const FLAT_MIN_PRICE_VALUE = 1000;
const HOTEL_MIN_PRICE_VALUE = 3000;
const HOUSE_MIN_PRICE_VALUE = 5000;
const PALACE_MIN_PRICE_VALUE = 10000;

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
    priceValue(String(BUNGALOW_MIN_PRICE_VALUE), BUNGALOW_MIN_PRICE_VALUE);
  } else if (typeOfHousingOption === 'flat') {
    priceValue(String(FLAT_MIN_PRICE_VALUE), FLAT_MIN_PRICE_VALUE);
  } else if (typeOfHousingOption === 'hotel') {
    priceValue(String(HOTEL_MIN_PRICE_VALUE), HOTEL_MIN_PRICE_VALUE);
  } else if (typeOfHousingOption === 'house') {
    priceValue(String(HOUSE_MIN_PRICE_VALUE), HOUSE_MIN_PRICE_VALUE);
  } else if (typeOfHousingOption === 'palace') {
    priceValue(String(PALACE_MIN_PRICE_VALUE), PALACE_MIN_PRICE_VALUE);
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
