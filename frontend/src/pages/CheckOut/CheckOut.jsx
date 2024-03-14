import React, {useEffect, useMemo, useState} from 'react';
import useAPI from "provider/useAPI";

import './CheckOut.css'
import CartProducts from "./CheckOutProducts/CheckOutProducts";
import CheckOutTotal from "./CheckOutTotal/CheckOutTotal";
import {Link} from "react-router-dom";
import {countries, translations} from "../../info";
import CustomRadio from "../../ui-components/CustomRadio";
import {Button} from "@mui/material";
import api from "../../api";
import DeletePopUp from "../../ui-components/DeletePopUp";
import {DECREMENT_PRODUCT} from "../../provider/actions/cart";
import {appURL} from "../../config";

const basicDelivery = {
	countryRegion: '',
	firstName: '',
	lastName: '',
	address: '',
	additional: '',
	postalCode: '',
	city: '',
	phone: '',
}

const fondyOptions = {
	methods: ['card', 'wallets'],
	methods_disabled: ['banklinks_eu', 'local_methods', 'installments', 'most_popular'],
	card_icons: ['mastercard', 'visa', 'prostir'],
	active_tab: 'card',
	fields: false,
	title: 'Shtor payment',
	link: 'https://fondy.ua',
	full_screen: true,
	button: true,
	email: true,
	theme: {
		type: "light",
		preset: "solid_black"
	},
	logo_url: "data:image/png;base64,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",
}

