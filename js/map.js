import {renderCard} from './card.js';
import {getData} from './api.js';
import {statusPage, failLoadData} from './util.js';

const SIMILAR_OFFERS_COUNT = 10;

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
  .setView(TokyoCoords, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },
).addTo(map);


const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
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
    iconSize: [40, 40],
    iconAnchor: [20, 40],
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


getData(
  (offers) => {
    offers.slice(0, SIMILAR_OFFERS_COUNT).forEach((card) => {
      createMarker(card);
    });
  },
  failLoadData,
);


export const resetMap = () => {
  mainPinMarker.setLatLng(TokyoCoords);

  map.setView(TokyoCoords, 13);

  addresCoords(address, TokyoCoords);
};

export const removeMap = () => {
  mainPinMarker.remove();

  markerGroup.clearLayers();

  map.remove();
};
