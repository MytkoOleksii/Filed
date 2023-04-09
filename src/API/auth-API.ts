import {instance, APIResponseType, ResultCodeForCaptchaEnum, ResultCodesEnum} from "./api";

type MyResponseDataType = {
        id: number
        email: string,
        login: string
}
type LoginResponseType = {
     userId: number
}
export const authAPI = {
    // Проверяет авторизирован ли
    setAuth_Me() {
        return instance.get<APIResponseType<MyResponseDataType>>(`auth/me`).then(res => res.data)
        /*.then(response => {    // не нужно если использовать async await
            return response.data
        });*/
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
        return instance.post<APIResponseType<LoginResponseType,ResultCodesEnum | ResultCodeForCaptchaEnum>>('auth/login/', {email, password, rememberMe, captcha})
            .then(res => res.data)
    },
    logOut() {
        return instance.delete('auth/login/');
    },
}