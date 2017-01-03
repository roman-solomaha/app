import * as constants from './constants';

export function loading(payload) {
	return {
		type: constants.LOADING,
		payload
	};
}