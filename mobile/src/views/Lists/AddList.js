import React, {Component} from 'react';
import {AppRegistry, StyleSheet, ScrollView, View, TouchableHighlight, Text, TextInput, Image} from 'react-native';
import Products from './Products';
import {PRODUCTS} from '../../database/products.json';

export default class AddList extends Component {
	static title = 'Новый список';
	static rightButtonTitle = 'Сохранить';

	constructor() {
		super(...arguments);
		const list = this.props.crud.get();
		this.state = {...list};
	}

	render = () => {
		const {title = ''} = this.state;
		const {products = []} = this.props.crud.get();
		return (
			<ScrollView>
				<View style={style.container}>
					<TextInput style={style.inputText}
					           onChangeText={title => this.onChangeTitle(title)}
					           placeholder="Название"
					           value={title}/>

					<TouchableHighlight onPress={() => this.setCategory(PRODUCTS[0])}>
						<View style={style.addButton}>
							<Text style={style.addButtonText}>+ Добавить товар</Text>
						</View>
					</TouchableHighlight>

					<View style={style.list}>
						{products.map(({finish, details}, key) => {
							if (finish) {
								return (
									<View key={key} style={style.row}>
										<Image style={style.image} source={{url: details.image}}/>
										<Text style={style.text}>{details.title}</Text>
									</View>
								);
							}
						})}
					</View>
				</View>
			</ScrollView>
		);
	};

	onChangeTitle = title => {
		this.setState({title}, () => this.props.crud.update({title}));
	};

	setCategory = category => {
		const route = {
			title: category.title,
			component: Products,
			leftButtonTitle: 'Назад',
			onLeftButtonPress: this.removeFromPath,
			passProps: {
				crud: this.props.crud,
				content: category
			}
		};
		let {products = []} = this.props.crud.get();
		const editable = products.filter(product => !product.finish)[0] || {path: ''};

		editable.path = `${editable.path}${editable.path && '.'}${category.name}`;

		products = products.filter(product => product.finish);
		products = [...products, editable];

		this.props.crud.update({products});
		return this.push(route);
	};

	setProduct = product => {
		let {products = []} = this.props.crud.get();
		let editable = products.filter(product => !product.finish)[0];

		editable = {...editable, finish: true, details: product};

		products = products.filter(product => product.finish);
		products = [...products, editable];

		this.props.crud.update({products});
		return this.props.navigator.popN(editable.path.match(/\./g).length + 1);
	};

	push = route => {
		route.passProps.setCategory = category => this.setCategory(category);
		route.passProps.setProduct = product => this.setProduct(product);
		return this.props.navigator.push(route);
	};

	removeFromPath = () => {
		let {products = []} = this.props.crud.get();
		let editable = products.filter(product => !product.finish)[0] || {path: ''};
		const path = editable.path.split('.');
		path.pop();

		editable = {...editable, path: path.join('.')};

		products = products.filter(product => product.finish);
		products = [...products, editable];

		this.props.crud.update({products});

		this.props.navigator.pop();
	};
}

const style = StyleSheet.create({
	container: {
		padding: 15
	},

	inputText: {
		height: 44,
		paddingHorizontal: 10,
		marginTop: 5,
		marginBottom: 15,
		borderWidth: 1,
		borderColor: '#cccccc'
	},

	addButton: {
		height: 44,
		backgroundColor: '#f7f7f7',
		flexWrap: 'nowrap',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},

	addButtonText: {
		color: '#0099ff',
		fontSize: 20
	},

	list: {

	},

	row: {
		flexWrap: 'nowrap',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#ffffff',
		padding: 15,
		borderBottomWidth: 1,
		borderBottomColor: '#cccccc'
	},

	image: {
		width: 50,
		height: 50,
		resizeMode: 'cover'
	},

	text: {
		color: '#333333',
		fontSize: 16
	}
});

AppRegistry.registerComponent('AddList', () => AddList);