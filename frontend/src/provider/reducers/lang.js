import {
	CHANGE_LANG,
} from "provider/actions/lang";

const langReducer = (state, action) => {
	switch (action.type) {
		case CHANGE_LANG:
			return action.payload;
		default:
			return state;
	}
};

export default langReducer;
