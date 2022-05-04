import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dateParser, isEmpty } from '../../../components/Utils';
import { likePost, unlikePost } from '../../../actions/post.actions';
import { UidContext } from "../../../components/AppContext";

const Card = ( { post } ) => {
    const [ isLoading, setIsLoading ] = useState( true );
    const [ liked, setLiked ] = useState( false );
    const usersData = useSelector( ( state ) => state.usersReducer );
    const uid = useContext( UidContext );
    const dispatch = useDispatch();
    const like = () => {
        dispatch( likePost( post.id, uid ) );
        setLiked( true );

    };
    const unlike = () => {
        dispatch(unlikePost(post.id, uid))
        setLiked(false);
      };
    useEffect( () => {
        !isEmpty( usersData[ 0 ] ) && setIsLoading( false );
    }, [ usersData ] );



    return (
        <li className="card-container flex" key={ post.createdAt }>
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
                    <p>{ post.message }</p>
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
                    ></iframe>

                    ) }
                    <div className="card-footer">
                        <div className="comment-icon">
                            <FontAwesomeIcon icon="fa-solid fa-comments" />
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
                </div>
            </> ) }
        </li>
    );
};

export default Card;