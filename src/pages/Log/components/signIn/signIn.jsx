import React, { useState } from "react";
import axios from "axios";
import "./signIn.scss";

const SignIn = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const handleLogin = (e) => {
		e.preventDefault();

		const error = document.querySelector(".error");

		axios({
			method: "post",
			url: `${process.env.REACT_APP_API_URL}api/user/login`,
			withCredentials: true,

			data: {
				email,
				password,
			},
		})
			.then((res) => {
				if (res.data.errors) {
					error.innerHTML = "Une erreur est survenue, vérifiez vos informations et rééssayez";

				} else {
					window.location = "/accueil";
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<div className="login flex">
			<div className="login-area flex">
				<form action="" onSubmit={handleLogin} className="form-field">
					<div className="form email">
						<label htmlFor="email">Email :</label>
						<input
							type="text"
							className="single-field"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
						/>
					</div>
					<div className="form password">
						<label htmlFor="password">Mot de passe: </label>
						<input
							type="password"
							className="single-field"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							minLength="6"
							required
						/>
					</div>

					<input type="submit" value="Se connecter" className="login-btn" />
					<div className="error"></div>
				</form>
			</div>
		</div>
	);
};

export default SignIn;
