import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, timestampParser } from '../../../components/Utils';
import { NavLink } from 'react-router-dom';
import { addPost, getPosts } from '../../../actions/post.actions';
import './Publier.scss'


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
    <div className="page-container flex">   
        <div className="post-container flex">
            { isLoading ? (
                <FontAwesomeIcon icon="fa-solid fa-spinner" className ="icon flex" spin />
            ) : ( <>
                <NavLink to="/profil">
                    <div className="user-info flex">
                        <img src={ userData.profilPicture } alt="profil-pic" />
                    </div>
                </NavLink>
                <div className="post-form flex">
                <div className="submit-post flex"> 
                    <textarea name='message' id="message" placeholder='Quoi de neuf ?' onChange={ ( ( e ) => setMessage( e.target.value )
                    ) } value={ message } className="txt flex">
                    </textarea>
                    <button className='send flex' onClick={ handlePost }>Envoyer</button>
                    </div>
                    { message || postPicture || video.length > 20 ? (
                        <li className="card-container flex">
                            <div className="card-right flex">
                                <div className="card-header flex">
                                </div>
                                <div className="content flex">
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
                    <div className="right-form flex">
                        <div className="icon flex">
                            { isEmpty( video ) && (
                                <>
                                    <FontAwesomeIcon icon="fa-solid fa-image" className="icon flex" />
                                    <input type="file" id="file-upload" name="picture" accept=".jpg, .jpeg, .png" onChange={ ( e ) => handlePicture( e ) } />

                                </>
                            ) }
                            { video && (
                                <button onClick={ () => setVideo( "" )  } className="btn flex"> Supprimer vidéo </button>
                            ) }
                        </div>
                        <div className="btn send flex" >
                            { message || postPicture || video.length > 20 ? (
                             <div className="cancel-btn flex">
<button className="cancel" onClick={ cancelPost }>Annuler le message</button>

                             </div>   
                                
                            ) : null }
                            
                        </div>
                    </div>
                </div>
            </>
            ) }
        </div>
        </div> 
    );
};

export default Publier;