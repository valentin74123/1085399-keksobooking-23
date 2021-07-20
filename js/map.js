import {renderCard} from './card.js';
import {getData} from './api.js';
import {statusPage, showAlert, formDisabled, debounce} from './util.js';
import {compareOffers, setOffersFilter} from './filters.js';

const MAP_ZOOM = 13;

const MAIN_PIN_SIZE = [52, 52];
const MAIN_PIN_ANCHOR = [26, 52];
const PIN_SIZE = [40, 40];
const PIN_ANCHOR = [20, 40];

const SIMILAR_OFFERS_COUNT = 10;

const TIMEOUT_DELAY = 500;

const FLOAT_POINT = 5;

const TokyoCoords = {
  lat: 35.68381,
  lng: 139.74741,
};

const address = document.querySelector('#address');
const addresCoords = (addressInput, coords) => {
  addressInput.value = `${coords.lat.toFixed(FLOAT_POINT)}, ${coords.lng.toFixed(FLOAT_POINT)}`;
};


const map = L.map('map-canvas')
  .on('load', () => {
    addresCoords(address, TokyoCoords);
    statusPage.load = true;
  })
  .setView(TokyoCoords, MAP_ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },
).addTo(map);


const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: MAIN_PIN_SIZE,
  iconAnchor: MAIN_PIN_ANCHOR,
});

const mainPinMarker = L.marker(
  TokyoCoords,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  const coords = evt.target.getLatLng();
  addresCoords(address, coords);
});


const markerGroup = L.layerGroup().addTo(map);

const createMarker = (card) => {
  const {location: {lat, lng}} = card;

  const icon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: PIN_SIZE,
    iconAnchor: PIN_ANCHOR,
  });

  const marker = L.marker({
    lat,
    lng,
  },
  {
    icon,
  },
  );

  marker
    .addTo(markerGroup)
    .bindPopup(
      renderCard(card),
      {
        keepInView: true,
      },
    );
};


const mapFilters = document.querySelector('.map__filters');
const failLoadData = () => {
  showAlert('Ошибка загрузки данных с сервера');
  formDisabled(mapFilters, 'map__filters--disabled');
};

const renderOffersList = (offers) => {
  map.closePopup();
  markerGroup.clearLayers();
  offers.slice().sort(compareOffers).slice(0, SIMILAR_OFFERS_COUNT).forEach((card) => {
    createMarker(card);
  });
};

getData(
  (offers) => {
    renderOffersList(offers);
    setOffersFilter(debounce(() => renderOffersList(offers), TIMEOUT_DELAY));
  },
  failLoadData,
);


const resetMap = () => {
  mainPinMarker.setLatLng(TokyoCoords);

  map.setView(TokyoCoords, MAP_ZOOM);

  addresCoords(address, TokyoCoords);

  getData(
    (offers) => {
      renderOffersList(offers);
    },
    failLoadData,
  );
};

const removeMap = () => {
  mainPinMarker.remove();

  markerGroup.clearLayers();

  map.remove();
};

export {resetMap, removeMap};
