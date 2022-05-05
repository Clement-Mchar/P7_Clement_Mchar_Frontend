
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBio, deleteUser } from '../../../actions/user.actions';
import cookie from 'js-cookie';
import axios from 'axios';
import Navbar from "../../../components/Navbar/Navbar";
import UploadImg from '../UploadImg/UploadImg';
import './UpdateProfil.scss';

const UpdateProfil = () => {
    const [ bio, setBio ] = useState( "" );
    const [ updateForm, setUpdateForm ] = useState( false );
    const userData = useSelector( ( state ) => state.userReducer );
    const dispatch = useDispatch();
    const handleUpdate = () => {
        dispatch( updateBio( userData.id, bio ) );
        setUpdateForm( false );
    };
    const handleDelete = () => {
        if ( window.confirm( 'voulez vous vraiment supprimer le compte et tout ?' ) === true ) {
            dispatch( deleteUser( userData.id ) );

            const removeCookie = ( key ) => {
                if ( window !== "undefined" ) {
                    cookie.remove( key, { expires: 1 } );
                }
            };

            axios( {
                method: "get",
                url: `${ process.env.REACT_APP_API_URL }api/user/logout`,
                withCredentials: true,
            } )
                .then( () => removeCookie( "jwt" ) )
                .catch( ( err ) => console.log( err ) );

            window.location = "/";
        } else {
            return window.alert( 'ok' );

        }
    };

    return (
        <div className='profil-container'>
            <Navbar />
            <h1 className='flex'>Profil de { userData.firstName }</h1>
            <div className="update-container flex">
                <div className="left-part flex">
                    <h3 className='flex'> Photo de profil</h3>
                    <img src={ userData.profilPicture } alt="user-pic" />
                    <UploadImg />
                </div>
                <div className="right-part flex">
                    <div className="bio-update flex">
                        <h3 className='flex'>Bio</h3>
                        { updateForm === false && (
                            <>
                                <p onClick={ () => setUpdateForm( !updateForm ) }>{ userData.bio }</p>
                                <button onClick={ () => setUpdateForm( !updateForm ) }>Modifier bio</button>

                            </>

                        ) }
                        { updateForm && (
                            <>
                                <textarea type="text" defaultValue={ userData.bio } onChange={ ( e ) => setBio( e.target.value ) }></textarea>
                                <button onClick={ handleUpdate }>Valider modifications</button>
                            </>
                        ) }
                    </div>
                </div>
            </div>
            <div className="delete-button flex">
                <button onClick={ handleDelete }>Supprimer le compte</button>
            </div>
        </div>
    );
};

export default UpdateProfil; 