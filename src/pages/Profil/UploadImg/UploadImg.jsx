import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPicture } from '../../../actions/user.actions';
import './UploadImg.scss';

const UploadImg = () => {
    const [ file, setFile ] = useState();
    const dispatch = useDispatch();
    const userData = useSelector( ( state ) => state.userReducer );
    const handlePicture = ( e ) => {
        e.preventDefault();
        const data = new FormData();
        data.append( 'name', userData.firstName );
        data.append( "userId", userData.id );
        data.append( "profilPicture", file );
        dispatch( uploadPicture( data, userData.id ) );
    };
    return (
        <div>
            <form action="" onSubmit={ handlePicture } className="upload-pic flex">
                <label htmlFor="file">Changer d'image</label>
                <input type="file" name="profilPicture" accept=".jpg, .jpeg, .png" onChange={ ( e ) => setFile( e.target.files[ 0 ] ) } />
                <input type="submit" value="Envoyer" />
            </form>
        </div>
    );
};

export default UploadImg;