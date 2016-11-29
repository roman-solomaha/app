import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View, Text} from 'react-native';

export default class Shops extends Component {
	render = () => {
		return (
			<View style={style.container}>
				<Text style={style.header}>Магазины</Text>
			</View>
		);
	};
}

const style = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},

	header: {
		fontSize: 20
	}
});

AppRegistry.registerComponent('Shops', () => Shops);