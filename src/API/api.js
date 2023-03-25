import axios from "axios";
//const axios= require('axios')

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        "API-KEY": "11cbf-8851-433c-809e-baed864fa815"
    }

})


export const usersAPI = {

    getUsers(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
           /* .then(response => {   // не нужно если использовать async await
                return response.data;
            });*/
    },
    postUsersFollow(id) {
        return instance.post(`follow/${id}`)
            /*.then(response => {  // не нужно если использовать async await
                return response.data;
            });*/
    },
    deleteUsersUnfollow(id) {
        return instance.delete(`follow/${id}`)
          /*  .then(response => {   // не нужно если использовать async await
                return response.data;
            });*/
    },
    getUserID_URL(userId) {
        console.log('Old method Please use profileAPI obj'  )
        return profileAPI.getUserID_URL(userId)
    }
}

export  const  profileAPI = {
    getUserID_URL(userId) {
        return instance.get(`profile/` + userId)
           /* .then(response => {  // не нужно если использовать async await
                return response.data
            });*/
    },
    getStatus(userId) {
        return instance.get(`profile/status/` + userId)
    },
    updateStatus(status) {
        return instance.put(`profile/status/`,{status: status} )
    },
}
/*export const loginAPI = {
    setLogin (email,pass,ok) {
        return instance.post(`auth/login/`,{email: email, password: pass,rememberMe: ok})
    },
    outLogin () {
        return instance.delete(`auth/login/`)
    }
}*/

export const authAPI = {
    setAuth_Me() {
        return instance.get(`auth/me`)
            /*.then(response => {    // не нужно если использовать async await
                return response.data

            });*/
    },
    login (email, password, rememberMe = false) {
        return instance.post('auth/login/', {email, password, rememberMe});
    },
    logOut () {
        return instance.delete('auth/login/');
    },

}


/*export const  getUsers = (currentPage, pageSize) => {
    return        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`,
        {withCredentials: true})

}*/