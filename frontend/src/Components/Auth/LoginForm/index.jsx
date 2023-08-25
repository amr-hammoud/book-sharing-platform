import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../Base/Input";
import Button from "../../Base/Button";
import { localStorageAction } from "../../../config/localstorage";
import { sendRequest } from "../../../config/request";
import logo from '../../../Assets/logo128.png'

const LoginForm = ({ onToggle }) => {
	const navigate = useNavigate();

	const [body, setBody] = useState({
		username: "",
		email: "",
		password: "",
	});

	const [error, setError] = useState(null);

	const loginHandler = async () => {
		try {
			const response = await sendRequest({
				method: "POST",
				route: "/auth/login/",
				body,
			});

			localStorageAction("token", response.token);
			navigate("/books");
		} catch (error) {
			console.log(error);
			setError(error.message);
		}
	};

	return (
		<div className="flex column light-bg text-center spaceBetween rounded authenticationBox">
			<img className="auth-logo" src={logo} alt="" />
			<h1 className="color-primary">Login</h1>
			<Input
				label={"Email or Username"}
				placeholder={"email or username"}
				onChange={(identifier) => {
					if (identifier.search("@") !== -1) {
						setBody({
							...body,
							email: identifier,
							username: "",
						});
					} else {
						setBody({
							...body,
							username: identifier,
							email: "",
						});
					}
				}}
			/>
			<Input
				label={"Password"}
				placeholder={"password"}
				type={"password"}
				onChange={(password) =>
					setBody({
						...body,
						password,
					})
				}
			/>
			{error && <p>{error}</p>}
			<div className="flex center">
				<Button
					color={"primary-bg"}
					textColor={"white-text"}
					text={"Login"}
					onClick={() => loginHandler()}
				/>
			</div>
			<div className="auth-background-image" />
			<p className="black-text text-center">
				Don't have an account?
				<br />
				<span
					className="pointer color-primary"
					onClick={() => onToggle()}
				>
					Register
				</span>
			</p>
		</div>
	);
};

export default LoginForm;
