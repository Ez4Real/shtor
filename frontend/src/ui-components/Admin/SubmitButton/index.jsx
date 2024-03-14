import React from 'react';
import './SubmitButton.css'

const SubmitButton = ({text, onClick}) => {
	return (
		<button className="submit" type="submit" onClick={onClick}>{text}</button>
	);
};

export default SubmitButton;
