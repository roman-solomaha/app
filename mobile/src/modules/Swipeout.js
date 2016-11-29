import React, {Component} from 'react';
import {AppRegistry, PanResponder, TouchableHighlight, StyleSheet, Text, View} from 'react-native';
import tweenState from 'react-tween-state';
import reactMixin from 'react-mixin';

class SwipeoutButton extends Component {
	render() {
		const {props} = this;

		const styleButton = StyleSheet.create({
			style: {
				height: props.height,
				width: props.width,
				backgroundColor: props.backgroundColor
			}
		});

		const styleButtonComponent = StyleSheet.create({
			style: {
				height: props.height,
				width: props.width
			}
		});


		const styleButtonText = StyleSheet.create({
			style: {
				color: props.color
			}
		});

		return (
			<TouchableHighlight
				onPress={this.props.onPress}
				style={styles.buttonTouchable}
				underlayColor={this.props.underlayColor}>
				<View style={[styles.button, styleButton.style]}>
					{
						props.component ?
						<View style={styleButtonComponent.style}>{props.component}</View> :
						<Text style={[styles.buttonText, styleButtonText.style]}>{props.text}</Text>
					}
				</View>
			</TouchableHighlight>
		)
	}
}

SwipeoutButton.defaultProps = {
	backgroundColor: '#b6aeff',
	color: '#ffffff',
	component: null,
	underlayColor: 'transparent',
	width: 0,
	height: 0,
	text: '',
	key: null,
	onPress: null,
};

export default class Swipeout extends Component {
	constructor() {
		super(...arguments);
		this.state = {
			autoClose: this.props.autoClose || false,
			buttonWidth: 0,
			buttonsLeftWidth: 0,
			buttonsRightWidth: 0,
			contentHeight: 0,
			contentPosition: 0,
			contentWidth: 0,
			openedRight: false,
			swiping: false,
			tweenDuration: 160,
			timeStart: null,
		};
	}
	
