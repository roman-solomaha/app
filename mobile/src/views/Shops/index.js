import React, {Component} from 'react';
import {StyleSheet, MapView} from 'react-native';

const style = StyleSheet.create({
	map: {
		flex: 1
	}
});

class Shops extends Component {
	render = () => {
		return <MapView style={style.map}
		                followUserLocation={true}
		                showsUserLocation={true}/>;
	};
}

export default Shops;