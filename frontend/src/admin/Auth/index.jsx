import React, {useState} from 'react';
import './Auth.css'
import {useHistory} from "react-router-dom";
import api from "../../api";
import useAPI from "provider/useAPI";
import {ADD_EMAIL} from "provider/actions/email";
import Loader from "ui-components/Loader";

const Auth = () => {
	const [form, setForm] = useState({
		email: "",
		password: "",
	});
	const {dispatch} = useAPI();
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const history = useHistory();

	const reqLogin = () => api.admin.auth.login(form)

	const onSubmit = (e) => {
		e.preventDefault();
		setIsLoading(true)

		setTimeout(() => {
			reqLogin()
				.then(r => {
					dispatch({
						type: ADD_EMAIL,
						payload: r.data.email
					})
					history.push('/admin');
				})
				.catch(e => {
					setIsError(true);
				})
				.finally(() => setIsLoading(false));
		}, 1000)
	}

	return (
		<div className="container-login100">
			<div className="wrap-login100">
				<form className={`login100-form validate-form ${isError ? "error" : ""}`} onSubmit={onSubmit}>
					<div className="login100-form-logo"/>
					<div className="wrap-input100 validate-input" data-validate="Enter username">
						<input
							value={form.email}
							onChange={(e) => {
								setIsError(false)
								setForm({...form, email: e.target.value})
							}}
							className="input100"
							type="text"
							name="username"
							placeholder="Логін"
							required
						/>
						<span className="focus-input100" data-placeholder=""></span>
					</div>
					<div className="wrap-input100 validate-input pass" data-validate="Enter password">
						<input
							value={form.password}
							onChange={(e) => {
								setIsError(false);
								setForm({...form, password: e.target.value})
							}}
							className="input100"
							type="password"
							name="pass"
							placeholder="Пароль"
							required
						/>
						<span className="focus-input100 pass" data-placeholder=""></span>
					</div>
					{isError ? <div className="error-message">*Невірні дані</div> : ""}
					<div className="container-login100-form-btn">
						<button className="login100-form-btn">
							Вхід
						</button>
					</div>
				</form>
				<Loader isActive={isLoading}/>
			</div>
		</div>
);
};

export default Auth;
