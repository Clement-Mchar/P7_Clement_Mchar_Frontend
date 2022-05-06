import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, timestampParser } from '../../../components/Utils';
import { NavLink } from 'react-router-dom';
import { addPost, getPosts } from '../../../actions/post.actions';

const Publier = () => {
    const [ isLoading, setIsLoading ] = useState( true );
    const [ message, setMessage ] = useState( "" );
    const [ postPicture, setPostPicture ] = useState( null );
    const [ video, setVideo ] = useState( '' );
    const [ picture, setPicture ] = useState();
    const userData = useSelector( ( state ) => state.userReducer );
    const dispatch = useDispatch()
    const handlePicture = ( e ) => {
        setPostPicture( URL.createObjectURL( e.target.files[ 0 ] ) );
        setPicture( e.target.files[ 0 ] );
        setVideo( '' );
    };
    const handlePost = async () => {
        if ( message || postPicture || video ) {
            const data = new FormData();
            data.append( 'postId', userData.id );
            data.append( 'message', message );
            if ( picture ) data.append( 'picture', picture );
            data.append( 'video', video );

            await dispatch(addPost(data));
            dispatch(getPosts())
            cancelPost();
        } else {
            alert( 'Vous ne pouvez pas publier un post vide' );
        }
    };
    const cancelPost = () => {
        setMessage( '' );
        setPostPicture( '' );
        setVideo( '' );
        setPicture( '' );
    };



    useEffect( () => {
        if ( !isEmpty( userData ) ) setIsLoading( false );
        const handleVideo = () => {
            let findLink = message.split( " " );
            for ( let i = 0; i < findLink.length; i++ ) {
                if ( findLink[ i ].includes( "https://www.yout" ) ||
                    findLink[ i ].includes( 'https://yout' ) ) {
                    let embed = findLink[ i ].replace( "watch?v=", "embed/" );
                    setVideo( embed.split( "&" )[ 0 ] );
                    findLink.splice( i, 1 );
                    setMessage( findLink.join( " " ) );
                    setPostPicture( '' );

                }
            }
        };
        handleVideo();
    }, [ userData, message, video ] );

    return (
        <div className="post-container">
            { isLoading ? (
                <FontAwesomeIcon icon="fa-solid fa-spinner" spin />
            ) : ( <>
                <NavLink to="/profil">
                    <div className="user-info">
                        <img src={ userData.profilPicture } alt="profil-pic" />
                    </div>
                </NavLink>
                <div className="post-form">
                    <textarea name='message' id="message" placeholder='Quoi de neuf ?' onChange={ ( ( e ) => setMessage( e.target.value )
                    ) } value={ message }>
                    </textarea>
                    { message || postPicture || video.length > 20 ? (
                        <li className="card-container">
                            <div className="card-left">
                                <img src={ userData.profilPicture } alt="user-pic" />
                            </div>
                            <div className="card-right">
                                <div className="card-header">
                                    <div className="pseudo">
                                        <h3>{ userData.firstName }{ userData.lastName }</h3>
                                    </div>
                                    <span>{ timestampParser( Date.now() ) }</span>
                                </div>
                                <div className="content">
                                    <p>{ message }</p>
                                    <img src={ postPicture } alt="" />
                                    { video && (
                                        <iframe
                                            src={ video }
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            title={ video }
                                        ></iframe>
                                    ) }
                                </div>
                            </div>
                        </li>
                    ) : null }
                    <div className="footer-form">
                        <div className="icon">
                            { isEmpty( video ) && (
                                <>
                                    <FontAwesomeIcon icon="fa-solid fa-image" />
                                    <input type="file" id="file-upload" name="picture" accept=".jpg, .jpeg, .png" onChange={ ( e ) => handlePicture( e ) } />

                                </>
                            ) }
                            { video && (
                                <button onClick={ () => setVideo( "" ) }> Supprimer vidéo </button>
                            ) }
                        </div>
                        <div className="btn-send">
                            { message || postPicture || video.length > 20 ? (
                                <button className="cancel" onClick={ cancelPost }>Annuler le message</button>
                            ) : null }
                            <button className='send' onClick={ handlePost }>Envoyer</button>
                        </div>
                    </div>
                </div>
            </>
            ) }
        </div>
    );
};

export default Publier;