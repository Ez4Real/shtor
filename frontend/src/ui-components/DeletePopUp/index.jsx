import React from 'react';
import './DeletePopUp.css'
import {ReactComponent as Cross} from 'assets/cross.svg'
import {translations} from "../../info";
import useAPI from "../../provider/useAPI";
import Button from "@mui/material/Button";

const DeletePopUp = ({isActive, onYes, onNo, from, alertText}) => {
	const {state: {lang}} = useAPI();
	return (
		<div className={`delete-pop-up__container ${isActive ? 'active' : ""}`}>
			<div className="delete-wrapper">
				<Cross onClick={onNo} className="cross"/>
				<p>{alertText ? alertText : translations.cart.delete[lang]}</p>
				<p>{isActive ? isActive : ''} {from ? from : translations.cart.fromCart[lang]}</p>
				<div className="buttons">
					<Button className="no" onClick={onNo}>{translations.no[lang]}</Button>
					<Button className="yes" onClick={onYes}>{translations.yes[lang]}</Button>
				</div>
			</div>
		</div>
	);
};

export default DeletePopUp;
