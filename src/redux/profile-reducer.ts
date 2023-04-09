import {PhotosType, PostType, ProfileType} from "../types/types";
import {stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./redux-store";
import {usersAPI} from "../API/users-API";
import {profileAPI} from "../API/profile-API";
import {actionsCreate} from "./users-reducer";

const ADD_POST = 'ADD-POST';
//const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const LIKE = "LIKE";
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = "DELETE_POST";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";

export let initialState = {
    posts: [
        {id: 1, likesCount: 10, messages: 'hi, how are you ?'},
        {id: 2, likesCount: 12, messages: 'Are you'},
        {id: 3, likesCount: 45, messages: 'Simple pimple'},
        {id: 4, likesCount: 2, messages: 'Ben roberts hi hi hi'},
        {id: 5, likesCount: 8, messages: 'good day'},
        {id: 6, likesCount: 34, messages: 'Hello world'},
    ] as Array<PostType>,
    //   newPostText: 'It-kamasutra.',
    newPostText: null as string | null,
    profile: null as ProfileType | null,
    status: "",
    initializedPhoto: false,
};

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actionsCreate>;// ?????????????????????????????????????????????????

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {

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
//@ts-ignore
        case LIKE :
            return {
                ...state,
                posts: state.posts.map(u => {
                    //@ts-ignore
                    if (u.id === action.id) {
                        //@ts-ignore
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
        case SAVE_PHOTO_SUCCESS: {
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        }
        default:
            return state;
    }
}
//------------------Action create -------------------------------//

export const actionsCreator = {
    returnTypeActionCreator: (id: number, like: number) => {return ({type: LIKE, id: id, like: like})},
    addPostActionCreator: (newPostText: string) => {return ({type: ADD_POST, newPostText})},
    setUserProfile: (profile: ProfileType) => ({type: SET_USER_PROFILE, profile}),
    setStatus: (status: string) => {return ({type: SET_STATUS, status: status})},
    deletePost: (postId: number) => {return ({type: DELETE_POST, postId})},
    savePhotoSuccessAC: (photos: PhotosType) => {return ({type: SAVE_PHOTO_SUCCESS, photos})},
}

//--------------------------------- Thunk-------------------------------------------------- //
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getUserProfileThunkCreate = (userId: number | null): ThunkType => async (dispatch, setState) => {
    let data = await profileAPI.getUserID_URL(userId)
    dispatch(actionsCreator.setUserProfile(data));
}

export const getStatusThunkCreate = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(actionsCreator.setStatus(data))

}

export const updateStatusThunkCreate = (status: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(actionsCreator.setStatus(status));
    }
};

export const savePhotoTC = (file: any): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file);

    if (data.resultCode === 0) {

        dispatch(actionsCreator.savePhotoSuccessAC(data.data.photos))

    }
};
export const saveProfileTC = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    let userID = getState().auth.userID
    let data = await profileAPI.saveProfile(profile);

    if (data.resultCode === 0) {
        dispatch(getUserProfileThunkCreate(userID))
    } else {
      /*  dispatch(stopSubmit('edit-profile', {_error: response.data.messages[0]}));
    }}*/

//-------------------------------------------------------------------------//

        let arrayMessError: any = data.messages; //сообщение ошибки с сервера
        //--------------------------------------------//
        let numberArrayMessagesError: any
        for (let a = 0; a < arrayMessError.length; ++a) { // перебирает массив на количество елементов
            numberArrayMessagesError = a
        }
        //--------------------------------------------//
        let arrNameErrors: any = arrayMessError.map ((name: any) => {
            let [b1, b2] = name.split('>') ; // перебирает, формирует новый массив, разделяет по ">" , и обрезает
            let b3 = b2.slice(0, -1)
            return b3.toLowerCase()
        });

        const fnReturnMassageError = (nameContact: any, messagesError: string) => {
            return ({contacts: {[nameContact]: [messagesError]}}) // формирует обект ошибки
        }
        let error = fnReturnMassageError(arrNameErrors[numberArrayMessagesError], arrayMessError[numberArrayMessagesError])
        //@ts-ignore
        dispatch(stopSubmit('edit-profile', error));
        return Promise.reject(data.messages[0]);
    }
};
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


