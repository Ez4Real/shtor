import React, {useState} from 'react';
import useAPI from "provider/useAPI";
import {DECREMENT_PRODUCT, INCREMENT_PRODUCT} from "provider/actions/cart";

import {ReactComponent as Cross} from "assets/cross.svg";

import './CartProducts.css'
import {translations} from "info";
import ProductImage from "ui-components/ProductImage";
import {getProductImageName} from "utils/getProduct";
import DeletePopUp from "../../../ui-components/DeletePopUp";
import {formatPrice} from "../../../utils/formatPrice";

const MINUS = 'MINUS'
const PLUS = 'PLUS'


export const formatDesc = (description) => {
	// Find the index of the first newline character
	const newlineIndex = description.indexOf('\n');

	// Find the index of the first dot
	const dotIndex = description.indexOf('.');

	// Determine where to slice the string
	let sliceIndex;
	if (newlineIndex !== -1 && dotIndex !== -1) {
		sliceIndex = Math.min(newlineIndex, dotIndex); // Slice at the earlier occurrence
	} else {
		sliceIndex = newlineIndex !== -1 ? newlineIndex : dotIndex; // Slice at the occurrence found
	}

	// If a slice index is found, slice the string before it
	if (sliceIndex !== -1) {
		return description.slice(0, sliceIndex);
	} else {
		// If neither dot nor newline is found, return the original string
		return description;
	}
};

const CartProducts = () => {

	const {state: {cart, lang, isMobile, currency}, dispatch} = useAPI();
	const [deleteIndex, setDeleteIndex] = useState(-1);

	const onChangeQuantity = (index, sign) => {
		if (cart[index].quantity === 1 && sign === MINUS) setDeleteIndex(index)
		else dispatch({
			type: sign === MINUS ? DECREMENT_PRODUCT : INCREMENT_PRODUCT,
			payload: index,
		});
	}

	const deleteProductFromCart = (index) => setDeleteIndex(index);
	const currencyValue = translations.currencySymbol[currency]

	return (
		<div className="cart-products">
			{cart.map((item, index) => (
				<>
					{isMobile && (<h4 className="cart-product__title"><strong>{item.group}</strong>/{item.name[lang]}</h4>)}
					<div className="cart-product" key={index}>
						<div className="cart-product__img__container">
							<ProductImage imageName={getProductImageName(item)} alt="product" className="cart-product__img"/>
						</div>
						<div className="cart-product-desc">
							{!isMobile
								? <>
									<h4 className="cart-product__title"><strong>{item.group}</strong>/ {item.name[lang]}</h4>
									<p className="cart-product__desc">
										{formatDesc(item.description[lang])}
									</p>
									{item?.attachment && (<p className="cart-product__desc">
										{item?.attachment ? `/ ${translations.cart.attachment[lang](item.attachment)}` : ''}
									</p>)}
									{item.size && (<p className="cart-product__desc">
										{item.size} {translations.product.size.cm[lang]}
									</p>)}
									<div className="cart-product__quantity">
										{translations.cart.quantity[lang]}
										<div className="cart-product__quantity-label">
											<button className="minus" onClick={() => onChangeQuantity(index, MINUS)}>-</button>
											{item.quantity}
											<button className="plus"  onClick={() => onChangeQuantity(index, PLUS)}>+</button>
										</div>
									</div>
									<div className="price">{currencyValue}{formatPrice(item.price[lang] * item.quantity)}</div>
								</>
								: <>
									<div className="top">
										{item.name.ua !== "Браслет-підвіс" && (<p className="cart-product__desc">
											{formatDesc(item.description[lang])}
										</p>)}
										{item?.attachment && (<p className="cart-product__desc">
											{item?.attachment ? `/ ${translations.cart.attachment[lang](item.attachment)}` : ''}
										</p>)}
										{item.size && (<p className="cart-product__desc">
											{item.size} {translations.product.size.cm[lang]}
										</p>)}
									</div>
									<div className="bottom">
										<div className="cart-product__quantity">
											{translations.cart.quantity[lang]}
											<div className="cart-product__quantity-label">
												<button className="minus" onClick={() => onChangeQuantity(index, MINUS)}>-</button>
												{item.quantity}
												<button className="plus"  onClick={() => onChangeQuantity(index, PLUS)}>+</button>
											</div>
										</div>
										<div className="price">{currencyValue}{formatPrice(item.price[lang] * item.quantity)}</div>
									</div>
								</>
							}

							<Cross className="cross" onClick={() => deleteProductFromCart(index)}/>
						</div>
					</div>
				</>
			))}
			{deleteIndex !== -1
				? <DeletePopUp
					isActive={<><strong>{cart[deleteIndex].group}</strong>/ {cart[deleteIndex].name[lang]}</>}
					onYes={() => {
						dispatch({
							type: DECREMENT_PRODUCT,
							payload: deleteIndex,
						})
						setDeleteIndex(-1)
					}}
					onNo={() => {
						setDeleteIndex(-1)
					}}
				/>
				: ""
			}
		</div>
	);
};

export default React.memo(CartProducts);
