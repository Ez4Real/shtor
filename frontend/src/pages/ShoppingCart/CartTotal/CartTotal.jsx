import React from 'react';

import './CartTotal.css'
import useAPI from "provider/useAPI";
import {translations} from "info";
import {formatPrice} from "../../../utils/formatPrice";

const CartTotal = (props) => {
	const {state: {lang, currency}} = useAPI();
	const currencyValue = translations.currencySymbol[currency];
	return (
		<div className="cart-total">
			<h4 className="cart-total__subtotal">{translations.cart.subTotal[lang]} <span>{currencyValue}{ formatPrice(props.sumOfPrices) }</span></h4>
			<p className="cart-total__total">{translations.cart.total[lang]}: <span>{currencyValue}{ formatPrice(props.sumOfPrices) }</span></p>
			<button className="cart-total__check-out" onClick={props.checkoutOnClick}>
				{translations.cart.checkOut[lang]}
				<span className="deliveryHint">{translations.cart.deliveryHint[lang]}</span>
			</button>

		</div>

	);
};

export default CartTotal;
