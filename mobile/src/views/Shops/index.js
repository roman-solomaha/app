import React, {Component} from 'react';
import {AppRegistry, StyleSheet, MapView} from 'react-native';

export default class Shops extends Component {
	render = () => {
		return <MapView style={style.map}
		                followUserLocation={true}
		                showsUserLocation={true}/>;
	};
}

const style = StyleSheet.create({
	map: {
		flex: 1
	}
});

AppRegistry.registerComponent('Shops', () => Shops);