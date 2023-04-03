import {authAPI, authAPI as aythAPI, securityAPI,} from "../API/api";
import {stopSubmit} from "redux-form";
import {AppStateType} from "./redux-store";
import {ThunkAction} from "redux-thunk";


const SET_USER_DATA = 'SET_USERS_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';

export type InitialStateType = {
    userID: number | null,
    email:  string | null,
    login:  string | null,
    isAuth: boolean,
    captchaUrl: string | null,
}


let initialState: InitialStateType = {
    userID: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null, // if null , then captcha is not require
};

const authReducer = (state = initialState, action: AllActionType): InitialStateType => {

    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.data,
            }
        }
        case GET_CAPTCHA_URL_SUCCESS: {
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state;
    }
}
type AllActionType =   SetAuthUserDataActionType | GetCaptchaUrlSuccessActionType

type SetAuthUserDataActionDataType = {
        userID: number | null,
        email:  string | null,
        login:  string | null,
        isAuth: boolean,
}
type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    data: SetAuthUserDataActionDataType
}
export let setAuthUserData = (userID: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
    type: SET_USER_DATA,
    data: {userID, email, login, isAuth}
});

export type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    payload: { captchaUrl: string }
}
let getCaptchaUrlSuccess = (captchaUrl: string):GetCaptchaUrlSuccessActionType => ({type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}});
//-------------------------------------- Thunk---------------------------------------------------------//

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, AllActionType>
// Использование .then
/*export  const getAuthUserData = () => (dispatch) => {
        return  aythAPI.setAuth_Me()
            .then(data => {
                if(data.resultCode === 0) {
                    let{id, email, login } = data.data;
                    dispatch(setAuthUserData(id, email, login,true));
                }
            });
}*/
// Использование async / await
export const getAuthUserData = ():ThunkType  => async (dispatch) => {
    let response = await aythAPI.setAuth_Me()

    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
};
//авторизация, вход на сайта
/*export  const loginThunkCreator = (email, password, rememberMe) => (dispatch) => {
    authAPI.login(email, password, rememberMe)
        .then(response  => {
        if (response.data.resultCode === 0) {
            dispatch(getAuthUserData())
        } else {
             let messageError = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
             let error = stopSubmit('login', {_error:messageError });
            dispatch(error);
        }
    });
}*/

export const loginThunkCreator = (email: string, password:string, rememberMe: boolean, captcha: any):ThunkType => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe,  captcha)
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaURLTC())
        }
        let messageError = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
        let error = stopSubmit('login', {_error: messageError});
        //@ts-ignore
        dispatch(error);
    }
};
// Виход из сайта
/*export  const logOutThunkCreator = () => (dispatch) => {
    authAPI.logOut()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null,false));
            }
        })
}*/
export const logOutThunkCreator = (): ThunkType => async (dispatch) => {
    let response = await authAPI.logOut()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
};


// Получение урла на каптчу
export const getCaptchaURLTC = (): ThunkType => async (dispatch) => {
    let response = await securityAPI.getCaptchaURL();
    let captchaUrl = response.data.url;

    dispatch(getCaptchaUrlSuccess(captchaUrl));

};
export default authReducer;





