import React, {Component} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';

const style = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(222, 222, 222, 0.5)'
	}
});

class Loading extends Component {
	render = () => {
		return (
			<View style={style.container}>
				<ActivityIndicator size="large" color="#000000"/>
			</View>
		);
	};
}

export default Loading;