import {ResultCodeForCaptchaEnum, ResultCodesEnum, } from "../API/api";
import {stopSubmit} from "redux-form";
import {AppStateType, BaseThunkType, InferActionsTypes} from "./redux-store";
import {authAPI} from "../API/auth-API";
import {securityAPI} from "../API/security-API";

let initialState = {
    userID:null as (number | null),
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null, // if null , then captcha is not require
};

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {

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

// Зарегистрирован ли на сайте
export const getAuthUserData = ():ThunkType  => async (dispatch) => {
    let meData = await authAPI.setAuth_Me()

    if (meData.resultCode === ResultCodesEnum.Success) {
        let {id, email, login} = meData.data; // .data ????
        dispatch(actionsCreator.setAuthUserData(id, email, login, true));
    }
};

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




