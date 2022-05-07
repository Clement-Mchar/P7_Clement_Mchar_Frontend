import { DELETE_POST, GET_POSTS, LIKE_POST, UNLIKE_POST, UPDATE_POST, EDIT_COMMENT, DELETE_COMMENT } from "../actions/post.actions";


const initialState = {};

export default function postReducer ( state = initialState, action ) {
    switch ( action.type ) {
        case GET_POSTS:
            return action.payload;
        case LIKE_POST:
            return state.map( ( post ) => {
                if ( post.id === action.payload.postId ) {
                    return {
                        ...post,
                        likes: [ ...post.likes, action.payload ]
                    };
                }
                return post;
            } );
        case UNLIKE_POST:
            return state.map( ( post ) => {
                if ( post.id === action.payload.postId ) {
                    return {
                        ...post,
                        likes: [ post.likes.filter( ( uid ) => uid, action.payload.userId, action.payload.postId ) ],
                    };
                }
                return post;
            } );
        case UPDATE_POST:
            return state.map( ( post ) => {
                if ( post.id === action.payload.postId ) {
                    return {
                        ...post,
                        message: action.payload.message
                    };
                } else return post;
            } );
        case DELETE_POST:
            return state.filter( ( post ) => post.id !== action.payload.postId );
            case EDIT_COMMENT:
                return state.map((post) => {
                  if (post.id === action.payload.postId) {
                    return {
                      ...post,
                      comments: post.comments.map((comment) => {
                        if (comment.id === action.payload.userId) {
                          return {
                            ...comment,
                            message: action.payload.message,
                          };
                        } else {
                          return comment;
                        }
                      }),
                    };
                  } else return post;
                });
              case DELETE_COMMENT:
                return state.map((post) => {
                  if (post.id === action.payload.postId) {
                    return {
                      ...post,
                      comments: post.comments.filter(
                        (comment) => comment.id !== action.payload.id
                      ),
                    };
                  } else return post;
                });
            default:
            return state;
    }
}