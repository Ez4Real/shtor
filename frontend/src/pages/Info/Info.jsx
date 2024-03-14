import React from 'react';
import './Info.css'
import useAPI from "../../provider/useAPI";

const Info = ({title, text}) => {
	const {state: {lang}} = useAPI()
	return (
		<div className="info-page-wrapper">
			<h2 className="client__title">
				{title[lang]}
			</h2>
			{text[lang]}
		</div>
	);
};

export default Info;
