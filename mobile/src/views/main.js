import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Drawer from 'react-native-drawer'
import Menu from './Menu';
import routes from '../routes';

const styles = StyleSheet.create({
	content: {
		flex: 1,
		backgroundColor: '#ffffff',
		shadowColor: '#000000',
		shadowOpacity: 0.5,
		shadowRadius: 5,
		shadowOffset: {
			width: -10,
			height: 0,
		}
	}
});

class Main extends Component {
	constructor() {
		super(...arguments);
		this.state = {selected: 'lists'};
		this.onSelect = this.onSelect.bind(this);
	}

	render = () => {
		const menu = <Menu selected={this.state.selected} onSelect={this.onSelect}/>;
		const Route = routes.find(route => route.name === this.state.selected).component;
		return (
			<Drawer ref={ref => this.drawer = ref}
			        tapToClose={true}
			        type="static"
			        openDrawerOffset={0.3}
			        panCloseMask={0.3}
			        panOpenMask={0.15}
			        closedDrawerOffset={-3}
			        tweenDuration={400}
			        tweenHandler={Drawer.tweenPresets.parallax}
			        content={menu}>
				<View style={styles.content}>
					<Route openMenu={this.openMenu}/>
				</View>
			</Drawer>
		)
	};

	closeMenu = () => {
		return this.drawer.close();
	};

	openMenu = () => {
		return this.drawer.open();
	};

	onSelect = selected => {
		return this.setState({selected}, () => this.closeMenu());
	};
}

export default Main;