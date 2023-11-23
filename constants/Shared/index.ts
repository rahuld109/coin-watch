export const API_BASE_URL = process.env.GECKO_API_URL;

export const ENDPOINTS = {
  GLOBAL: API_BASE_URL + '/global',
  COINS: {
    MARKET: API_BASE_URL + '/coins/markets',
    CATEGORIES: API_BASE_URL + '/coins/categories',
  },
  EXCHANGES: API_BASE_URL + '/exchanges',
  TRENDING: API_BASE_URL + '/search/trending',
};

export const NEXT_REVALIDATE_TIME = 600;
