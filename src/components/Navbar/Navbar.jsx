import React from "react";
import Logout from "../Logout";
import { NavLink } from "react-router-dom";
//import { useNavigate } from "react-router-dom";
import "./Navbar.scss";
import { useSelector } from "react-redux/es/exports";


const Navbar = () => {
	const userData = useSelector((state) => state.userReducer);

	return (
		<nav>
			<div className="nav-container flex">
				<div className="navbar-wrapper flex">
					<div className="logo flex">
						<NavLink exact="true" to="/accueil">
							<img src="./img/icon-left-font.svg" alt="icon" />
						</NavLink>
					</div>
					<div className="menu wrapper flex">
						<ul className="profile flex">
							<li className="welcome flex">
								<NavLink className="flex" exact="true" to="/profil">
									<div className="name flex">
										{userData.firstName} {userData.lastName}{" "}
									</div>
									<div className="name flex">
										<img src={userData.profilPicture} alt="profile" />
									</div>
								</NavLink>
							</li>
						</ul>
						<ul className="logout flex">
							<NavLink exact="true" to="/">
								<Logout />
							</NavLink>
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
