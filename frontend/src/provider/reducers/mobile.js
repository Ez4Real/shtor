import {
	CHANGE_IS_MOBILE,
} from "provider/actions/mobile";

const mobileReducer = (state, action) => {
	switch (action.type) {
		case CHANGE_IS_MOBILE:
			return action.payload;
		default:
			return state;
	}
};

export default mobileReducer;
