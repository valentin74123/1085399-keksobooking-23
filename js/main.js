const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const SIMILAR_OFFERS_COUNT = 10;


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

const getRandomArrayElement = (elements) => elements[randomizeNumber(0, elements.length - 1)];

const getRandomAvatar = () => {
  const number = randomizeNumber(1, 10);

  if(number < 10) {
    return `img/avatars/user0${number}.png`;
  } else {
    return `img/avatars/user${number}.png`;
  }
};

const deleteRepetitions = (array) => {
  const result = [];

  for (const string of array) {
    if (!result.includes(string)) {
      result.push(string);
    }
  }

  return result;
};


const createOffer = () => {
  const getRandomOfferLocation = {
    lat: randomizNumberWithFloatingPoint(35.65000, 35.70000, 5),
    lng: randomizNumberWithFloatingPoint(139.70000, 139.80000, 5),
  };

  const getRandomPhotosArray = new Array(randomizeNumber(1, 5)).fill(null).map(() => getRandomArrayElement(PHOTOS));

  const getRandomFeaturesArray = new Array(randomizeNumber(1, 6)).fill(null).map(() => getRandomArrayElement(FEATURES));

  return {
    author: {
      avatar: getRandomAvatar(),
    },
    offer: {
      title: 'заголовок предложения',
      address: `${getRandomOfferLocation.lat}, ${getRandomOfferLocation.lng}`,
      price: randomizeNumber(1, 10000),
      type: getRandomArrayElement(TYPES),
      rooms: randomizeNumber(1, 10),
      guests: randomizeNumber(1, 10),
      checkin: getRandomArrayElement(CHECKIN),
      checkout: getRandomArrayElement(CHECKOUT),
      features: deleteRepetitions(getRandomFeaturesArray),
      description: 'описание помещения',
      photos: getRandomPhotosArray,
    },
    location: {
      lat: getRandomOfferLocation.lat,
      lng: getRandomOfferLocation.lng,
    },
  };
};

const similarOffers = new Array(SIMILAR_OFFERS_COUNT).fill(null).map(() => createOffer());
similarOffers;
