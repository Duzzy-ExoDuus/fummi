import axios from 'axios'
import { FETCH_PLAYLISTS, LOADING_PLAYLISTS } from './types';

export const fetchPlaylists = accessToken => dispatch => {
  dispatch(setPlaylistsLoading());
  const headers = { headers: { 'Authorization': 'Bearer ' + accessToken }};
  // fetch user information
  axios
    .get('https://api.spotify.com/v1/me/playlists', headers)
    .then(res => 
      dispatch({
        type: FETCH_PLAYLISTS,
        payload: res.data
      })
    )
};

export const setPlaylistsLoading = () => {
  return {
    type: LOADING_PLAYLISTS
  }
};
