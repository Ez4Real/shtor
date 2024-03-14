import { ADD_PRODUCTS } from "provider/actions/products";
import {sortProducts} from "../../utils/sortProducts";

const PRODUCTS_TO_SPREAD_VARIATIONS_FOR_LIST = [
	"намисто з мушлями"
]


const productsReducer = (state, action) => {
	switch (action.type) {
		case ADD_PRODUCTS:
			return Array.isArray(action.payload)
				? action.payload
					.map(item => ({...item, link: `/${item._id}`}))
					.sort((a, b) => a.orderIndex - b.orderIndex)
				: [];
		default:
			return state;
	}
};

export default productsReducer;
