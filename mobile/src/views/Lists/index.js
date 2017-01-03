import React, {Component} from 'react';
import {StyleSheet, NavigatorIOS} from 'react-native';
import Main from './Main';
import Form from './Form';

const style = StyleSheet.create({
	navigator: {
		flex: 1
	}
});

class Lists extends Component {
	render = () => {
		const formRoute = {
			component: Form,
			title: Form.title,
			leftButtonTitle: 'Назад',
			onLeftButtonPress: () => this.refs.nav.navigator.pop(),
			onRightButtonPress: () => this.create(),
			rightButtonTitle: Form.rightButtonTitle
		};

		const initialRoute = {
			component: Main,
			title: Main.title,
			rightButtonSystemIcon: 'add',
			onRightButtonPress: () => this.refs.nav.navigator.push(formRoute)
		};

		return <NavigatorIOS ref="nav" initialRoute={initialRoute} style={style.navigator} tintColor="#0099ff"/>;
	};

	create = () => {
		return console.log('create');
	};
}

export default Lists;