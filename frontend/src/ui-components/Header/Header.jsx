import React, {useEffect, useState} from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ReactComponent as CartIcon } from 'assets/cart.svg';
import { ReactComponent as MenuIcon } from 'assets/menu.svg';
import { ReactComponent as CrossIcon } from 'assets/cross.svg';
import logo from 'assets/logo.png';
import { CHANGE_LANG } from 'provider/actions/lang';

import './Header.css';
import {translations} from "../../info";
import useAPI from "../../provider/useAPI";
import FooterLinks, {HEADER_MENU} from "../FooterLinks";
import {CHANGE_CURRENCY} from "../../provider/actions/currency";

const Header = () => {
    const { state: { lang, cart, isMobile }, dispatch} = useAPI();
    const location = useLocation();
    const [isOpenMenu, setIsOpenMenu] = useState(false)

    const addBodyNoScroll = () => document.body.classList.add("no__moves-buddy")
    const removeBodyNoScroll = () => document.body.classList.remove("no__moves-buddy")
    const closeMenu = (e) => {
        if (isMobile) {
            if (!e || !e.target.classList.contains('main-language')) {
                setIsOpenMenu(false);
                removeBodyNoScroll();
            }
        }
    };

    const openMenu = () => {
        if (isMobile) {
            setIsOpenMenu(true)
            addBodyNoScroll()
        }
    }

    const toggleLanguage = () => {
        dispatch({ type: CHANGE_CURRENCY, payload: lang === 'en' ? 'uah' : 'usd' });
        dispatch({ type: CHANGE_LANG, payload: lang === 'en' ? 'ua' : 'en' });
    }

    const isMainPage = location.pathname === '/'

    const sumOfQuantities = cart.reduce((accumulator, currentObject) => {
        return accumulator + currentObject.quantity;
    }, 0);

    useEffect(() => {
        closeMenu()
    }, [isMobile])

    return (
        <header className={`header ${isMainPage ? 'absolute' : ''}`}>
            {!isMobile && (
                <nav>
                    <NavLink to="/#about-us">{translations.header.aboutUs[lang]}</NavLink>
                    <NavLink to="/#product-list">{translations.header.shop[lang]}</NavLink>
                </nav>
            )}
            <NavLink to="/" className="logo">
                <img src={logo} alt="logo" />
            </NavLink>
            {isMobile ? (
                <>
                    <MenuIcon className="menu" onClick={openMenu} />
                    <div className={`menu__container-mobile ${isOpenMenu ? 'opened' : ''}`} onClick={closeMenu}>
                        <div className="menu-link-mobile__container">
                            <CrossIcon className="cross-icon"/>
                            <NavLink className="nav-link" to="/#about-us" onClick={closeMenu}>{translations.header.aboutUs[lang]}</NavLink>
                            <NavLink className="nav-link" to="/#product-list" onClick={closeMenu}>{translations.header.shop[lang]}</NavLink>
                            <a className="nav-link" href="https://t.me/gala_butnotdalis" target="_blank">{translations.header.chat[lang]}</a>
                        </div>
                        <div className="menu-footer-mobile__container">
                            <FooterLinks type={HEADER_MENU}/>
                        </div>
                    </div>
                    <NavLink className="nav-link-menu cart-link" onClick={closeMenu} to="/cart">
                        <span className="cart-icon__container">
                            <CartIcon />
                            <bdi className="cart-count">{sumOfQuantities ? sumOfQuantities : ''}</bdi>
                        </span>
                    </NavLink>
                </>
            ) : (
                <div className="lang-cart">
                    <button className="change__language" onClick={toggleLanguage}>
                        {lang}
                    </button>
                    <NavLink className="cart-link" to="/cart">
                        <span className="cart-icon__container">
                            <CartIcon />
                            <bdi className="cart-count">{sumOfQuantities ? sumOfQuantities : ''}</bdi>
                        </span>
                    </NavLink>
                </div>
            )}
        </header>
    );
};

export default Header;
