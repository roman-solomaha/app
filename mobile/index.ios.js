import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App.js';

export default class Root extends Component {
  render = () => <App/>;
}

AppRegistry.registerComponent('mobile', () => Root);
