import React from "react";

import Log from "../Log/Log";
import { UidContext } from "../../components/AppContext";
import { useContext } from "react";
import UpdateProfil from "./UpdateProfil/UpdateProfil";

const Profil = () => {
	const uid = useContext( UidContext );
	return (
		<div>
			{ uid ? <UpdateProfil /> : <Log /> }
		</div>
	);
};

export default Profil;
