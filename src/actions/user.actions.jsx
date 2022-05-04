import axios from "axios";
import cookie from "js-cookie";
const removeCookie = ( key ) => {

        cookie.remove( key, { expires: 1 } );
    
};

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";
export const DELETE_USER = "DELETE_USER";


export const getUser = ( uid ) => {
    return ( dispatch ) => {
        return axios
            .get( `${ process.env.REACT_APP_API_URL }api/user/${ uid }` )
            .then( ( res ) => {
                dispatch( { type: GET_USER, payload: res.data } );
                
            } )
            .catch( ( err ) => console.log( err ) );
    };
};

export const uploadPicture = ( data, uid ) => {
    return ( dispatch ) => {
        return axios
            .put( `${ process.env.REACT_APP_API_URL }api/user/update/picture/${ uid }`, data )
            .then( ( res ) => {
                return axios
                    .get( `${ process.env.REACT_APP_API_URL }api/user/${ uid }` )
                    .then( ( res ) => {
                        dispatch( { type: UPLOAD_PICTURE, payload: res.data.profilPicture } );
                    } );
            } )
            .catch( ( err ) => console.log( err ) );
    };
};

export const updateBio = ( uid, bio ) => {
    return ( dispatch ) => {
        return axios( {
            method: "put",
            url: `${ process.env.REACT_APP_API_URL }api/user/update/bio/${ uid }`,
            data: { bio }
        } )
            .then( ( res ) => {
                dispatch( { type: UPDATE_BIO, payload: bio } );
            } )
            .catch( ( err ) => console.log( err ) );
    };
};

export const deleteUser = ( uid ) => {
    return ( dispatch ) => {
        return axios
            .delete( `${ process.env.REACT_APP_API_URL }api/user/${ uid }` )
            .then( ( res ) => {
                removeCookie( "jwt" );
                dispatch( { type: DELETE_USER, payload: res.data } );
            } )
            .catch( ( err ) => console.log( err ) );
    };
};