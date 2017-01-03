import React, {Component} from 'react';
import {Dimensions, StyleSheet, ScrollView, View, TouchableOpacity, TouchableHighlight, Text, Image} from 'react-native';

export default class Products extends Component {
	render = () => {
		const {content} = this.props;

		if (content.items && !content.items.length) {
			return this.renderEmpty();
		}

		if (!content.items) {
			return this.renderProduct(content);
		}

		return (
			<ScrollView>
				<View style={style.categories}>
					{content.items.map((category, key) => this.renderCategory(category, key))}
				</View>
			</ScrollView>
		);
	};

	renderCategory = (category, key) => {
		return (
			<View key={key} style={style.category}>
				<TouchableOpacity style={style.categoryButton} onPress={() => this.props.setCategory(category)}>
					<View>
						<Image style={style.categoryImage} source={{url: category.image}}/>

						<View style={style.categoryInfo}>
							<Text style={style.categoryText}>{category.title}</Text>
						</View>
					</View>
				</TouchableOpacity>
			</View>
		);
	};

	renderProduct = product => {
		return (
			<ScrollView>
				<View style={style.product}>
					<Image style={style.productImage} source={{url: product.image}}/>

					<Text style={style.productText}>{product.title}</Text>

					<TouchableHighlight style={style.addButton} onPress={() => this.props.setProduct(product)}>
						<Text style={style.addButtonText}>+ Добавить товар</Text>
					</TouchableHighlight>
				</View>
			</ScrollView>
		);
	};

	renderEmpty = () => {
		return (
			<View style={style.container}>
				<Text>Товар отсутствует :(</Text>
			</View>
		);
	};
}

const categoryWidth = Dimensions.get('window').width / 2 - 1;
const categoryHeight = Dimensions.get('window').height / 2 - 1;

const style = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},

	categories: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		borderColor: '#cccccc',
		borderTopWidth: 1,
		borderLeftWidth: 1
	},

	category: {
		width: categoryWidth,
		height: categoryHeight,
		borderColor: '#cccccc',
		borderRightWidth: 1,
		borderBottomWidth: 1
	},

	categoryButton: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'flex-start'
	},

	categoryImage: {
		width: categoryWidth - 1,
		height: categoryHeight - 100,
		resizeMode: 'cover'
	},

	categoryInfo: {
		flex: 1,
		height: 100,
		justifyContent: 'center'
	},

	categoryText: {
		color: '#333333',
		fontSize: 16,
		textAlign: 'center'
	},

	product: {
		flex: 1
	},

	productImage: {
		width: 300,
		height: 300,
		resizeMode: 'contain',
		marginBottom: 20
	},

	productText: {
		color: '#333333',
		fontSize: 20,
		textAlign: 'center',
		marginBottom: 20
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
	}
});