import React from 'react';
import querystring from 'querystring'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { storeToken } from './actions/tokenActions'

import 'bootstrap/dist/css/bootstrap.min.css'

import { CreationPage, Navigation, AboutPage, LoginPage, HomePage } from './components'
import EditPage from './components/pages/editPage/EditPage';
import PlaylistsPage from "./components/pages/playlistsPage/PlaylistsPage";

function App() {

  let parsed = querystring.parse(window.location.search.substring(1))
  let accessToken = parsed.access_token
  const dispatch = useDispatch()
  if (accessToken)
    dispatch(storeToken(accessToken))

  return (
    <Router>
      {
        accessToken ?
          <>
            <Navigation />
            <Switch>
              <Route path="/" exact component={PlaylistsPage}/>
              <Route path="/about" component={AboutPage} />
              <Route path="/create" component={CreationPage} />
              <Route path="/playlists" component={PlaylistsPage} />
              <Route path="/playlist" component={EditPage} />
            </Switch>
          </>
          :
          <LoginPage />
      }
    </Router>
  )
}

export default App;