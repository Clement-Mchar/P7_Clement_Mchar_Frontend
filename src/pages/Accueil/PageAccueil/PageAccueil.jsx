import React from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import Fil from '../components/Fil/Fil';
import Publier from '../components/Publier';

const pageAccueil = () => {
    return (
        <div>
            <Navbar />, <Publier />  <Fil />
        </div>
    );
};

export default pageAccueil;