import React from 'react';
import { Jumbotron, Button } from 'reactstrap';


const LoginPage = () =>
  <Jumbotron>
    <h1>Welcome to the Seedbox!</h1>
    <hr />
    <p>
      Please login to spotify to continue
      </p>
    <Button
      onClick={() => {
        window.location = window.location.href.includes('localhost')
          ? 'http://localhost:5000/login'
          : 'https://fummi-backend.herokuapp.com/login'
      }}>
      Login to spotify
      </Button>
  </Jumbotron>

export default LoginPage;