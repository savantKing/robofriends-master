import './index.css';
import 'tachyons';

import { applyMiddleware, combineReducers, createStore } from 'redux'
;
import { requestRobots, searchRobots } from './reducer';

import App from './containers/App';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { createLogger } from 'redux-logger';
import registerServiceWorker from './registerServiceWorker';
import thunkmiddleware  from 'redux-thunk';

const logger = createLogger();
const rootReducer = combineReducers({searchRobots, requestRobots});
const store = createStore(rootReducer, applyMiddleware( thunkmiddleware,logger));


ReactDOM.render(<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));
registerServiceWorker();
