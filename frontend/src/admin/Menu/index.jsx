import React from 'react';
import './Menu.css'
import {NavLink} from "react-router-dom";

const Menu = () => {

	return (
		<aside className="menu__container">
			<NavLink className="menu__container-link solo" exact to="/admin/"><i className="bi bi-eye"></i>Товари</NavLink>
			{/*<NavLink className="menu__container-link solo" to="/admin/add"><i className="bi bi-pencil-square"></i>Додати товар</NavLink>*/}
			<NavLink className="menu__container-link solo" to="/admin/orders"><i className="bi bi-cart-check"></i>Замовлення</NavLink>
		</aside>
	);
};

export default Menu;
