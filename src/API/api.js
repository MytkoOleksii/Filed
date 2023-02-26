import axios from "axios";

const  instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        "API-KEY": "ea6bd0bc-5a76-4173-9e3a-c5be313ce490"
    }

})

export const usersAPI ={

 getUsers (currentPage, pageSize) {
     return instance.get(`users?page=${currentPage}&count=${pageSize}`)
         .then(response => {
             return response.data;
         });
 },
postUsersFollow (id) {
     return instance.post(`follow/${id}`)
         .then(response => {
             return response.data;
         });
},
deleteUsersUnfollow(id) {
     return instance.delete(`follow/${id}`)
         .then(response => {
             return response.data;
         });
},

setAuth_Me() {
    return instance.get(`auth/me` )
        .then(response => {
            return response.data

        });
},

}



/*export const  getUsers = (currentPage, pageSize) => {
    return        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`,
        {withCredentials: true})

}*/