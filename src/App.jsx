import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil/Accueil.jsx";
import Log from "./pages/Log/Log.jsx";
import Profil from "./pages//Profil/Profil";
import { UidContext } from "./components/AppContext";
import { useDispatch } from "react-redux/";
import axios from "axios";
import { useEffect } from "react";
import { getUser } from "./actions/user.actions.jsx";
import './App.scss'

const App = () => {
	const [uid, setUid] = useState(null);
	const dispatch = useDispatch();
	useEffect(() => {
		async function fetchData() {
			await axios({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}jwtid`,

			})
				.then((res) => {
					setUid(res.data);
				})
				.catch((err) => console.log("no token"));
		}
		fetchData();
		console.log(uid)
		if (uid) dispatch(getUser(uid));
		// eslint-disable-next-line
	}, [uid]);

	return (
		<UidContext.Provider value={uid}>
			<Router>
				<Routes>
					<Route path="/" element={<Log />} />
					<Route path="/accueil" element={<Accueil />} />
					<Route path="/profil" element={<Profil />} />
				</Routes>
			</Router>
		</UidContext.Provider>
	);
};

export default App;
