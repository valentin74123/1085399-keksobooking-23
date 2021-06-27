import {createOffers} from './data.js';

const cardOffersElement = document.querySelector('#map-canvas');
const cardOffers = createOffers();

const renderCard = ({author: {avatar}, offer: {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos}}) => {
  const cardOffersTemplate = document.querySelector('#card').content.querySelector('.popup');

  const offerElement = cardOffersTemplate.cloneNode(true);

  offerElement.querySelector('.popup__title').textContent = title;
  offerElement.querySelector('.popup__text--address').textContent = address;
  offerElement.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
  offerElement.querySelector('.popup__type').textContent = type;
  offerElement.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей`;
  offerElement.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;

  const featuresListElement = offerElement.querySelector('.popup__features');
  const modifiers = features.map((feature) => `popup__feature--${feature}`);
  featuresListElement.querySelectorAll('.popup__feature').forEach((item) => {
    const modifier = item.classList[1];

    if(!modifiers.includes(modifier)) {
      item.remove();
    }
  });

  offerElement.querySelector('.popup__description').textContent = description;

  const photosListElement = offerElement.querySelector('.popup__photos');
  const photoElement = photosListElement.querySelector('.popup__photo');
  photos.map((src) => {
    const photo = photoElement.cloneNode(true);
    photo.src = src;
    photosListElement.appendChild(photo);
  });
  photoElement.parentNode.removeChild(photoElement);

  offerElement.querySelector('.popup__avatar').src = avatar;
  cardOffersElement.appendChild(offerElement);
};

renderCard(cardOffers[0]);
