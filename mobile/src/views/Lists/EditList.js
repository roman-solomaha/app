import React, {Component} from 'react';
import {AppRegistry, StyleSheet, ScrollView, View, TouchableHighlight, Text, TextInput} from 'react-native';

export default class EditList extends Component {
	render = () => {
		return (
			<ScrollView>
				<View style={style.container}>
					<Text>{`UID = ${this.props.list.uid}`}</Text>
					<Text>{`Название = ${this.props.list.title}`}</Text>
					<Text>{`Продукты = {`}</Text>
					{this.props.list.products && this.props.list.products.map((product, key) => <View key={key}><Text>{key + 1}: {product.path}</Text></View>)}
					<Text>}</Text>
					<TouchableHighlight onPress={() => this.remove()}>
						<View style={style.removeButton}>
							<Text style={style.removeButtonText}>Удалить этот список</Text>
						</View>
					</TouchableHighlight>
				</View>
			</ScrollView>
		);
	};

	remove = () => {
		this.props.crud.remove(this.props.list.uid);
		return this.props.navigator.pop();
	}
}

const style = StyleSheet.create({
	container: {
		padding: 15
	},

	removeButton: {
		height: 44,
		backgroundColor: '#ff0000',
		flexWrap: 'nowrap',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},

	removeButtonText: {
		color: '#ffffff',
		fontSize: 20
	}
});

AppRegistry.registerComponent('EditList', () => EditList);