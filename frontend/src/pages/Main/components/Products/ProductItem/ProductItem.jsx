import React from 'react';
import {Link} from "react-router-dom";
import './ProductItem.css'
import useAPI from "../../../../../provider/useAPI";
import capitalizeFirstLetter from "../../../../../utils/capitalizeFirstLetter";
import {getProductImageName, getProductImageNameHover, getProductName} from "../../../../../utils/getProduct";
import ProductImage from "../../../../../ui-components/ProductImage";
import {translations} from "../../../../../info";
import {formatPrice} from "../../../../../utils/formatPrice";

const ProductItem = ({product}) => {

	const { state: { lang, currency } } = useAPI()
	const { group, price, variations, link } = product

	const imageName = getProductImageName(product)
	const hoverImageName = getProductImageNameHover(product)

	return (
		<Link to={product.inStock ? link : "#"} className={`product-list__item ${!product.inStock ? 'empty' : ''}`}>

			<div className="image__container">
				<ProductImage className="image" imageName={getProductImageName(product)} alt="product list item image"/>
				{imageName !== hoverImageName ? <ProductImage className="hover-image" imageName={getProductImageNameHover(product)} alt="product item image hover"/> : ""}
				{!product.inStock && (<div className="outOfStock">
					{translations.product.outOfStock[lang]}
				</div>)}
			</div>

			<div className="product-list__item-info">

				<h3>{group}/{capitalizeFirstLetter(getProductName(product, lang))}</h3>

				<p>{translations.currencySymbol[currency]}{formatPrice(price?.[lang] || variations[0].price[lang])}</p>

			</div>
		</Link>
	);
};

export default ProductItem;
