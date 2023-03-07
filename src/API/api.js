import axios from "axios";

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        "API-KEY": "ea6bd0bc-5a76-4173-9e3a-c5be313ce490"
    }

})


export const usersAPI = {

    getUsers(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            });
    },
    postUsersFollow(id) {
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
    getUserID_URL(userId) {
        console.log('Old method Please use profileAPI obj'  )
        return profileAPI.getUserID_URL(userId)
    }
}

export  const  profileAPI = {
    getUserID_URL(userId) {
        return instance.get(`profile/` + userId)
            .then(response => {
                return response.data
            });
    },
    getStatus(userId) {
        return instance.get(`profile/status/` + userId)
    },
    updateStatus(status) {
        return instance.put(`profile/status/`,{status: status} )
    },
}
export const loginAPI = {
    setLogin (email,pass,ok) {
        return instance.post(`auth/login/`,{email: email, password: pass,rememberMe: ok})
    },
    outLogin () {
        return instance.delete(`auth/login/`)
    }
}

export const authAPI = {
    setAuth_Me() {
        return instance.get(`auth/me`)
            .then(response => {
                return response.data

            });
    },
}


/*export const  getUsers = (currentPage, pageSize) => {
    return        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`,
        {withCredentials: true})

}*/