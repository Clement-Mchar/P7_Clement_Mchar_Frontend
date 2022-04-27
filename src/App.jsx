import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Accueil from './pages/Accueil.jsx';
import Log from './pages/Log/Log.jsx';
import Profil from './pages/Profil.jsx';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Log />} />
				<Route path="/accueil" element={<Accueil />} />
				<Route path="/profil" element={<Profil />} />
			</Routes>
		</Router>
	);
}

export default App;
