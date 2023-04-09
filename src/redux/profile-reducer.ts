import {PhotosType, PostType, ProfileType} from "../types/types";
import {FormAction, stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {AppStateType, BaseThunkType, InferActionsTypes} from "./redux-store";
import {usersAPI} from "../API/users-API";
import {profileAPI} from "../API/profile-API";


export let initialState = {
    posts: [

        {id: 1, likesCount: 10, messages: 'hi, how are you ?'},
        {id: 2, likesCount: 12, messages: 'Are you'},
        {id: 3, likesCount: 45, messages: 'Simple pimple'},
        {id: 4, likesCount: 2, messages: 'Ben roberts hi hi hi'},
        {id: 5, likesCount: 8, messages: 'good day'},
        {id: 6, likesCount: 34, messages: 'Hello world'},
    ] as Array<PostType>,
    //newPostText: 'It-kamasutra.',
    newPostText: '',
    profile: null as ProfileType | null,
    status: "",
};

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actionsCreate>;// ?????????????????????????????????????????????????
type ThunkType = BaseThunkType<ActionsType> | FormAction

const profileReducer = (state = initialState, action: ActionsType ): InitialStateType => {

    switch (action.type) {

        case 'SN/PROFILE/ADD-POST':
            let newPost = {
                id: state.posts.length + 1,
                likesCount: 0,
                messages: action.newPostText,
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: '',
            }
//@ts-ignore
        case "SN/PROFILE/LIKE" :
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
        case 'SN/PROFILE/SET_USER_PROFILE': {
            return {...state, profile: action.profile}
        }
        case 'SN/PROFILE/SET_STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        case "SN/PROFILE/DELETE_POST": {
            return {...state, posts: state.posts.filter(p => p.id != action.postId)}
        }
        case 'SN/PROFILE/SAVE_PHOTO_SUCCESS': {
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        }
        default:
            return state;
    }
}
//------------------Action create -------------------------------//

export const actionsCreate = {
    returnTypeActionCreator: (id: number, like: number) =>  ({type: "SN/PROFILE/LIKE", id: id, like: like}as const) ,
    addPostActionCreator: (newPostText: string) =>  ({type: 'SN/PROFILE/ADD-POST', newPostText}as const) ,
    setUserProfile: (profile: ProfileType) => ({type: 'SN/PROFILE/SET_USER_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'SN/PROFILE/SET_STATUS', status: status}as const),
    deletePost: (postId: number) => ({type: "SN/PROFILE/DELETE_POST", postId}as const) ,
    savePhotoSuccessAC: (photos: PhotosType) => ({type: 'SN/PROFILE/SAVE_PHOTO_SUCCESS', photos}as const),
}

//--------------------------------- Thunk-------------------------------------------------- //

export const getUserProfileThunkCreate = (userId: number | null): ThunkType => async (dispatch) => {
    let data = await profileAPI.getUserID_URL(userId)
    dispatch(actionsCreate.setUserProfile(data));
}

export const getStatusThunkCreate = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(actionsCreate.setStatus(data))

}

export const updateStatusThunkCreate = (status: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(actionsCreate.setStatus(status));
    }
};

export const savePhotoTC = (file: File): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file);
    if (data.resultCode === 0) {
        dispatch(actionsCreate.savePhotoSuccessAC(data.data.photos))
    }
};
export const saveProfileTC = (profile: ProfileType): ThunkType => async (dispatch:any, getState) => {
    let userId = getState().auth.userID
    let data = await profileAPI.saveProfile(profile);

    if (data.resultCode === 0) {
        dispatch(getUserProfileThunkCreate(userId))
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


