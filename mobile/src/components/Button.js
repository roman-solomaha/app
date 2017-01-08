import React, {Component, PropTypes} from 'react';
import {StyleSheet, TouchableHighlight, View, Text} from 'react-native';
import config from '../config';

const styles = StyleSheet.create({
	primary: {
		backgroundColor: config.color.primary
	},
	primaryText: {
		color: '#ffffff'
	},

	secondary: {
		backgroundColor: config.color.secondary
	},
	secondaryText: {
		color: '#ffffff'
	},

	dark: {
		backgroundColor: config.color.dark
	},
	darkText: {
		color: '#ffffff'
	},

	light: {
		backgroundColor: config.color.light
	},
	lightText: {
		color: config.color.dark
	},

	success: {
		color: '#ffffff',
		backgroundColor: config.color.success
	},
	successText: {
		color: '#ffffff'
	},

	danger: {
		backgroundColor: config.color.danger
	},
	dangerText: {
		color: '#ffffff'
	}
});

class Button extends Component {
	render = () => {
		return (
			<TouchableHighlight onPress={this.props.onPress}>
				{this.renderButtonContent()}
			</TouchableHighlight>
		);
	};

	renderButtonContent = () => {
		const {type, children} = this.props;
		let content = children;

		if (typeof children === 'function') {
			content = children(styles[`${type}Text`]);
		}

		return (
			<View style={styles[type]}>
				{content}
			</View>
		);
	};
}

Button.defaultProps = {
	type: 'primary',
	onPress: () => false
};

Button.propTypes = {
	type: PropTypes.string,
	onPress: PropTypes.func
};

export default Button;