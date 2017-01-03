import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as listsActions from '../../actions/lists';
import * as loadingActions from '../../actions/loading';
import Loading from '../Loading';
import Form from './Form';
import {
	StyleSheet,
	Dimensions,
	ScrollView,
	SwipeableListView,
	RecyclerViewBackedScrollView,
	TouchableHighlight,
	TouchableOpacity,
	AsyncStorage,
	Alert,
	TextInput,
	View,
	Text
} from 'react-native';

const maxSwipeDistance = Dimensions.get('window').width / 3;

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
		width: maxSwipeDistance,
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

class Main extends Component {
	static title = 'Мои списки';

	constructor() {
		super(...arguments);
		this.state = {lists: []};
		this.initLists();
	}

	componentWillReceiveProps(props) {
		this.setDataSource(props);
	}

	initLists = async () => {
		this.props.loadingActions.loading(true);
		try {
			let lists = await AsyncStorage.getItem('lists');
			lists = JSON.parse(lists) || [];
			this.props.listsActions.init(lists);
			this.props.loadingActions.loading(false);
		}
		catch (error) {
			this.props.loadingActions.loading(false);
			return Alert.alert(error.message);
		}
	};

	setDataSource = props => {
		const lists = props.lists;
		const dataSource = SwipeableListView.getNewDataSource();
		lists.sort((prev, next) => next.created - prev.created);

		this.setState({
			lists,
			dataSource: dataSource.cloneWithRowsAndSections([lists])
		});
	};

	render = () => {
		if (this.props.loading) {
			return <Loading/>;
		}

		if (!this.state.lists.length) {
			return this.renderEmptyView();
		}

		return (
			<View style={style.container}>
				<SwipeableListView
					dataSource={this.state.dataSource}
					maxSwipeDistance={maxSwipeDistance}
					enableEmptySections={true}
					renderQuickActions={this.renderAction}
					renderRow={this.renderRow}
					renderScrollComponent={props => <RecyclerViewBackedScrollView {...props}/>}
					renderSeparator={this.renderSeperator}/>
			</View>
		);
	};

	renderAction = list => {
		return (
			<View style={style.action}>
				<TouchableOpacity style={style.actionButton}
				                  onPress={() => this.props.listsActions.remove(list.uid)}>
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

	renderSeperator = (sectionID, rowID) => {
		return <View key={`${sectionID}-${rowID}`} style={style.separator}/>;
	};

	renderEmptyView = () => {
		return (
			<View style={style.containerEmpty}>
				<Text style={style.textEmpty}>Список пока пуст...</Text>
			</View>
		);
	};

	selectList = list => {
		const formRoute = {
			title: list.title,
			component: Form,
			passProps: {list}
		};
		return this.props.navigator.push(formRoute);
	};
}

Main = connect(
	state => state,
	dispatch => ({
		listsActions: bindActionCreators(listsActions, dispatch),
		loadingActions: bindActionCreators(loadingActions, dispatch)
	})
)(Main);

export default Main;