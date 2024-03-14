import {
	ADD_EMAIL,
} from "provider/actions/email";

const emailReducer = (state, action) => {
	switch (action.type) {
		case ADD_EMAIL:
			return action.payload;
		default:
			return state;
	}
};

export default emailReducer;
