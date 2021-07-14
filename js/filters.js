import {getChekedInputValues} from './util.js';

const mapFilters = document.querySelector('.map__filters');

const offerType = document.querySelector('#housing-type');
const offerPrice = document.querySelector('#housing-price');
const offerRooms = document.querySelector('#housing-rooms');
const offerGuests = document.querySelector('#housing-guests');

const getOffersRank = ({offer: {type, price, rooms, guests, features}}) => {
  let rank = 0;

  if(type === offerType.value){
    rank += 4;
  }

  if(offerPrice.value !== 'any'){
    if(offerPrice.value === 'low' && price < 10000){
      rank += 3;
    } else if(offerPrice.value === 'high' && price > 50000){
      rank += 3;
    } else if(offerPrice.value === 'middle' && price >= 10000 && price <= 50000){
      rank += 3;
    }
  }

  if(rooms === Number(offerRooms.value)){
    rank += 2;
  }

  if(guests === Number(offerGuests.value)){
    rank += 2;
  }

  if(features){
    getChekedInputValues('.map__checkbox:checked').forEach((feauture) => {
      if(features.includes(feauture)){
        rank += 1;
      }
    });
  }

  return rank;
};

const compareOffers = (offerA, offerB) => {
  const rankA = getOffersRank(offerA);
  const rankB = getOffersRank(offerB);

  return rankB - rankA;
};

const setOffersFilter = (cb) => {
  mapFilters.addEventListener('change', () => {
    cb();
  });
};

export {compareOffers, setOffersFilter};
