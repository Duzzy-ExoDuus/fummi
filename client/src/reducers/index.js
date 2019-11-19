import tokenReducer from './tokenReducer'
import userReducer from './userReducer'
import { combineReducers } from 'redux'

export default combineReducers({
  token: tokenReducer,
  user: userReducer
});