// Header.js
import React, {useState} from 'react';
import {Link} from "react-router-dom";
import FooterLogo from "assets/logo-black.png";
import FooterIcon from "assets/arrow-email.svg";
import './Footer.css';
import FooterLinks from "../FooterLinks";
import api from "../../api";
import CheckIcon from "@mui/icons-material/Check";
import {translations} from "../../info";
import useAPI from "../../provider/useAPI";


const Footer = () => {
	const [email, setEmail] = useState('');
	const [error, setError] = useState(false);
	const [focus, setFocus] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { state: {lang}} = useAPI();

	const reqSubscribe = () => api.subscribe.subscribe.activation({email})

	function isValidEmail(email) {
		return /\S+@\S+\.\S+/.test(email);
	}

	const onChange = (e) => {
		const inputEmail = e.target.value;
		setEmail(inputEmail);
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		setError(false);
		setIsLoading(true)

		try {
			await reqSubscribe()
			setIsSuccess(true)
		} catch (error) {
			setError(true);
			console.error('Subscribe failed:', error);
		} finally {
			setIsLoading(false)
			setTimeout(() => {
				setError(false);
				setIsSuccess(false)
				setEmail('')
			}, 2500)
		}
	};

	return (
		<footer className="footer">
			<div className="footer-logo">
				<Link to="/" className='homeBtn'>
					<img src={FooterLogo} alt="footer-main__logo"/>
				</Link>
				<p className="footer-title">{translations.footer.stayInformed[lang]}</p>
				<form method='POST' onSubmit={onSubmit}>
					<div className={`email-input ${isSuccess ? 'success' : ''} ${error ? 'error' : ''}`}>
						<input
							className="email-send"
							type="email"
							placeholder="Email"
							value={isSuccess || error ? translations.footer[isSuccess ? 'thanksSubscribe' : 'tryAgain'][lang] : email}
							onChange={onChange}
							disabled={isSuccess || isLoading}
							onFocus={() => setFocus(true)}
							onBlur={() => setFocus(false)}
						/>
						{focus || isSuccess || error ? "" : <img className="icon-img" src={FooterIcon} alt="icon-arrow" onClick={onSubmit}/>}
					</div>
				</form>
			</div>
			<FooterLinks/>
		</footer>
	);
};

export default Footer;
