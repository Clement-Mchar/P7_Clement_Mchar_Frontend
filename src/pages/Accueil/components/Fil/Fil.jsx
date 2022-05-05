import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../../../actions/post.actions';
import { isEmpty } from '../../../../components/Utils';
import Card from '../../Card/Card';



const Fil = () => {
    const [ loadPost, setLoadPost ] = useState( true );
    const [ count, setCount ] = useState( 5 );
    const dispatch = useDispatch();
    const posts = useSelector( ( state ) => state.postReducer );

    const loadMore = () => {
        if ( window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight ) {
            setLoadPost( true );
            
        }
    };
    useEffect( () => {
        posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    })

    useEffect( () => {
        if ( loadPost ) {
            dispatch( getPosts( count ) );
            setLoadPost( false );
            setCount( count + 5 );
        }
        window.addEventListener( 'scroll', loadMore );
        return () => window.removeEventListener( 'scroll', loadMore );
        // eslint-disable-next-line
    }, [ loadPost, dispatch ] );

    return (
        <div className='thread-container'>
            <ul>
                { !isEmpty( posts[ 0 ] ) &&
                    posts.map( ( post ) => {
                        return <Card post={ post } key={ post.id } />;
                    } ) }

            </ul>

        </div>
    );
};

export default Fil;