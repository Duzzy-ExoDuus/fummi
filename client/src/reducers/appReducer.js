import { LOGOUT_USER } from '../actions/types';

export default function(state, action) {
  if (action.type === LOGOUT_USER) {
    state = undefined
  } 
}