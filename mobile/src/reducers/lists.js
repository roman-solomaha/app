import _ from 'lodash';
import * as constants from '../actions/constants';

const initialState = [];

function save(state, payload) {
	console.log('save', state, payload);

	return [
		...state,
		payload
	];
}

function remove(state, uid) {
	return _.without(state, _.find(state, {uid}));
}

function lists(state = initialState, action) {
	switch (action.type) {
		case constants.LISTS_INIT:
			return action.payload;

		case constants.LISTS_SAVE:
			return save(state, action.payload);

		case constants.LISTS_REMOVE:
			return remove(state, action.payload);

		default:
			return state;
	}
}

export default lists;