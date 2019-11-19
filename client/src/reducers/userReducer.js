import { GET_USER, FETCHING_USER } from '../actions/types';

const initialState = { 
  user: {},
  loading: false
}

export default function(state = initialState, action) {
  switch( action.type ) {
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    case FETCHING_USER:
      return {...state,loading: true};
    default:
      return state;
  }
}