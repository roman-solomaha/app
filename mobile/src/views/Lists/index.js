import React, {Component} from 'react';
import {StyleSheet, Navigator, View, TouchableHighlight, Text} from 'react-native';
import config from '../../config';
import Main from './main';
import Form from './form';

const styles = StyleSheet.create({
	navigator: {
		flex: 1
	},

	navigationBar: {
		backgroundColor: config.color.light
	},

	navigationBarButton: {
		padding: 10
	},

	navigationBarButtonText: {
		color: config.color.primary,
		fontSize: 16,
		fontWeight: 'bold'
	}
});

class Lists extends Component {
	render = () => {
		const formRoute = {
			component: Form,
			title: Form.title,
			leftButtonTitle: '<',
			rightButtonTitle: Form.rightButtonTitle,
			onLeftButtonPress: navigator => navigator.pop(),
			onRightButtonPress: () => this.create(),
		};

		const initialRoute = {
			component: Main,
			title: Main.title,
			leftButtonTitle: '|||',
			rightButtonTitle: '+',
			onLeftButtonPress: this.props.openMenu,
			onRightButtonPress: navigator => navigator.push(formRoute)
		};

		return (
			<Navigator
				renderScene={this.renderScene}
				navigationBar={this.renderNavigationBar()}
				initialRoute={initialRoute}/>
		);
	};

	renderNavigationBar = () => {
		return (
			<Navigator.NavigationBar
				style={styles.navigationBar}
				routeMapper={this.routeMapper()}/>
		);
	};

	routeMapper = () => {
		return {
			LeftButton: (route, navigator, index, navState) => {
				return (
					<TouchableHighlight onPress={() => route.onLeftButtonPress(navigator)}>
						<View style={styles.navigationBarButton}>
							<Text style={styles.navigationBarButtonText}>
								{route.leftButtonTitle}
							</Text>
						</View>
					</TouchableHighlight>
				);
			},
			RightButton: (route, navigator, index, navState) => {
				return (
					<TouchableHighlight onPress={() => route.onRightButtonPress(navigator)}>
						<View style={styles.navigationBarButton}>
							<Text style={styles.navigationBarButtonText}>
								{route.rightButtonTitle}
							</Text>
						</View>
					</TouchableHighlight>
				);
			},
			Title: (route, navigator, index, navState) => {
				return (
					<View style={styles.navigationBarButton}>
						<Text style={styles.navigationBarButtonText}>
							{route.title}
						</Text>
					</View>
				);
			},
		};
	};

	renderScene = (route, navigator) => {
		const Route = route.component;
		return <Route route={route} navigator={navigator}/>;
	};

	create = () => {
		return console.log('create');
	};
}

export default Lists;