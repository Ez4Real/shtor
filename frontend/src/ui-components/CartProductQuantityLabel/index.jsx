import React from 'react';
import './CartProductQuantityLabel.css'
import useAPI from "../../provider/useAPI";
import {DECREMENT_PRODUCT, DELETE_PRODUCT, INCREMENT_PRODUCT} from "../../provider/actions/cart";
import {translations} from "../../info";

const MINUS = 'MINUS'
const PLUS = 'PLUS'

const CartProductQuantityLabel = ({item}) => {
	const {state: {cart, lang}, dispatch} = useAPI();

	const onChangeQuantity = (_id, sign) => dispatch({
		type: sign === 'MINUS' ? DECREMENT_PRODUCT : INCREMENT_PRODUCT,
		payload: _id,
	});

	const deleteProductFromCart = (_id) => dispatch({
		type: DELETE_PRODUCT,
		payload: _id,
	})

	const currency = translations.product.currency[lang]

	return (
		<>
			<div className="cart-product__quantity">
				{translations.cart.quantity[lang]}
				<div className="cart-product__quantity-label">
					<button className="minus" onClick={() => onChangeQuantity(item, MINUS)}>-</button>
					{item.quantity}
					<button className="plus"  onClick={() => onChangeQuantity(item, PLUS)}>+</button>
				</div>
			</div>
			<div className="price">{currency}{item.price[lang] * item.quantity}</div>
		</>
	);
};

export default CartProductQuantityLabel;
