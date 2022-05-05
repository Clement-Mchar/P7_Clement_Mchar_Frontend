import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dateParser, isEmpty } from '../../../components/Utils';
import { likePost, unlikePost, updatePost } from '../../../actions/post.actions';
import { UidContext } from "../../../components/AppContext";
import DeleteCard from '../components/DeleteCard/DeleteCard';
import Comments from '../components/Comments/Comments';

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
        <li className="card-container flex" key={ post.id }>
            { isLoading ? (
                <FontAwesomeIcon icon="fa-solid fa-spinner" spin />
            ) : ( <> <div className="card-left">
                <img src={ post.user.profilPicture } alt="poster-pic" />

            </div>
                <div className="card-right">
                    <div className="card-header">
                        <div className="poster-name">
                            <h3>
                                { post.user.firstName } { post.user.lastName }
                            </h3>
                        </div>
                        <span>{ dateParser( post.createdAt ) }</span>
                    </div>
                    { isUpdated === false &&
                        <p>{ post.message }</p> }
                    { isUpdated && (
                        <div className="update-post">
                            <textarea defaultValue={ post.message }
                                onChange={ ( e ) => setTextUpdate( e.target.value ) } />
                            <div className="button-container" onClick={ updateItem }>
                                <button className="btn" onClick={ updateItem }>
                                    Valider modification
                                </button>
                            </div>


                        </div>
                    )

                    }
                    { post.picture && (
                        <img src={ post.picture } alt="card-pic" className='card-pic' />
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
                    { userData.id === post.userId && (
                        <div className="button-container">
                            <div onClick={ () => setIsUpdated( !isUpdated ) }>
                                <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                            </div>
                            <DeleteCard id={ post.id } />
                        </div>

                    ) }
                    <div className="card-footer">
                        <div className="comment-icon">
                            <FontAwesomeIcon icon="fa-solid fa-comments" onClick={ () => setShowComments( !showComments ) } />
                            <span>
                                { post.comments.length }
                            </span>
                        </div>
                        <div className="like-container">
                            { liked === false && ( <FontAwesomeIcon icon="fa-solid fa-heart" onClick={ like } className='not-liked' /> ) }
                            { liked && ( <FontAwesomeIcon icon="fa-solid fa-heart" onClick={ unlike } className='liked' /> ) }

                        </div>
                        <span>
                            { post.likes.length }
                        </span>
                    </div>
                    { showComments && <Comments post={ post } /> }
                </div>
            </> ) }
        </li>
    );
};

export default Card;