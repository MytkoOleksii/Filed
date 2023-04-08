import axios from "axios";
import {UserType} from "../types/types";
//const axios= require('axios')

export const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        "API-KEY": "11cbf-8851-433c-809e-baed864fa815"
    }

})

export  enum  ResultCodesEnum  {
    Success, // = 0
    Error,   // = 1
}
export  enum  ResultCodeForCaptchaEnum  {
    CaptchaIsRequired = 10 ,
}

export type GetItemsType = {
items: Array<UserType>
    totalCount: number
    error: string | null
}

/*export const  getUsers = (currentPage, pageSize) => {
    return        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`,
        {withCredentials: true})

}*/
export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}