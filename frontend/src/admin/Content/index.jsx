import React from 'react';
import './Content.css'
import {Route, Switch} from "react-router-dom";
import {ORDERS, PRODUCTS} from "./ProductsPage";
import ProductsPage from "./ProductsPage";
import ProductForm from "./ProductForm";
import Orders from "./Orders/Orders";

const Content = ({orderList}) => {
	return (
		<div className="content__container">
			<Switch>
				<Route path="/admin" exact component={ProductsPage} />
				{/*<Route path="/admin/add" component={ProductForm} />*/}
				<Route path="/admin/orders" exact render={() => <Orders />} />
				<Route path="/admin/orders/:id" render={(props) => <Orders {...props} />} />
				<Route path="/admin/:id" component={ProductsPage} />
			</Switch>
		</div>
	);
};

export default React.memo(Content);
