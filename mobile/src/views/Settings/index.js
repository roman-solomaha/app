import React, {Component} from 'react';
import {AppRegistry, StyleSheet, AsyncStorage, View, TouchableHighlight, Text} from 'react-native';

export default class Settings extends Component {
	render = () => {
		return (
			<View style={style.container}>
				<Text style={style.header}>Настройки</Text>
				<TouchableHighlight style={style.button} onPress={() => AsyncStorage.clear()}>
					<Text style={style.buttonText}>Очистить списки</Text>
				</TouchableHighlight>
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
		fontSize: 20,
		marginBottom: 20
	},

	button: {
		height: 44,
		backgroundColor: '#f7f7f7',
		flexWrap: 'nowrap',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 50
	},

	buttonText: {
		color: '#0099ff',
		fontSize: 20
	}
});

AppRegistry.registerComponent('Settings', () => Settings);