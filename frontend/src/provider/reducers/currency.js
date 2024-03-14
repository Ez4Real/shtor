import {
	CHANGE_CURRENCY,
} from "provider/actions/currency";

const currencyReducer = (state, action) => {
	switch (action.type) {
		case CHANGE_CURRENCY:
			return action.payload;
		default:
			return state;
	}
};

export default currencyReducer;
