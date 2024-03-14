import React, {useState} from 'react';
import './FooterLinks.css'
import FooterIcon from "../../assets/arrow-email.svg";
import {Link} from "react-router-dom";
import {PaymentAndDeliveryTitle, PrivacyPolicyTitle, ReturnsAndExchangeTitle, translations} from "info";
import useAPI from "provider/useAPI";
import {CHANGE_LANG} from "provider/actions/lang";
import {ReactComponent as InstIcon} from "assets/inst.svg";
import currency from "../../provider/reducers/currency";
import {CHANGE_CURRENCY} from "../../provider/actions/currency";

export const HEADER_MENU = 'HEADER_MENU'
export const LANGUAGES = [
	'UA/UAH',
	'EN/USD',
	'EN/EUR',
]

const FooterLinks = ({ type }) => {
	const {state: { lang, currency }, dispatch} = useAPI();
	const [showMenu, setShowMenu] = useState(false);

	const fullSetting = `${lang.toUpperCase()}/${currency.toUpperCase()}`;

	const changeItem = (langItem) => {
		const [langPart, currencyPart] = langItem.split('/');
		setShowMenu(false)
		dispatch({
			type: CHANGE_LANG,
			payload: langPart.toLowerCase(),
		})
		dispatch({
			type: CHANGE_CURRENCY,
			payload: currencyPart.toLowerCase(),
		})
	}

	const toggleMenu = () => setShowMenu(curMenu => !curMenu)

	return (
		<>
			<div className="footer-links">
				<Link className="links-text" to={'/privacy-policy'}>
					<PrivacyPolicyTitle lang={lang}/>
				</Link>
				<Link className="links-text" to={'/payment-and-delivery'}>
					<PaymentAndDeliveryTitle lang={lang}/>
				</Link>
				<Link className="links-text" to={'/returns'}>
					<ReturnsAndExchangeTitle lang={lang}/>
				</Link>
				<a className="links-text" href="https://t.me/gala_butnotdalis" target="_blank">
					{translations.header.chat[lang]}
				</a>
			</div>
			<div className="footer-links social">
				{type === HEADER_MENU
					? <>
						<a className="link-instagram" href="https://www.instagram.com/shtorsstore/" target="_blank">
							<InstIcon className="custom-language-icon"/>
						</a>
						<div className={`custom-language ${showMenu ? 'active' : ''}`}>
							<span className="language__menu-item main-language" onClick={toggleMenu}>{fullSetting}</span>
							<div className="custom-language__menu">
								{LANGUAGES.filter(langItem => langItem !== fullSetting).map(langItem =>
									<span className="language__menu-item" onClick={() => changeItem(langItem)}>{langItem}</span>
								)}
							</div>
						</div>
					</>
					: <>
						<div className={`custom-language ${showMenu ? 'active' : ''}`}>
							<span className="language__menu-item main-language" onClick={toggleMenu}>{fullSetting}</span>
							<div className="custom-language__menu">
								{LANGUAGES.filter(langItem => langItem !== fullSetting).map(langItem =>
									<span className="language__menu-item" onClick={() => changeItem(langItem)}>{langItem}</span>
								)}
							</div>
						</div>
						<a className="link-instagram" href="https://www.instagram.com/shtorsstore/" target="_blank">
							INSTAGRAM
						</a>
					</>
				}
			</div>
		</>
	);
};

export default FooterLinks;
