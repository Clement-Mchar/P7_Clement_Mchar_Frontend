import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Comments = () => {
    const post = useSelector( ( state ) => state.postReducer );
    const usersData = useSelector( ( state ) => state.usersReducer );
    const userData = useSelector( ( state ) => state.userReducer );
    const dispatch = useDispatch();
    const [ text, setText ] = useState( "" );
    return (
        <div className='comments-container'>
            { post.comments.map( ( comment ) => {
                return (
                    <div className={ comment.postId === userData.id ? "comment-container client flex" : "comment-container" } key={ comment.id }>
                        <div className="left-part">
                            <img src={ post.user.profilPicture } alt="commenter-pic" />
                        </div>
                        <div className="right-part">
                            <div className="comment-header">
                                <div className="pseudo">
                                    <h3>{post.user.firstName} {post.user.lastName}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            } ) }
        </div>
    );
};

export default Comments;