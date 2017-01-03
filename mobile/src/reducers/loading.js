import * as constants from '../actions/constants';

export default function loading(state = false, action) {
	if (action.type === constants.LOADING) {
		return action.payload;
	}
	return state;
}