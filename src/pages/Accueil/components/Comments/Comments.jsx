import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addComment, getPosts } from '../../../../actions/post.actions';
import { isEmpty } from '../../../../components/Utils';
import './Comments.scss';

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
        <div className='comments-container flex'>
            { post.comments.map( ( comment ) => {
                return (
                    <div className={ comment.postId === userData.id ? "comment-container-client flex" : "comment-container flex" } key={ comment.id }>
                        <div className="left-part flex">
                            <img src={userData.profilPicture} alt="commenter-pic" />
                        </div>
                        <div className="right-part flex">
                            <div className="comment-header flex">
                                <div className="pseudo flex">
                                    <h3 className='pseudo'>{ comment.firstName } { comment.lastName }</h3>
                                </div>
                            </div>
                            <p>{ comment.message }</p>
                        </div>
                    </div>
                );
            } ) }
            {userData.id &&(
            <form action="" onSubmit={ handleComment } className="comment-form flex">
                <input className="comment-text" type="text" name="message" onChange={ ( e ) => setMessage( e.target.value ) } value={message} placeholder="Laisser un commentaire" />
                <input className="send-comment"type="submit" value="Envoyer" />
            </form>
            )}
        </div>
    );
};

export default Comments;