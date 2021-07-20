import {getChekedInputValues} from './util.js';

const DEFAULT_RANK_VALUE = 0;
const RANK_TYPE_VALUE = 4;
const RANK_PRICE_VALUE = 3;
const RANK_ROOMS_VALUE = 2;
const RANK_GUESTS_VALUE = 2;
const RANK_FEATURES_VALUE = 1;

const LOW_PRICE_VALUE = 10000;
const HIGH_PRICE_VALUE = 50000;

const mapFilters = document.querySelector('.map__filters');

const offerType = document.querySelector('#housing-type');
const offerPrice = document.querySelector('#housing-price');
const offerRooms = document.querySelector('#housing-rooms');
const offerGuests = document.querySelector('#housing-guests');

const getOffersRank = ({offer: {type, price, rooms, guests, features}}) => {
  let rank = DEFAULT_RANK_VALUE;

  if(type === offerType.value){
    rank += RANK_TYPE_VALUE;
  }

  if(offerPrice.value !== 'any'){
    if(offerPrice.value === 'low' && price < LOW_PRICE_VALUE){
      rank += RANK_PRICE_VALUE;
    } else if(offerPrice.value === 'high' && price > HIGH_PRICE_VALUE){
      rank += RANK_PRICE_VALUE;
    } else if(offerPrice.value === 'middle' && price >= LOW_PRICE_VALUE && price <= HIGH_PRICE_VALUE){
      rank += RANK_PRICE_VALUE;
    }
  }

  if(rooms === Number(offerRooms.value)){
    rank += RANK_ROOMS_VALUE;
  }

  if(guests === Number(offerGuests.value)){
    rank += RANK_GUESTS_VALUE;
  }

  if(features){
    getChekedInputValues('.map__checkbox:checked').forEach((feauture) => {
      if(features.includes(feauture)){
        rank += RANK_FEATURES_VALUE;
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
