import { GET_POSTS, LIKE_POST, UNLIKE_POST } from "../actions/post.actions";


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
                return state.map((post) => {
                  if (post.id === action.payload.postId) {
                    return {
                      ...post,
                      likes:[ post.likes.filter((id) => id, action.payload.userId, action.payload.postId)],
                    };
                  }
                  return post;
                });
        default:
            return state;
    }
}