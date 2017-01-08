import React, {Component} from 'react';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from './reducers';
import Main from './views/main';

const store = createStore(combineReducers(reducers), applyMiddleware(thunk));

class App extends Component {
	render = () => <Provider store={store}><Main/></Provider>;
}

export default App;