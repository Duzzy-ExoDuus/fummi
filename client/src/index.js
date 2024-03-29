import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import App from './App';


const middleware = [thunk];

const store = createStore(rootReducer, compose(
    applyMiddleware(...middleware)));
    //window.__REDUX_DEVTOOLS_EXTENSION__ &&
    //window.__REDUX_DEVTOOLS_EXTENSION__()

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);