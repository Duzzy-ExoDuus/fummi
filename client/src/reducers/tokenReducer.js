import { STORE_TOKEN } from '../actions/types'

const initialState = { token: null }

export default function(state = initialState, action) {
  switch( action.type ) {
    case STORE_TOKEN:
      return {...state, token: action.payload }
    default:
      return state
  }
}
