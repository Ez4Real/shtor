import React, {useEffect} from 'react';
import useAPI from "provider/useAPI";

import './ShoppingCart.css'
import CartProducts from "./CartProducts/CartProducts";
import CartTotal from "./CartTotal/CartTotal";
import {Link} from "react-router-dom";
import {useHistory} from "react-router-dom";
import {translations} from "../../info";

const ShoppingCart = () => {
	const history = useHistory()
	const {state: {cart, lang}} = useAPI()

	const orderPrice = cart.reduce((accumulator, currentObject) => {
		return accumulator + (currentObject?.price?.[lang] * currentObject?.quantity);
	}, 0);


	const orderDesc = cart?.map(({ name, quantity }) => `${name[lang]} x${quantity}`).join(' ')

	const onCheckoutClick = () => {
		history.push('/checkout')
	};


	if (cart.length) {
		return (
			<div className="cart-wrapper">

				<h2 className="client__title">{translations.cart.title[lang]}</h2>

				<div className="cart-container">

					<CartProducts/>

					<CartTotal sumOfPrices={orderPrice} checkoutOnClick={onCheckoutClick}/>

				</div>

			</div>
		);
	}

	return (
		<div className="empty-cart">
			<h2 className="title">{translations.cart.title[lang]}</h2>
			<p className="cart-description">{translations.cart.empty[lang]}</p>
			<Link to={'/#product-list'} className="cart-button__continue-shopping">{translations.cart.continueShopping[lang]}</Link>
		</div>
	)
}

export default React.memo(ShoppingCart);
