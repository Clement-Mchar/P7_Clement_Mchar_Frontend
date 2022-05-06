import React from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import Fil from '../components/Fil/Fil';
import Publier from '../Publier/Publier';
import './PageAccueil.scss'
const pageAccueil = () => {
    return (
        <div className='whole-page'>
            <Navbar />, <Publier />  <Fil />
        </div>
    );
};

export default pageAccueil;