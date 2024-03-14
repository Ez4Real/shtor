import React from 'react';

import './CheckOutTotal.css'
import useAPI from "provider/useAPI";
import {translations} from "info";
import {formatPrice} from "../../../utils/formatPrice";

const CheckOutTotal = (props) => {
	const {state: {lang, currency}} = useAPI();

	const currencySymbol = translations.currencySymbol[currency]

	return (
		<div className="checkout-total">
			<h4 className="checkout-total__subtotal">
				{translations.cart.subTotal[lang]}
				<span>{currencySymbol}{formatPrice(props.sumOfPrices)}</span>
			</h4>
			<h4 className="checkout-total__subtotal">
				{translations.cart.delivery[lang]}
				<span>{props.deliveryPrice ? `${currencySymbol}${props.deliveryPrice}` : translations.cart.free[lang]}</span>
			</h4>
			<p className="checkout-total__total">
				{translations.cart.total[lang]}:
				<span><bdi>{currency.toUpperCase()}</bdi> {currencySymbol}{formatPrice(props.sumOfPrices + props.deliveryPrice)}</span>
			</p>
		</div>

	);
};

export default CheckOutTotal;
