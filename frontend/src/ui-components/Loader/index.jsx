import React from 'react';
import {ReactComponent as LoaderIcon} from "assets/admin/Vanilla-1s-280px.svg";
import './Loader.css'

const Loader = ({isActive, opacity, className}) => {
	return (
		<div className={`loader__wrapper ${className ? className : ""} ${isActive ? "active" : ""}`} style={{opacity}}>
			<div className="loader__container">
				<LoaderIcon/>
			</div>
		</div>
	);
};

export default Loader;
