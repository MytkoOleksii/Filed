import {ResultCodeForCaptchaEnum, ResultCodesEnum, } from "../API/api";
import {stopSubmit} from "redux-form";
import {AppStateType, BaseThunkType, InferActionsTypes} from "./redux-store";
import {ThunkAction} from "redux-thunk";
import {authAPI as authAPI} from "../API/auth-API";
import {securityAPI} from "../API/security-API";
type INS = { isAuth: boolean | null; captchaUrl: string|null; login: string | null; userID: number | null; email: string | null }
let initialState = {
    userID: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null, // if null , then captcha is not require
};
//{ isAuth: boolean | null; captchaUrl: string|null; login: string | null; userID: number | null; email: string | null }
//    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!    //
const authReducer = (state = initialState, action: ActionsType): any  => {

    switch (action.type) {
        case 'SN/AUTH/SET_USERS_DATA': {
            return {
                ...state,
                ...action.data,
            }
        }
        case 'SN/AUTH/GET_CAPTCHA_URL_SUCCESS': {
            return {
                ...state,
                ...action.payload
            }
        }
        default:

            return state;
    }
};
export const actionsCreator = {
    // Отправка данных юзера
    setAuthUserData: (userID: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'SN/AUTH/SET_USERS_DATA',
        data: {userID, email, login, isAuth}
    } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({type: 'SN/AUTH/GET_CAPTCHA_URL_SUCCESS', payload: {captchaUrl}} as const),
};

//-------------------------------------- Thunk---------------------------------------------------------//

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
/*Использование async / await */
// Зарегистрирован ли на сайте
export const getAuthUserData = ():ThunkType  => async (dispatch) => {
    let meData = await authAPI.setAuth_Me()

    if (meData.resultCode === ResultCodesEnum.Success) {
        let {id, email, login} = meData.data; // .data ????
        dispatch(actionsCreator.setAuthUserData(id, email, login, true));
    }
};
//авторизация, вход на сайт OLD
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
//авторизация, вход на сайта
export const loginThunkCreator = (email: string, password:string, rememberMe: boolean, captcha: any):ThunkType => async (dispatch) => {
    let loginData = await authAPI.login(email, password, rememberMe,  captcha)
    if (loginData.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData())
    } else {
        if (loginData.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
            dispatch(getCaptchaURLTC())
        }
        let messageError = loginData.messages.length > 0 ? loginData.messages[0] : 'Some error';
        let error = stopSubmit('login', {_error: messageError});
        //@ts-ignore
        dispatch(error);
    }
};
// Выход из сайта
/*export  const logOutThunkCreator = () => (dispatch) => {
    authAPI.logOut()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null,false));
            }
        })
}*/
// Выход из сайта
export const logOutThunkCreator = (): ThunkType => async (dispatch) => {
    let response = await authAPI.logOut()
    if (response.data.resultCode === 0) {
        dispatch(actionsCreator.setAuthUserData(null, null, null, false));
    }
};


// Получение урла на каптчу
export const getCaptchaURLTC = (): ThunkType => async (dispatch) => {
    let data = await securityAPI.getCaptchaURL();
    let captchaUrl = data.url;

    dispatch(actionsCreator.getCaptchaUrlSuccess(captchaUrl));

};
export default authReducer;


export type InitialStateType = typeof  initialState;
type ActionsType = InferActionsTypes<typeof actionsCreator>
type ThunkType= BaseThunkType<ActionsType | ReturnType<typeof stopSubmit>>




