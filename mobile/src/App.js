import React, {Component, PropTypes} from 'react';
import {AppRegistry, StyleSheet, TabBarIOS, View} from 'react-native';
import routes from './routes';

export default class App extends Component {
	constructor() {
		super(...arguments);
		this.state = {selected: 'lists', loading: false};
	}

	render = () => {
		return (
			<TabBarIOS unselectedTintColor="#929292" tintColor="#0099ff" barTintColor="#f9f9f9">
				{routes.map((route, key) => this.renderRoute(route, key))}
			</TabBarIOS>
		);
	};

	renderRoute = (route, key) => {
		const Route = route.component;
		const itemProps = {
			...route,
			key: key,
			selected: this.state.selected === route.name,
			onPress: () => this.setState({selected: route.name})
		};

		return (
			<TabBarIOS.Item {...itemProps}>
				<Route/>
			</TabBarIOS.Item>
		);
	};
}

AppRegistry.registerComponent('App', () => App);