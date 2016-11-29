import React, {Component, PropTypes} from 'react';
import {AppRegistry, StyleSheet, AsyncStorage, NavigatorIOS, ScrollView, View, TouchableHighlight, Text, TextInput, Alert} from 'react-native';
import Loading from '../Loading';
import AllLists from './AllLists';
import AddList from './AddList';

export default class Lists extends Component {
	constructor() {
		super(...arguments);
		this.state = {lists: [], loading: false};
		this.crud = {
			create: () => this.create(),
			remove: uid => this.remove(uid),
			update: (value, uid) => this.update(value, uid),
			get: uid => this.state.lists.filter(list => list.uid === uid)[0] || {},
			getAll: () => this.state.lists.filter(list => list.uid),
			loading: () => this.state.loading
		};
	}

	componentDidMount() {
		this.loadLists().done();
	};

	render = () => {
		const addRoute = {
			component: AddList,
			title: AddList.title,
			leftButtonTitle: 'Назад',
			onLeftButtonPress: () => this.refs.nav.navigator.pop(),
			rightButtonTitle: AddList.rightButtonTitle,
			passProps: {crud: this.crud},
			onRightButtonPress: () => this.create()
		};
		const initialRoute = {
			component: AllLists,
			title: AllLists.title,
			leftButtonTitle: 'Назад',
			onLeftButtonPress: () => this.refs.nav.navigator.pop(),
			rightButtonSystemIcon: AllLists.rightButtonSystemIcon,
			passProps: {crud: this.crud},
			onRightButtonPress: () => this.refs.nav.navigator.push(addRoute)
		};
		const Navigator = <NavigatorIOS ref="nav" style={style.container} tintColor="#0099ff" initialRoute={initialRoute}/>;
		return this.state.loading ? <Loading/> : Navigator;
	};

	create = () => {
		const lists = this.state.lists.filter(list => list.uid);
		let list = this.state.lists.filter(list => list.uid === undefined);
		if (!list.length || !list[0].title) {
			return Alert.alert('Введите название');
		}
		list[0].uid = Date.now();
		this.setState({lists: [...lists, list[0]]}, () => this.save());
		this.refs.nav.navigator.pop();
	};

	remove = uid => {
		const {lists} = this.state;
		const index = lists.indexOf(lists.filter(list => list.uid === uid)[0]);
		if (index !== -1) {
			lists.splice(index, 1);
		}
		this.setState({lists}, () => this.save());
	};

	update = (value, uid) => {
		const lists = this.state.lists.filter(list => list.uid);
		let list = this.state.lists.filter(list => list.uid === uid)[0] || {...value};
		list = {...list, ...value};
		this.setState({lists: [...lists, list]});
	};

	save = async () => {
		try {
			return await AsyncStorage.setItem('lists', JSON.stringify(this.state.lists));
		}
		catch (error) {
			return Alert.alert(error.message);
		}
	};

	loadLists = async () => {
		this.setState({loading: true});
		try {
			const lists = await AsyncStorage.getItem('lists');
			return this.setState({loading: false, lists: lists === null ? [] : JSON.parse(lists)});
		}
		catch (error) {
			this.setState({loading: false});
			return Alert.alert(error.message);
		}

	};
}

const style = StyleSheet.create({
	container: {
		flex: 1
	}
});

AppRegistry.registerComponent('Lists', () => Lists);