import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addComment, getPosts } from '../../../../actions/post.actions';
import { timestampParser } from '../../../../components/Utils';

const Comments = ({post}) => {
    const [ message, setMessage ] = useState("");
    const usersData = useSelector( ( state ) => state.usersReducer );
    const userData = useSelector( ( state ) => state.userReducer );
    const dispatch = useDispatch();

    const handleComment = (e) => {
        e.preventDefault();
        if (message) {
            dispatch(addComment(post.id, userData.id, message, userData.firstName, userData.lastName))
            .then(() => dispatch(getPosts()))
            .then(() => setMessage(""))
        }
    }
    return (
        <div className='comments-container'>
            { post.comments.map( ( comment ) => {
                return (
                    <div className={ comment.postId === userData.id ? "comment-container client flex" : "comment-container" } key={ comment.id }>
                        <div className="left-part">
                            <img src={ userData.profilPicture } alt="commenter-pic" />
                        </div>
                        <div className="right-part">
                            <div className="comment-header">
                                <div className="pseudo">
                                    <h3>{ comment.firstName } { comment.lastName }</h3>
                                </div>
                            </div>
                            <p>{ comment.message }</p>
                        </div>
                    </div>
                );
            } ) }
            {userData.id &&(
            <form action="" onSubmit={ handleComment } className="comment-form flex">
                <input type="text" name="message" onChange={ ( e ) => setMessage( e.target.value ) } value={message} placeholder="Laisser un commentaire" />
                <input type="submit" value="Envoyer" />
            </form>
            )}
        </div>
    );
};

export default Comments;