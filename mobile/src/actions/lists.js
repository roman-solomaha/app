import * as constants from './constants';

export function init(payload) {
	return {
		type: constants.LISTS_INIT,
		payload
	};
}

export function save(payload) {
	return {
		type: constants.LISTS_SAVE,
		payload
	};
}

export function remove(payload) {
	return {
		type: constants.LISTS_REMOVE,
		payload
	};
}