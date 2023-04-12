import {GetItemsType, instance, APIResponseType} from "./api";
import {AxiosPromise} from "axios";


export const usersAPI = {

    getUsers(currentPage: number = 1, pageSize: number = 10, term: string = '') {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}`)
        .then(response => {   // не нужно если использовать async await
             return response.data;
         });
    },
    postUsersFollow(id: number) {
        return instance.post<APIResponseType>(`follow/${id}`)
            .then(response => {  // не нужно если использовать async await
            return response.data;
        });
    },
    deleteUsersUnfollow(id: number) {
        return instance.delete(`follow/${id}`)
          .then(response => {   // не нужно если использовать async await
              return response.data;
          }) as Promise<APIResponseType>
    },
}