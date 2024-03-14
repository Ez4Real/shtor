import React from 'react';
import './UTP.css';
import {translations} from "../../../../info";
import useAPI from "../../../../provider/useAPI";

const Utp = () => {
	const {state: {lang}} = useAPI();
	return (
		<div className="utp" id="about-us">
			<h1>THE WOMAN<br/>U ARE</h1>
			<p>{translations.main.utp[lang].split('\n').map((line, index) => (
				<React.Fragment key={index}>
					{line}
					<br />
				</React.Fragment>
			))}</p>
		</div>
	);
};

export default Utp;
