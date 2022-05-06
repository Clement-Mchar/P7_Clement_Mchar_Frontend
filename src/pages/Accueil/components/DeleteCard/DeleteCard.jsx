import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../../../actions/post.actions';

const DeleteCard = (props) => {
    const dispatch = useDispatch()
    const deleteQuote = () => {
        dispatch(deletePost(props.id))
    }
    return (
        <div className='delete-container' onClick={ () => {
            if ( window.confirm( "Voulez-vous supprimer ce post ?" ) ) {
                deleteQuote();
            }
        } }>
           <FontAwesomeIcon icon="fa-solid fa-trash" alt="delete"/>
        </div>
    );
};

export default DeleteCard;