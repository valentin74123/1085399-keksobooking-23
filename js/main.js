import {createOffer} from './data.js';

const SIMILAR_OFFERS_COUNT = 10;

const similarOffers = new Array(SIMILAR_OFFERS_COUNT).fill(null).map(() => createOffer());
similarOffers;
