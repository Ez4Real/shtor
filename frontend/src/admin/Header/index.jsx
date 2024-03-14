import React, {useState} from 'react';
import './Header.css'
import logo from '../../assets/logo.png';
import useAPI from "../../provider/useAPI";
import {CHANGE_LANG} from "../../provider/actions/lang";
import {CHANGE_CURRENCY} from "../../provider/actions/currency";

const Header = () => {

	const [isOpenedMenu, setIsOpenedMenu] = useState(false);
	const {state: {lang, currency}, dispatch} = useAPI();

	const toggleLanguage = (payload) => dispatch({ type: CHANGE_LANG, payload});

	const toggleCurrency = (payload) => dispatch({ type: CHANGE_CURRENCY, payload});

	return (
		<header className="header__admin">
			<img src={logo} alt="logo" className="logo"/>
			<div className="lang_currency">
				{/*<button className={`change__value currency ${currency === 'uah' ? 'active' : ''}`} onClick={() => toggleCurrency('uah')}>uah</button>*/}
				{/*|*/}
				{/*<button className={`change__value currency ${currency === 'usd' ? 'active' : ''}`} onClick={() => toggleCurrency('usd')}>usd</button>*/}
				{/*|*/}
				{/*<button className={`change__value currency ${currency === 'eur' ? 'active' : ''}`} onClick={() => toggleCurrency('eur')}>eur</button>*/}
				<button className={`change__value language ml20 ${lang === 'ua' ? 'active' : ''}`} onClick={() => {
					toggleLanguage('ua')
					toggleCurrency('uah')
				}}>ua</button>
				|
				<button className={`change__value language ${lang === 'en' ? 'active' : ''}`} onClick={() => {
					toggleLanguage('en')
					toggleCurrency('usd')
				}}>en</button>
			</div>
		</header>
	);
};

export default Header;
