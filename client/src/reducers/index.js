import tokenReducer from './tokenReducer'
import userReducer from './userReducer'
import playlistReducer from './playlistReducer'
import { combineReducers } from 'redux'

export default combineReducers({
  token: tokenReducer,
  user: userReducer,
  playlists: playlistReducer
});