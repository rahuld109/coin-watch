export const API_BASE_URL = process.env.GECKO_API_URL;

export const ENDPOINTS = {
  GLOBAL: API_BASE_URL + '/global',
  COINS: {
    MARKET: API_BASE_URL + '/coins/markets',
    CATEGORIES: API_BASE_URL + '/coins/categories',
  },
  EXCHANGES: API_BASE_URL + '/exchanges',
};

export const NEXT_REVALIDATE_TIME = 300;
