import axios from "axios";
import {ProfileType} from "../types/types";
//const axios= require('axios')

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        "API-KEY": "11cbf-8851-433c-809e-baed864fa815"
    }

})


export const usersAPI = {

    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
           /* .then(response => {   // не нужно если использовать async await
                return response.data;
            });*/
    },
    postUsersFollow(id: number) {
        return instance.post(`follow/${id}`)
            /*.then(response => {  // не нужно если использовать async await
                return response.data;
            });*/
    },
    deleteUsersUnfollow(id: number) {
        return instance.delete(`follow/${id}`)
          /*  .then(response => {   // не нужно если использовать async await
                return response.data;
            });*/
    },
    getUserID_URL(userId: any) {
        console.log('Old method Please use profileAPI obj'  )
        return profileAPI.getUserID_URL(userId)
    }
}

export  const  profileAPI = {
    getUserID_URL(userId: any) {
        return instance.get<ProfileType>(`profile/` + userId)


           /* .then(response => {  // не нужно если использовать async await
                return response.data
            });*/
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/` + userId)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status/`,{status: status} )
    },
    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append('image', photoFile)
        return instance.put('profile/photo/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    saveProfile(profile: ProfileType) {
        return instance.put('profile/', profile)
    }

}
/*export const loginAPI = {
    setLogin (email,pass,ok) {
        return instance.post(`auth/login/`,{email: email, password: pass,rememberMe: ok})
    },
    outLogin () {
        return instance.delete(`auth/login/`)
    }
}*/

export  enum  ResultCodesEnum  {
    Success, // = 0
    Error,   // = 1
}
export  enum  ResultCodeForCaptchaEnum  {
    CaptchaIsRequired = 10 ,
}
type MyResponseType = {
    data: {id: number, email: string, login: string}
    resultCode: ResultCodesEnum
    messages: Array<string>
}
type LoginResponseType = {
    data: {userId: number}
    resultCode: ResultCodesEnum | ResultCodeForCaptchaEnum
    messages: Array<string>
}
export const authAPI = {
    setAuth_Me() {
        return instance.get<MyResponseType>(`auth/me`).then(res => res.data)
            /*.then(response => {    // не нужно если использовать async await
                return response.data

            });*/
    },
    login (email: string, password: string, rememberMe:boolean = false, captcha: null | string = null ) {
        return instance.post<LoginResponseType>('auth/login/', {email, password, rememberMe, captcha})
            .then(res => res.data)
    },
    logOut () {
        return instance.delete('auth/login/');
    },
}

export  const securityAPI = {
    getCaptchaURL() {
        return instance.get(`security/get-captcha-url`)
    }
}

/*export const  getUsers = (currentPage, pageSize) => {
    return        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`,
        {withCredentials: true})

}*/