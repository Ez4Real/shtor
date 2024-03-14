import {
	ADD_PRODUCT,
	DELETE_PRODUCT,
	INCREMENT_PRODUCT,
	DECREMENT_PRODUCT
} from "provider/actions/cart";

function areSimilarExceptQuantity(obj1, obj2) {
	const keys1 = Object.keys(obj1).filter(key => key !== 'quantity');
	const keys2 = Object.keys(obj2).filter(key => key !== 'quantity');

	if (keys1.length !== keys2.length || !keys1.every(key => keys2.includes(key))) {
		return false; // Different keys, not similar
	}
	return keys1.every(key => obj1[key] === obj2[key]);
}

const cartReducer = (state, action) => {
	switch (action.type) {
		case INCREMENT_PRODUCT:
			return state.map((item, index) =>
				index === action.payload
					? { ...item, quantity: item.quantity + 1 }
					: item
			);
		case DECREMENT_PRODUCT:
			return state.map((item, index) =>
				index === action.payload
					? { ...item, quantity: item.quantity - 1 }
					: item
			).filter(item => item.quantity); // Filter out items with quantity equal to 1

		case ADD_PRODUCT:
			const existingProductIndex = state.findIndex(item => areSimilarExceptQuantity(item, action.payload));
			if (existingProductIndex !== -1) {
				return state.map((item, index) => ({
					...item,
					quantity: index === existingProductIndex
						? item.quantity + action.payload.quantity
						: item.quantity
					})
				);
			} else return [...state, { ...action.payload, quantity: action.payload.quantity }];
		case DELETE_PRODUCT:
			return state.filter((item, index) => index !== action.payload);
		default:
			return state;
	}
};

export default cartReducer;
