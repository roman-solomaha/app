import React, {Component, PropTypes} from 'react';
import {AppRegistry, StyleSheet, ScrollView, SwipeableListView, RecyclerViewBackedScrollView, View, TouchableHighlight, Text, TextInput} from 'react-native';
import EditList from './EditList';

export default class AllLists extends Component {
	static title = 'Мои списки';
	static rightButtonSystemIcon = 'add';

	constructor() {
		super(...arguments);
	}

	componentWillMount() {
		const lists = this.props.crud.getAll();

		const dataSource = SwipeableListView.getNewDataSource();
		lists.sort((prev, next) => next.uid - prev.uid);

		this.setState({dataSource: dataSource.cloneWithRowsAndSections(lists)});
	}

	render = () => {
		return (
			<SwipeableListView
				dataSource={this.state.dataSource}
				maxSwipeDistance={100}
				renderQuickActions={
					(rowData, sectionID, rowID) => {
						return (
							<View>
								<TouchableHighlight onPress={() => {
									console.log({rowData, sectionID, rowID});
								}}>
									<Text>Remove</Text>
								</TouchableHighlight>
							</View>
						);
					}}
				renderRow={this._renderRow}
				renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
				renderSeparator={this._renderSeperator}
			/>
		);
	};


	// highlightRow: (sectionID: number, rowID: number) => void
	_renderRow = (rowData, sectionID, rowID, highlightRow) => {
		return (
			<TouchableHighlight onPress={() => {console.log({rowData, sectionID, rowID, highlightRow})}}>
				<View style={style.row}>
					<Text style={style.text}>{rowData.title}</Text>
					<Text style={style.arrow}>></Text>
				</View>
			</TouchableHighlight>
		);
	};

	renderRow = (rowData, sectionID, rowID, highlightRow) => {
		return (
			<TouchableHighlight onPress={() => this.selectList(list)}>
				<View style={style.row}>
					<Text style={style.text}>{rowData.title}</Text>
					<Text style={style.arrow}>></Text>
				</View>
			</TouchableHighlight>
		);
	};



	_renderSeperator = (sectionID, rowID, adjacentRowHighlighted) => {
		return (
			<View
				key={`${sectionID}-${rowID}`}
				style={{
					height: adjacentRowHighlighted ? 4 : 1,
					backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
				}}
			/>
		);
	};


	// render = () => {
	// 	const lists = this.props.crud.getAll();
	// 	lists.sort((prev, next) => next.uid - prev.uid);
	// 	return (
	// 		<ScrollView>
	// 			{lists.length ? this.renderLists(lists) : this.renderEmpty()}
	// 		</ScrollView>
	// 	);
	// };
	//
	// renderLists = lists => <View>{lists.map((list, key) => this.renderRow(list, key))}</View>;

	// renderRow = (list, key) => {
	// 	return (
	// 		<TouchableHighlight key={key} onPress={() => this.selectList(list)}>
	// 			<View style={style.row}>
	// 				<Text style={style.text}>{list.title}</Text>
	// 				<Text style={style.arrow}>></Text>
	// 			</View>
	// 		</TouchableHighlight>
	// 	);
	// };

	selectList = list => {
		const route = {
			title: list.title,
			component: EditList,
			passProps: {list, crud: this.props.crud}
		};
		return this.props.navigator.push(route);
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

	text: {
		color: '#333333',
		fontSize: 20
	},

	arrow: {
		color: '#555555',
		fontSize: 20,
		fontWeight: 'normal'
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