const CheckOut = () => {
	const {state: {cart, lang, isMobile, currency}} = useAPI()
	const [isPaying, setIsPaying] = useState(false);
	const [showError, setShowError] = useState(false);
	const [deliveryDetails, setDeliveryDetails] = useState(basicDelivery)
	const [billingDetails, setBillingDetails] = useState(basicDelivery)

	const [isAddDetails, setIsAddDetails] = useState(false);
	const [sameBillingDetails, setSameBillingDetails] = useState(true);
	const [addBillingDet, setAddBillingDet] = useState(false)

	const orderPrice = cart.reduce((accumulator, currentObject) => {
		return accumulator + (currentObject?.price?.[lang] * currentObject?.quantity);
	}, 0);

	const [isUAShipping, setIsUAShipping] = useState(lang === 'ua');
	const deliveryPrice = useMemo(() => isUAShipping ? 0 : translations.cart.internationalDeliveryPrice[lang] , [isUAShipping, lang])

	const orderDesc = cart?.map(({name, quantity}) => `${name[lang]} x${quantity}`).join(' ')

	const Options = (order_id) => ({
		options: fondyOptions,
		params: {
			merchant_id: Number(process.env.REACT_APP_MERCH_ID),
			// merchant_id: process.env.REACT_APP_TEST_MERCH_ID,
			order_id,
			currency: currency.toUpperCase(),
			amount: (orderPrice + deliveryPrice) * 100,
			// amount: 100,
			order_desc: orderDesc,
			lang: lang === 'ua' ? 'uk' : 'en',
			response_url: appURL + '/api/orders/send-order-details',
		}
	})

	const loadFondyScript = () => {
		const script = document.createElement('script');
		script.src = 'https://pay.fondy.eu/latest/checkout-vue/checkout.js';
		script.async = true;

		script.onload = () => {
			const fondy = window.fondy;
			fondy("#checkout-container", Options(Date.now()));
		};

		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		};
	};

	useEffect(() => loadFondyScript(), []);

	const hasErrors = Object.entries(deliveryDetails).some(([key, value]) => key !== 'additional' && !value) ||
		(!sameBillingDetails && Object.entries(billingDetails).some(([key, value]) => key !== 'additional' && !value));

	const onCheckoutClick = () => {
		const newOrderId = `shtor_order_${Date.now()}`;
		if (!hasErrors) {
			const newOrder = {
				currency: currency.toUpperCase(),
				amount: orderPrice + deliveryPrice,
				orderDescription: orderDesc,
				language: lang === 'ua' ? 'uk' : 'en',
				products: cart,
				order_id: newOrderId,
				shippingInfo: {
					type: isUAShipping ? 'Ukraine' : 'International',
					delivery_price: deliveryPrice,
					...deliveryDetails,
				},
			};
			if(!sameBillingDetails) newOrder.billingAddress = billingDetails;
			api.order.create(newOrder);
			const fondy = window.fondy;
			fondy("#checkout-container", Options(newOrderId));
			setIsPaying(true);
		} setShowError(true)
	};

	if (cart.length) {

		const handleDeliveryDetailsChange = (e) => {
			const { name, value } = e.target;
			setDeliveryDetails(prevState => ({
				...prevState,
				[name]: value
			}));
		};

		const handleBillingDetailsChange = (e) => {
			const { name, value } = e.target;
			setBillingDetails(prevState => ({
				...prevState,
				[name]: value
			}));
		};

		const handleError = (value) => showError && !value ? "error" : ""

		return (
			<div className="checkout-wrapper">

				<h2 className="client__title">
					{/*{translations.cart.title[lang]}*/}
				</h2>

				<div className="checkout-container">

					<div className="left">
						<div className="part delivery">
							<h3>{translations.cart.delivery[lang]}</h3>
							<select name="countryRegion" className={`country-region ${handleError(deliveryDetails.countryRegion)}`} onChange={handleDeliveryDetailsChange}>
								<option disabled selected> {translations.cart.countryRegion[lang]}</option>
								{countries.map(item => <option value={item}>{item}</option>)}
							</select>
							<div className="double">
								<input required name="firstName" type="text" className={`firstName ${handleError(deliveryDetails.firstName)}`} placeholder={translations.cart.firstName[lang]} onChange={handleDeliveryDetailsChange}/>
								<input required name="lastName" type="text" className={`lastName ${handleError(deliveryDetails.lastName)}`} placeholder={translations.cart.lastName[lang]} onChange={handleDeliveryDetailsChange}/>
							</div>
							<input required name="address" type="text" className={`address ${handleError(deliveryDetails.address)}`} placeholder={translations.cart.address[lang]} onChange={handleDeliveryDetailsChange}/>
							<div className="add-details">
								{isAddDetails
									? <input name="additional" type="text" className={`additional ${handleError(deliveryDetails.additional)}`} placeholder={translations.cart.apartment[lang]} onChange={handleDeliveryDetailsChange}/>
									: <div className="click-me" onClick={() => setIsAddDetails(true)}>
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M12 7V17" stroke="#2A353D" stroke-linecap="round" stroke-linejoin="round"/>
											<path d="M7 12H17" stroke="#2A353D" stroke-linecap="round" stroke-linejoin="round"/>
										</svg>
										{translations.cart.addApartment[lang]}
									</div>
								}
							</div>
							<div className="double">
								<input required name="postalCode" type="text" className={`postalCode ${handleError(deliveryDetails.postalCode)}`} placeholder={translations.cart.postalCode[lang]} onChange={handleDeliveryDetailsChange}/>
								<input required name="city" type="text" className={`city ${handleError(deliveryDetails.city)}`} placeholder={translations.cart.city[lang]} onChange={handleDeliveryDetailsChange}/>
							</div>
							<input required name="phone" type="text" placeholder={translations.cart.phone[lang]} className={`phone ${handleError(deliveryDetails.phone)}`} onChange={handleDeliveryDetailsChange}/>
						</div>
						<div className="part shipping-method">
							<h3>{translations.cart.shippingMethod[lang]}</h3>
							{lang === "en"
								? <>
									<button className={isUAShipping ? "" : "active"} onClick={() => setIsUAShipping(false)}>
										<CustomRadio checked={!isUAShipping} showValue="UPS EXPRESS"/>
										<span>{translations.product.currency[lang]}{translations.cart.internationalDeliveryPrice[lang]}</span>
									</button>
									<button className={isUAShipping ? "active" : ""} onClick={() => setIsUAShipping(true)}>
										<CustomRadio checked={isUAShipping} showValue={translations.cart.novaPost[lang]}/>
										<span>{translations.cart.free[lang]}</span>
									</button>
								</>
								: <>
									<button className={isUAShipping ? "active" : ""} onClick={() => setIsUAShipping(true)}>
										<CustomRadio checked={isUAShipping} showValue={translations.cart.novaPost[lang]}/>
										<span>{translations.cart.free[lang]}</span>
									</button>
									<button className={isUAShipping ? "" : "active"} onClick={() => setIsUAShipping(false)}>
										<CustomRadio checked={!isUAShipping} showValue="UPS EXPRESS"/>
										<span>{translations.product.currency[lang]}{translations.cart.internationalDeliveryPrice[lang]}</span>
									</button>
								</>
							}
						</div>
						<div className="part billing-address">
							<h3>{translations.cart.billingAddress[lang]}</h3>
							<button className={sameBillingDetails ? "active" : ""} onClick={() => setSameBillingDetails(true)}>
								<CustomRadio showValue={translations.cart.sameAsShipping[lang]} checked={sameBillingDetails} onChange={() => setSameBillingDetails(true)}/>
							</button>
							<button className={sameBillingDetails ? "" : "active"} onClick={() => setSameBillingDetails(false)}>
								<CustomRadio showValue={translations.cart.useDifferentBilling[lang]} checked={!sameBillingDetails} onChange={() => setSameBillingDetails(false)}/>
							</button>
							{!sameBillingDetails
								? <div className="billing-details">
									<select name="countryRegion" className={`country-region ${handleError(billingDetails.countryRegion)}`} onChange={handleBillingDetailsChange}>
										<option disabled selected> {translations.cart.countryRegion[lang]}</option>
										{countries.map(item => (
											<option value={item}>{item}</option>))
										}
									</select>
									<div className="double">
										<input name="firstName" type="text" className={`firstName ${handleError(billingDetails.firstName)}`} placeholder={translations.cart.firstName[lang]} onChange={handleBillingDetailsChange}/>
										<input name="lastName" type="text" className={`lastName ${handleError(billingDetails.lastName)}`} placeholder={translations.cart.lastName[lang]} onChange={handleBillingDetailsChange}/>
									</div>
									<input name="address" type="text" className={`address ${handleError(billingDetails.address)}`} placeholder={translations.cart.address[lang]} onChange={handleBillingDetailsChange}/>
									<div className="add-details">
										{addBillingDet
											? <input name="additional" type="text" className={`additional ${handleError(billingDetails.additional)}`} placeholder={translations.cart.apartment[lang]} onChange={handleBillingDetailsChange}/>
											: <div className="click-me" onClick={() => setAddBillingDet(true)}>
												<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M12 7V17" stroke="#2A353D" stroke-linecap="round" stroke-linejoin="round"/>
													<path d="M7 12H17" stroke="#2A353D" stroke-linecap="round" stroke-linejoin="round"/>
												</svg>
												Add apartment,suite,etc.
											</div>
										}
									</div>
									<div className="double">
										<input name="postalCode" type="text" className={`postalCode ${handleError(billingDetails.postalCode)}`} placeholder={translations.cart.postalCode[lang]} onChange={handleBillingDetailsChange}/>
										<input name="city" type="text" className={`city ${handleError(billingDetails.lastName)}`} placeholder={translations.cart.city[lang]} onChange={handleBillingDetailsChange}/>
									</div>
									<input name="phone" type="text" placeholder={translations.cart.phone[lang]} className={`phone ${handleError(billingDetails.phone)}`} onChange={handleBillingDetailsChange}/>
								</div>
								: ""
							}
						</div>
						{isMobile ? "" : <Button className="pay" onClick={onCheckoutClick}>{translations.cart.checkOut[lang]}</Button>}
					</div>

					<div className="right">
						<CartProducts/>
						<CheckOutTotal deliveryPrice={deliveryPrice} sumOfPrices={orderPrice}/>
					</div>
					{isMobile ? <Button className="pay" onClick={onCheckoutClick}>{translations.cart.checkOut[lang]}</Button> : ""}
				</div>

				<div className={`payment-popup ${isPaying ? 'active' : ""}`}>
					<button className="back" onClick={() => setIsPaying(false)}>{translations.cart.back[lang]}</button>
					<div id="checkout-container"></div>
				</div>

			</div>
		);
	}

	return (
		<div className="empty-checkout">
			<h2 className="title">{translations.cart.title[lang]}</h2>
			<p className="checkout-description">{translations.cart.empty[lang]}</p>
			<Link to={'/#product-list'}
				  className="checkout-button__continue-shopping">{translations.cart.continueShopping[lang]}</Link>
		</div>
	)
}

export default React.memo(CheckOut);
