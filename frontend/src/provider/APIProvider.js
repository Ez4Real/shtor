import React, {useEffect, useMemo, useReducer, useState} from "react";
import {APIContext} from "./APIContext";
import langReducer from "provider/reducers/lang";
import cartReducer from "provider/reducers/cart";
import emailReducer from "./reducers/email";
import productsReducer from "./reducers/products";
import mobileReducer from "./reducers/mobile";
import {CHANGE_IS_MOBILE} from "./actions/mobile";
import currencyReducer from "./reducers/currency";
import api from "../api";
import {ADD_PRODUCTS} from "./actions/products";
import axios from "axios";
import {CHANGE_LANG} from "./actions/lang";
import {CHANGE_CURRENCY} from "./actions/currency";

const euroCountries = ['AT', 'BE', 'CY', 'EE', 'FI', 'FR', 'DE', 'GR', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PT', 'SK', 'SI', 'ES'];

const APIProvider = (props) => {

	const mediaQuery = window.matchMedia("(max-width: 768px)");
	const [state, dispatch] = useReducer(
		(state, action) => ({
			lang: langReducer(state.lang, action),
			currency: currencyReducer(state.currency, action),
			cart: cartReducer(state.cart, action),
			email: emailReducer(state.email, action),
			products: productsReducer(state.products, action),
			isMobile: mobileReducer(state.isMobile, action),
		}),
		{
			lang: 'ua',
			currency: 'uah',
			cart: [],
			email: '',
			products: [],
			isMobile: mediaQuery.matches,
		}
	);

	useEffect(() => {
		const fetchUserCountry = async () => {
			try {
				const {data: {country_code}} = await axios.get('https://ipapi.co/json/');
				if (euroCountries.includes(country_code)) {
					dispatch({
						type: CHANGE_LANG,
						payload: 'en',
					})
					dispatch({
						type: CHANGE_CURRENCY,
						payload: 'eur',
					})
				} else if (country_code !== 'UA') {
					dispatch({
						type: CHANGE_LANG,
						payload: 'en',
					})
					dispatch({
						type: CHANGE_CURRENCY,
						payload: 'usd',
					})
				}
			} catch (error) {
				console.error('Error fetching user country:', error);
			}
		};

		fetchUserCountry();
	}, []);

	const handleTabletChange = (e) => dispatch({
		type: CHANGE_IS_MOBILE,
		payload: !!e.matches
	});


	useEffect(()=> {
		mediaQuery.addListener(handleTabletChange);
		return () => {
			mediaQuery.removeListener(handleTabletChange)
		}
	},[])

	const getProducts = async () => {
		try {
			const {data: {data: payload}} = await api.products.get()
			dispatch({
				type: ADD_PRODUCTS,
				payload,
			})
		} catch (e) {
			console.error(e)
		}
	}
	useEffect(() => {getProducts()}, [])

	const contextValue = useMemo(
		() => ({state, dispatch}),
		[state, dispatch]
	);

	// console.log('lang', lang);
	// console.log('lang', lang);

	return (
		<APIContext.Provider value={contextValue}>
			{props.children}
		</APIContext.Provider>
	);
}

export default APIProvider
