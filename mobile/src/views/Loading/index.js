import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View, ActivityIndicator} from 'react-native';

export default class Loading extends Component {
	render = () => {
		return (
			<View style={style.container}>
				<ActivityIndicator size="large" color="#000000"/>
			</View>
		);
	};
}

const style = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(222, 222, 222, 0.5)'
	}
});

AppRegistry.registerComponent('Loading', () => Loading);