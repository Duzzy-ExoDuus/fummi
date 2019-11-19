import axios from 'axios';
import { GET_USER, FETCHING_USER } from './types';

export const getUser = accessToken => dispatch => {
  dispatch(setUserLoading());
  axios
    .get('https://api.spotify.com/v1/me', { headers: { 'Authorization': 'Bearer ' + accessToken.token }})
    .then(res => 
      dispatch({
        type: GET_USER,
        payload: res.data
      })
    )
};

export const setUserLoading = () => {
  return {
    type: FETCHING_USER
  }
}