	componentWillMount() {
		this.panResponder = PanResponder.create({
			onStartShouldSetPanResponder: (event, gestureState) => true,
			onMoveShouldSetPanResponder: (event, gestureState) => !(gestureState.dx === 0 || gestureState.dy === 0),
			onPanResponderGrant: () => this.handlePanResponderGrant(),
			onPanResponderMove: (event, gestureState) => this.handlePanResponderMove(gestureState),
			onPanResponderRelease: (event, gestureState) => this.handlePanResponderEnd(gestureState),
			onPanResponderTerminate: (event, gestureState) => this.handlePanResponderEnd(gestureState),
			onShouldBlockNativeResponder: (event, gestureState) => true,
		});
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.close) {
			this.close();
		}
	}

	handlePanResponderGrant() {
		this.props.onOpen(this.props.sectionID, this.props.rowID);
		this.refs.swipeoutContent.measure((ox, oy, width, height) => {
			this.setState({
				buttonWidth: (width / 5),
				buttonsLeftWidth: this.props.left ? (width / 5) * this.props.left.length : 0,
				buttonsRightWidth: this.props.right ? (width / 5) * this.props.right.length : 0,
				swiping: true,
				timeStart: (new Date()).getTime(),
			})
		})
	}

	handlePanResponderMove(gestureState) {
		let posX = gestureState.dx;
		const posY = gestureState.dy;
		const {buttonsLeftWidth, buttonsRightWidth} = this.state;
		
		if (this.state.openedRight) {
			posX = gestureState.dx - buttonsRightWidth;
		}
		else if (this.state.openedLeft) {
			posX = gestureState.dx + buttonsLeftWidth;
		}
		
		const moveX = Math.abs(posX) > Math.abs(posY);
		
		if (this.props.scroll) {
			if (moveX) {
				this.props.scroll(false)
			}
			else {
				this.props.scroll(true)
			}
		}
		
		if (this.state.swiping) {
			if (posX < 0 && this.props.right) {
				this.setState({contentPosition: Math.min(posX, 0)});
			}
			else if (posX > 0 && this.props.left) {
				this.setState({contentPosition: Math.max(posX, 0)});
			}
		}
	}

	handlePanResponderEnd(gestureState) {
		const {contentPosition, contentWidth, buttonsLeftWidth, buttonsRightWidth, timeStart} = this.state;
		const posX = gestureState.dx;
		const openX = contentWidth * 0.33;
		
		let openLeft = posX > openX || posX > buttonsLeftWidth / 2;
		let openRight = posX < -openX || posX < -buttonsRightWidth / 2;
		
		if (this.state.openedRight) {
			openRight = posX - openX < -openX;
		}
		
		if (this.state.openedLeft) {
			openLeft = posX + openX > openX;
		}
		
		const timeDiff = new Date().getTime() - timeStart < 200;
		
		if (timeDiff) {
			openRight = posX < -openX / 10 && !this.state.openedLeft;
			openLeft = posX > openX / 10 && !this.state.openedRight;
		}
	
		if (this.state.swiping) {
			if (openRight && contentPosition < 0 && posX < 0) {
				this.tweenContent('contentPosition', -buttonsRightWidth);
				this.setState({contentPosition: -buttonsRightWidth, openedLeft: false, openedRight: true});
			} 
			else if (openLeft && contentPosition > 0 && posX > 0) {
				this.tweenContent('contentPosition', buttonsLeftWidth);
				this.setState({contentPosition: buttonsLeftWidth, openedLeft: true, openedRight: false});
			}
			else {
				this.tweenContent('contentPosition', 0);
				this.setState({contentPosition: 0, openedLeft: false, openedRight: false});
			}
		}
		
		if (this.props.scroll) {
			this.props.scroll(true);
		}
	}

	tweenContent(state, endValue) {
		this.tweenState(state, {
			easing: tweenState.easingTypes.easeInOutQuad,
			duration: endValue === 0 ? this.state.tweenDuration * 1.5 : this.state.tweenDuration,
			endValue
		});
	}

	rubberBandEasing(value, limit) {
		if (value < 0 && value < limit) {
			return limit - Math.pow(limit - value, 0.85);
		}
		else if (value > 0 && value > limit) {
			return limit + Math.pow(value - limit, 0.85);
		}
		return value;
	}

	autoClose(button) {
		const onPress = button.onPress;
		if (onPress) {
			onPress();
		}
		if (this.state.autoClose) {
			this.close();
		}
	}

	close() {
		this.tweenContent('contentPosition', 0);
		this.setState({
			openedRight: false,
			openedLeft: false,
		});
	}

	render() {
		const {contentWidth, buttonsLeftWidth, buttonsRightWidth} = this.state;
		const posX = this.getTweeningValue('contentPosition');

		let limit = -buttonsRightWidth;
		if (posX > 0) {
			limit = buttonsLeftWidth;
		}

		const styleSwipeout = StyleSheet.create({
			style: {
				backgroundColor: this.props.backgroundColor
			}
		});

		const styleLeftPosition = StyleSheet.create({
			style: {
				left: 0,
				overflow: 'hidden',
				width: Math.min(limit * (posX / limit), limit),
			}
		});

		const styleRightPosition = StyleSheet.create({
			style: {
				left: Math.abs(contentWidth + Math.max(limit, posX)),
				right: 0,
			}
		});

		const styleContentPosition = StyleSheet.create({
			style: {
				left: this.rubberBandEasing(posX, limit),
			}
		});

		const styleContent = [styles.content];
		styleContent.push(styleContentPosition.style);

		const styleRight = [styles.buttons];
		styleRight.push(styleRightPosition.style);

		const styleLeft = [styles.buttons];
		styleLeft.push(styleLeftPosition.style);

		const isRightVisible = posX < 0;
		const isLeftVisible = posX > 0;

		return (
			<View style={[styles.swipeout, styleSwipeout.style]}>
				<View
					ref="swipeoutContent"
					style={styleContent}
					onLayout={event => this.onLayout(event)}
					{...this.panResponder.panHandlers}>
					{this.props.children}
				</View>
				{this.renderButtons(this.props.right, isRightVisible, styleRight)}
				{this.renderButtons(this.props.left, isLeftVisible, styleLeft)}
			</View>
		);
	}

	onLayout(event) {
		const {width, height} = event.nativeEvent.layout;
		this.setState({
			contentWidth: width,
			contentHeight: height
		});
	}

	renderButtons(buttons, isVisible, style) {
		if (buttons && isVisible) {
			return <View style={style}>{buttons.map((button, key) => this.renderButton(button, key))}</View>;
		}
		return <View/>;
	}

	renderButton(button, key) {
		return (
			<SwipeoutButton
				backgroundColor={button.backgroundColor}
				color={button.color}
				component={button.component}
				height={this.state.contentHeight}
				key={key}
				onPress={() => this.autoClose(button)}
				onOpen={(sectionID, rowID) => this.props.onOpen(sectionID, rowID)}
				text={button.text}
				type={button.type}
				underlayColor={button.underlayColor}
				width={this.state.buttonWidth}/>
		)
	}
}

Swipeout.defaultProps = {
	onOpen: () => {},
	rowID: -1,
	sectionID: -1,
};

reactMixin.onClass(Swipeout, tweenState.Mixin);

const styles = StyleSheet.create({
	swipeout: {
		backgroundColor: '#dbddde',
		flex: 1,
		overflow: 'hidden',
	},
	buttonTouchable: {
		flex: 1,
	},
	button: {
		alignItems: 'center',
		backgroundColor: '#b6bec0',
		flex: 1,
		justifyContent: 'center',
		overflow: 'hidden',
	},
	buttonText: {
		color: '#fff',
		textAlign: 'center',
	},
	buttons: {
		bottom: 0,
		flex: 1,
		flexDirection: 'row',
		position: 'absolute',
		right: 0,
		top: 0,
	},
	content: {
		flex: 1,
	}
});

AppRegistry.registerComponent('Swipeout', () => Swipeout);