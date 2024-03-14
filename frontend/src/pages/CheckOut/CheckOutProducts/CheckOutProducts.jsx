import React, {useMemo, useState} from 'react';
import useAPI from "provider/useAPI";
import {
	DECREMENT_PRODUCT,
	DELETE_PRODUCT,
	INCREMENT_PRODUCT
} from "provider/actions/cart";

import {ReactComponent as Cross} from "assets/cross.svg";

import './CheckOutProducts.css'
import {translations} from "info";
import ProductImage from "ui-components/ProductImage";
import {getProductImageName} from "utils/getProduct";
import DeletePopUp from "../../../ui-components/DeletePopUp";
import {formatDesc} from "../../ShoppingCart/CartProducts/CartProducts";

const MINUS = 'MINUS'
const PLUS = 'PLUS'

const CheckOutProducts = () => {

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

	const currencySymbol = translations.currencySymbol[currency];

	return (
		<div className="checkout-products">
			{cart.map((item, index) => (
				<div className="checkout-product" key={index}>
					<div className="custom-img">
						<ProductImage imageName={item?.image} alt="product" className="checkout-product__img"/>
					</div>
					<div className="checkout-product-desc">
						{!isMobile
							? <>
								<h4 className="checkout-product__title"><strong>{item.group}</strong>/ {item.name[lang]}</h4>
								<p className="checkout-product__desc">
									{formatDesc(item.description[lang])}/ <strong>{item.size}</strong>
									{item?.color?.length ? `/ ${item.color}` : "" }
									{item?.attachment ? `/ ${item.attachment}` : "" }
								</p>
								<div className="checkout-product__quantity">
									<div className="checkout-product__quantity-label">
										<button className="minus" onClick={() => onChangeQuantity(index, MINUS)}>-</button>
										{item.quantity}
										<button className="plus"  onClick={() => onChangeQuantity(index, PLUS)}>+</button>
									</div>
									<div className="price">{currencySymbol}{item.price[lang] * item.quantity}</div>
								</div>
							</>
							: <>
								<div className="top">
									<h4 className="checkout-product__title"><strong>{item.group}</strong>/ {item.name[lang]}</h4>
									<p className="checkout-product__desc">{formatDesc(item.description[lang])}/ <strong>{item.size}</strong>{item?.color?.length ? `/ ${item.color}` : "" }</p>
								</div>
								<div className="bottom">
									<div className="checkout-product__quantity">
										<div className="checkout-product__quantity-label">
											<button className="minus" onClick={() => onChangeQuantity(index, MINUS)}>-</button>
											{item.quantity}
											<button className="plus"  onClick={() => onChangeQuantity(index, PLUS)}>+</button>
										</div>
										<div className="price">{currencySymbol}{item.price[lang] * item.quantity}</div>
									</div>
								</div>
							</>
						}

						<Cross className="cross" onClick={() => deleteProductFromCart(index)}/>
					</div>
				</div>
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

export default React.memo(CheckOutProducts);
