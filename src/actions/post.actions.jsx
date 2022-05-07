import axios from "axios";

//posts
export const GET_POSTS = "GET_POSTS";
export const ADD_POST = "ADD_POST";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";

//comments

export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";


export const getPosts = ( num ) => {
    return ( dispatch ) => {
        return axios
            .get( `${ process.env.REACT_APP_API_URL }api/post/` )
            .then( ( res ) => {
                const array = res.data.slice( 0, num );
                dispatch( { type: GET_POSTS, payload: array } );
            } )
            .catch( ( err ) => console.log( err ) );
    };
};

export const addPost = (data) => {
    return ( dispatch ) => {
        return axios({
            method: "post",
            url: `${ process.env.REACT_APP_API_URL }api/post/`,
            data: data, 
            withCredentials: true})
            
    };

}

export const likePost = ( postId, userId ) => {

    return ( dispatch ) => {
        return axios( {
            method: 'patch',
            url: `${ process.env.REACT_APP_API_URL }api/post/like-post/${ postId }`,
            data: { id: userId },
            withCredentials: true
        } )
            .then( ( res ) => {
                dispatch( { type: LIKE_POST, payload: { postId, userId } } );
            } )
            .catch( ( err ) => console.log( err ) );
    };
};

export const unlikePost = ( postId, userId ) => {

    return ( dispatch ) => {
        return axios( {
            method: 'patch',
            url: `${ process.env.REACT_APP_API_URL }api/post/unlike-post/${ postId }`,
            data: { id: userId },
            withCredentials: true
        } )
            .then( ( res ) => {
                dispatch( { type: UNLIKE_POST, payload: { postId, userId } } );
            } )
            .catch( ( err ) => console.log( err ) );
    };
};

export const updatePost = ( postId, message ) => {
    return ( dispatch ) => {
        return axios( {
            method: 'put',
            url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
            data: { message },
            withCredentials: true
        } )
            .then( ( res ) => {
                dispatch( { type: UPDATE_POST, payload: { message, postId } } );
            } )
            .catch( ( err ) => console.log( err ) );
    };

};
export const deletePost = (postId) => {
    return ( dispatch ) => {
        return axios( {
            method: 'delete',
            url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
        } )
            .then( ( res ) => {
                dispatch( { type: DELETE_POST, payload: {  postId } } );
            } )
            .catch( ( err ) => console.log( err ) );
    };

}

export const addComment = (postId, userId, message, firstName, lastName ) => {
    return ( dispatch ) => {
        return axios( {
            method: 'patch',
            url: `${process.env.REACT_APP_API_URL}api/comments/${postId}`,
            data: {userId, message, firstName, lastName },
            withCredentials: true
        } )
            .then( ( res ) => {
                dispatch( { type: ADD_COMMENT, payload: { postId } } );
            } )
            .catch( ( err ) => console.log( err ) );
    };
}

export const editComment = (postId, userId, message, id) => {
    return (dispatch) => {
      return axios({
        method: "patch",
        url: `${process.env.REACT_APP_API_URL}api/comments/${postId}`,
        data: { userId, message, id },
      })
        .then((res) => {
          dispatch({ type: EDIT_COMMENT, payload: { postId, userId, message, id } });
        })
        .catch((err) => console.log(err));
    };
  };
  
  export const deleteComment = (postId, userId, id) => {
    return (dispatch) => {
      return axios({
        method: "patch",
        url: `${process.env.REACT_APP_API_URL}api/comments/${postId}`,
        data: { userId, id },
      })
        .then((res) => {
          dispatch({ type: DELETE_COMMENT, payload: { postId, userId, id } });
        })
        .catch((err) => console.log(err));
    };
  };
