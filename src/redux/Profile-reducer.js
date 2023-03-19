import {profileAPI, usersAPI} from "../API/api";

const ADD_POST = 'ADD-POST';
//const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const LIKE = "LIKE";
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = "DELETE_POST";


export let initialState = {
    posts: [
        {id: 1, likesCount: 10, messages: 'hi, how are you ?'},
        {id: 2, likesCount: 12, messages: 'Are you'},
        {id: 3, likesCount: 45, messages: 'Simple pimple'},
        {id: 4, likesCount: 2, messages: 'Ben roberts hi hi hi'},
        {id: 5, likesCount: 8, messages: 'good day'},
        {id: 6, likesCount: 34, messages: 'Hello world'},
    ],
    //   newPostText: 'It-kamasutra.',
    profile: null,
    status: "",
};

const profileReducer = (state = initialState, action) => {

    switch (action.type) {

        case ADD_POST:
            let newPost = {
                id: state.posts.length + 1,
                likesCount: 0,
                messages: action.newPostText,
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: null,
            }

        /* case UPDATE_NEW_POST_TEXT:
             return {
                 ...state,
                 newPostText: action.newText,
             }*/

        case LIKE :
            return {
                ...state,
                posts: state.posts.map(u => {
                    if (u.id === action.id) {
                        return {...u, likesCount: action.like}
                    }
                    return u;
                })
            }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case DELETE_POST: {
            return {...state, posts: state.posts.filter(p => p.id != action.postId)}
        }
        default:
            return state;
    }
}
/* switch (action.type) {
     case ADD_POST:
         let newPost = {
             id: state.posts.length + 1,
             likesCount: 0,
             messages: state.newPostText,
         };
         let stateCopy = {...state};
         stateCopy.posts = [...state.posts]
         stateCopy.posts.push(newPost);
         stateCopy.newPostText = '';
         return stateCopy;
     case UPDATE_NEW_POST_TEXT: {
         let stateCopy = {...state};
         stateCopy.posts = [...state.posts]

         stateCopy.newPostText = action.newText;
         return stateCopy;
     }
     default:
         return state;
 }
 return state;
}*/

export let returnTypeActionCreator = (id, like) => {
    return ({type: LIKE, id: id, like: like})
}

export const addPostActionCreator = (newPostText) => {
    return ({type: ADD_POST, newPostText})
}
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
const setStatus = (status) => {
    return ({type: SET_STATUS, status: status})
}
export const deletePost = (postId) => {
    return ({type: DELETE_POST, postId})
}

///////////////// Thunk ///////////////////
export const getUserProfileThunkCreate = (userId) => async (dispatch) => {
    let response = await usersAPI.getUserID_URL(userId)
    dispatch(setUserProfile(response.data));
};

export const getStatusThunkCreate = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))

}

export const updateStatusThunkCreate = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}


// Использование .then
/*export const getUserProfileThunkCreate = (userId) => {
    return (dispatch) => {
       /!* if (!userId) {
            userId = 2
        }*!/
        usersAPI.getUserID_URL(userId)
            .then((data => {
                dispatch(setUserProfile(data));
            }))
    }
};

export  const  getStatusThunkCreate = ( userId) => (dispatch) => {
    profileAPI.getStatus(userId)
        .then(response => {
        dispatch(setStatus(response.data))
    });
}

export const updateStatusThunkCreate =( status) => (dispatch) => {
    profileAPI.updateStatus(status)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status));
            }
        });
}*/

export default profileReducer;


/*

export let addLikes = (state = initialState,action) => {
    switch (action.type) {
        case LIKE :
            state.posts[action.id].likesCount = action.like
            break;
        default:
            return state;
    }
    return state;
};
export let returnTypeActionCreator = (id,like) => {
    return ({type: LIKE ,id:id , like:like})}
*/


