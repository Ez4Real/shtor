import React from 'react';
import {translations} from "info";
import useAPI from "provider/useAPI";
import './Description.css'

const Description = ({description, currentSize}) => {
	const {state: {lang}} = useAPI();
	return (
		<div className="tabs-description">
			<div className="tab-buttons">
				<button className="tab-button active">
					{translations.product.description[lang]}
				</button>
				<a className="tab-button" href="/care" target="_blank">
					{translations.infoPages.care.title[lang]}
				</a>
			</div>
			<div className="tab-content">
				<ul>
					{description?.map(string => (
						<li key={string}>{string}</li>
					))}
					{currentSize
						? <li>
							{translations.product.size.title[lang]}: {currentSize} {translations.product.size.cm[lang]}
						</li>
						: ""
					}
				</ul>
			</div>
		</div>
	);
};

export default Description;
