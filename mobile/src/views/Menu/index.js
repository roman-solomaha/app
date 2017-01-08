import React, {Component, PropTypes} from 'react';
import {StyleSheet, ScrollView, View, Text, Image} from 'react-native';
import Button from '../../components/Button.js';
import routes from '../../routes';
import config from '../../config';

const styles = StyleSheet.create({
	menu: {
		flex: 1,
		paddingVertical: 30,
		backgroundColor: config.color.light
	},

	item: {
		padding: 20,
		borderBottomWidth: 1,
		borderBottomColor: config.color.secondary,
		flexDirection: 'row',
		alignItems: 'center'
	},

	selectedLink: {
		fontWeight: 'bold',
		color: config.color.primary
	},

	icon: {
		marginRight: 15
	}
});

class MenuItem extends Component {
	render = () => {
		const {selected, onSelect, route} = this.props;
		const linkStyles = [];
		selected && linkStyles.push(styles.selectedLink);

		return (
			<Button onPress={() => onSelect(route.name)} type="light">
				{
					textColor => {
						return (
							<View style={styles.item}>
								<Image
									style={styles.icon}
									source={selected ? route.iconActive : route.iconStatic}/>
								<Text style={selected ? styles.selectedLink : textColor}>
									{route.title}
									</Text>
							</View>
						);
					}
				}
			</Button>
		);
	}
}

class Menu extends Component {
	render = () => {
		return (
			<ScrollView style={styles.menu}>
				<View style={styles.list}>
					{this.renderRoutes()}
				</View>
			</ScrollView>
		);
	};

	renderRoutes = () => {
		return routes.map((route, key) => {
			return (
				<MenuItem
					key={key}
					route={route}
					selected={route.name === this.props.selected}
					onSelect={this.props.onSelect}/>
			);
		})
	}
}

export default Menu;