import React, {Component} from 'react';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from './reducers';
import TabBarNavigation from './TabBarNavigation';

const store = createStore(combineReducers(reducers), applyMiddleware(thunk));

class App extends Component {
	render = () => <Provider store={store}><TabBarNavigation/></Provider>;
}

export default App;