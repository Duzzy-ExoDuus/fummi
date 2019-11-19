import React from 'react';

const LoginPage = () =>
      <div >
        <button
          onClick={ () => {
            window.location = window.location.href.includes('localhost')
              ? 'http://localhost:5000/login'
              : 'https://fummi-backend.herokuapp.com/login'}}
        >Login to spotify
        </button>
      </div>

export default LoginPage;