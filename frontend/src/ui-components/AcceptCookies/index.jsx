import React, {useState} from 'react';
import './AcceptCookies.css'

const AcceptCookies = () => {
	const [isAccepted, setIsAccepted] = useState(localStorage.getItem('accept_cookies'));

	const acceptCookies = () => {
		localStorage.setItem('accept_cookies', true)
		setIsAccepted(true)
	}

	return (
		<div className={`cookies__overlay ${isAccepted ? 'accepted' : ''}`}>
			<div className="cookie__container">
				<p>We use cookies to provide you with a personalized shopping experience and to improve the quality of the website. To find out more, read our cookie policy.</p>
				<button className="cookies-accept" onClick={acceptCookies}>OK</button>
			</div>
		</div>
	);
};

export default AcceptCookies;
