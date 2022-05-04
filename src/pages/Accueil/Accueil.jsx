
import Log from "../Log/Log";
import React, { useContext } from "react";
import { UidContext } from "../../components/AppContext";
import PageAccueil from "./PageAccueil/PageAccueil";

const Accueil = () => {
	const uid = useContext( UidContext );

	return <div>{ uid ? <PageAccueil /> : <Log /> }</div>;
};

export default Accueil;
