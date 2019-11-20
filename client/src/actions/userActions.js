import axios from 'axios';
import { GET_USER, LOADING_USER } from './types';

export const getUser = accessToken => dispatch => {
  dispatch(setUserLoading());
  const headers = { headers: { 'Authorization': 'Bearer ' + accessToken }};
  // fetch user information
  axios
    .get('https://api.spotify.com/v1/me', headers)
    .then(res => 
      dispatch({
        type: GET_USER,
        payload: res.data
      })
    )
};

export const setUserLoading = () => {
  return {
    type: LOADING_USER
  }
};
