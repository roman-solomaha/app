import React, {Component, PropTypes} from 'react';
import {AppRegistry, StyleSheet, Dimensions, ScrollView, SwipeableListView, RecyclerViewBackedScrollView, View, TouchableHighlight, TouchableOpacity, Text, TextInput} from 'react-native';
import EditList from './EditList';

const actionWidth = Dimensions.get('window').width / 3;

export default class AllLists extends Component {
	static title = 'Мои списки';
	static rightButtonSystemIcon = 'add';

	constructor() {
		super(...arguments);
	}

	componentWillMount() {
		this.setList();
	}

	componentWillReceiveProps() {
		this.setList();
	}

	setList = () => {
		const lists = this.props.crud.getAll();
		const dataSource = SwipeableListView.getNewDataSource();
		lists.sort((prev, next) => next.uid - prev.uid);
		this.setState({
			dataSource: dataSource.cloneWithRowsAndSections([lists]),
			lists
		});
	};

	render = () => {
		if (!this.state.lists.length) {
			return this.renderEmpty();
		}

		return (
			<View style={style.container}>
				<SwipeableListView
					dataSource={this.state.dataSource}
					maxSwipeDistance={actionWidth}
					enableEmptySections={true}
					renderQuickActions={this.renderAction}
					renderRow={this.renderRow}
					renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
					renderSeparator={this.renderSeperator}/>
			</View>
		);
	};

	renderAction = list => {
		return (
			<View style={style.action}>
				<TouchableOpacity style={style.actionButton} onPress={() => this.remove(list.uid)}>
					<Text style={style.actionText}>Удалить</Text>
				</TouchableOpacity>
			</View>
		);
	};

	renderRow = list => {
		return (
			<TouchableHighlight onPress={() => this.selectList(list)}>
				<View style={style.row}>
					<Text style={style.text}>{list.title}</Text>
					<Text style={style.arrow}>></Text>
				</View>
			</TouchableHighlight>
		);
	};

	renderSeperator = (sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={style.separator}/>;

	selectList = list => {
		const route = {
			title: list.title,
			component: EditList,
			passProps: {list, crud: this.props.crud}
		};
		return this.props.navigator.push(route);
	};

	remove = uid => {
		this.props.crud.remove(uid);
		this.setList();
	};

	renderEmpty = () => {
		return (
			<View style={style.containerEmpty}>
				<Text style={style.textEmpty}>Список пока пуст...</Text>
			</View>
		);
	};
}

const style = StyleSheet.create({
	container: {
		flex: 1
	},

	row: {
		flexWrap: 'nowrap',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#ffffff',
		padding: 15
	},

	separator: {
		height: 1,
		backgroundColor: '#cccccc'
	},

	text: {
		color: '#333333',
		fontSize: 20
	},

	arrow: {
		color: '#555555',
		fontSize: 20,
		fontWeight: 'normal'
	},

	action: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'stretch'
	},

	actionButton: {
		backgroundColor: '#ff0000',
		width: actionWidth,
		justifyContent: 'center',
		alignItems: 'center'
	},

	actionText: {
		color: '#ffffff',
		fontSize: 20,
		fontWeight: 'bold'
	},

	containerEmpty: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 15
	},

	textEmpty: {
		color: '#dddddd',
		fontSize: 30
	}
});

AppRegistry.registerComponent('AllLists', () => AllLists);