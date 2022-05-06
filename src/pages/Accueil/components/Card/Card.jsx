import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dateParser, isEmpty } from '../../../../components/Utils';
import { likePost, unlikePost, updatePost } from '../../../../actions/post.actions';
import { UidContext } from "../../../../components/AppContext";
import DeleteCard from '../DeleteCard/DeleteCard';
import Comments from '../Comments/Comments';
import './Card.scss'

const Card = ( { post } ) => {
    const [ isLoading, setIsLoading ] = useState( true );
    const [ liked, setLiked ] = useState( false );
    const [ isUpdated, setIsUpdated ] = useState( false );
    const [ textUpdate, setTextUpdate ] = useState( null );
    const [ showComments, setShowComments ] = useState( false );
    const usersData = useSelector( ( state ) => state.usersReducer );
    const userData = useSelector( ( state ) => state.userReducer );
    const uid = useContext( UidContext );
    const dispatch = useDispatch();

    const updateItem = () => {
        if ( textUpdate ) {
            dispatch( updatePost( post.id, textUpdate ) );
        }
        setIsUpdated( false );
    };

    const like = () => {
        dispatch( likePost( post.id, uid ) );
        setLiked( true );

    };
    const unlike = () => {
        dispatch( unlikePost( post.id, uid ) );
        setLiked( false );
    };
    useEffect( () => {
        !isEmpty( usersData[ 0 ] ) && setIsLoading( false );
    }, [ usersData ] );

    useEffect( () => {
        if ( post.likes.includes( uid ) ) {
            setLiked( true );

        }
    }, [ uid, post.likes, liked ] );


    return (
        <li className="single-post-container flex" key={ post.id }>
            { isLoading ? (
                <FontAwesomeIcon className="icons"icon="fa-solid fa-spinner" spin />
            ) : ( <> <div className="card-left">
                <img src={ post.user.profilPicture } alt="poster-pic" />

            </div>
                <div className="card-right flex">
                    <div className="card-header flex">
                        <div className="poster-name flex">
                            <h3 className='flex'>
                                { post.user.firstName }{" "} { post.user.lastName }
                            </h3>
                            <span className='flex'>{" "}{ dateParser( post.createdAt ) }</span>
                        </div>
                        
                    </div>
                    
                    { isUpdated === false &&
                        <p>{ post.message }</p> }
                    { isUpdated && (
                        <div className="update-post flex">
                            <textarea defaultValue={ post.message }
                                onChange={ ( e ) => setTextUpdate( e.target.value ) } />
                            <div className="button-container flex" onClick={ updateItem }>
                                <button className="btn" onClick={ updateItem }>
                                    Valider modification
                                </button>
                            </div>


                        </div>
                    )

                    }
                    { post.picture && (
                        <img src={ post.picture } alt="card-pic" className='card-pic flex' />
                    ) }
                    { post.video && ( <iframe
                        width="500"
                        height="300"
                        src={ post.video }
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={ post.id }
                    ></iframe> ) }
                    { (userData.id === post.userId  || userData.isAdmin === true) && (
                        <div className="button-container flex">
                            <div onClick={ () => setIsUpdated( !isUpdated ) }>
                                <FontAwesomeIcon className="icons" icon="fa-solid fa-pen-to-square" />
                            </div>
                            <DeleteCard id={ post.id } />
                        </div>

                    ) }
                    <div className="card-footer flex">
                        <div className="comment-icon">
                            <FontAwesomeIcon className="icons" icon="fa-solid fa-comments" onClick={ () => setShowComments( !showComments ) } />
                            <span>
                                { post.comments.length }
                            </span>
                        </div>
                        <div className="like-container">
                            { liked === false && ( <FontAwesomeIcon icon="fa-solid fa-heart" onClick={ like } className='not-liked' /> ) }
                            { liked && ( <FontAwesomeIcon icon="fa-solid fa-heart" onClick={ unlike } className='liked' /> ) }
                            <span>
                            { post.likes.length }
                        </span>

                        </div>
                        
                    </div>
                    { showComments && <Comments post={ post } /> }
                </div>
            </> ) }
        </li>
    );
};

export default Card;