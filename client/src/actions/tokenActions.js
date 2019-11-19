import { STORE_TOKEN } from './types';

export const storeToken = token => {
  return {
    type: STORE_TOKEN,
    payload: token
  };
};
