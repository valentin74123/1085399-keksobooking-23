import {createOffers} from './data.js';
import {renderCard} from './card.js';

const FLOAT_POINT = 5;

const TokyoCoords = {
  lat: 35.68381,
  lng: 139.74741,
};

export const statusPage = {
  load: false,
};

const addresCoords = (coords) => {
  const address = document.querySelector('#address');
  address.value = `${coords.lat.toFixed(FLOAT_POINT)}, ${coords.lng.toFixed(FLOAT_POINT)}`;
};


const map = L.map('map-canvas')
  .on('load', () => {
    addresCoords(TokyoCoords);
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
  addresCoords(coords);
});

const cardOffers = createOffers();

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

cardOffers.forEach((card) => {
  createMarker(card);
});


export const resetMap = () => {
  mainPinMarker.setLatLng(TokyoCoords);

  map.setView(TokyoCoords, 13);
};

export const removeMap = () => {
  mainPinMarker.remove();

  markerGroup.clearLayers();

  map.remove();
};
