import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {TabBarIOS, View} from 'react-native';
import routes from './routes';

class TabBarNavigation extends Component {
	constructor() {
		super(...arguments);
		this.state = {selected: 'lists'};
	}

	render = () => {
		return (
			<TabBarIOS unselectedTintColor="#929292" barTintColor="#f9f9f9" tintColor="#0099ff">
				{routes.map((route, key) => this.renderRoute(route, key))}
			</TabBarIOS>
		);
	};

	renderRoute = (route, key) => {
		const selected = this.state.selected === route.name;
		const Route = route.component;
		return (
			<TabBarIOS.Item {...route} key={key} selected={selected} onPress={() => this.selectRoute(route.name)}>
				<Route/>
			</TabBarIOS.Item>
		);
	};

	selectRoute = selected => {
		return this.setState({selected});
	}
}

TabBarNavigation = connect(({loading}) => ({loading}))(TabBarNavigation);

export default TabBarNavigation;