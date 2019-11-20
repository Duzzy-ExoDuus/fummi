import { FETCH_PLAYLISTS, LOADING_PLAYLISTS } from '../actions/types';

const initialState = { 
  playlists: {},
  loading: false
}

export default function(state = initialState, action) {
  switch( action.type ) {
    case FETCH_PLAYLISTS:
      return {
        ...state,
        playlists: action.payload,
        loading: false
      };
    case LOADING_PLAYLISTS:
      return {...state,loading: true};
    default:
      return state;
  }
}