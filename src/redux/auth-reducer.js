import {authAPI, authAPI as aythAPI,} from "../API/api";

const SET_USER_DATA = 'SET_USERS_DATA';

let initialState = {
    userID: null,
    email:  null,
    login:  null,
    isAuth: false,
};

const authReducer = (state = initialState,action) => {

    switch (action.type) {
  /*      case FOLLOW:
            return {
                ...state,
                //   users: [...state.users],
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }*/
        case SET_USER_DATA: {
            return {...state,
                    ...action.data,
            }
        }
        default:
            return state;
    }
}

/*let follow = (userID) => ( {type: FOLLOW, userID }) ;
let unfollow = (userID) => ( {type: UNFOLLOW, userID });*/
let setAuthUserData = (userID, email, login, isAuth) => ( {type: SET_USER_DATA, data: {userID, email, login, isAuth} });

////////////////// Thunk ////////////////

export  const setAuth_MeThunkCreator = () => { // getAuthUserData
    return (dispatch) => {
        aythAPI.setAuth_Me()
            .then(data => {
                if(data.resultCode === 0) {
                    let{id, email, login } = data.data;
                    dispatch(setAuthUserData(id, email, login,true));
                }
            });
    }
}

//авторизация, вход на сайта
export  const loginThunkCreator = (email, password, rememberMe) => (dispatch) => {
    authAPI.login(email, password, rememberMe)
        .then(response  => {
        if (response.data.resultCode === 0) {
            dispatch(setAuth_MeThunkCreator())
            //let {email, password, rememberMe} = response.data // ?????
        }
    });
}
// Виход из сайта
export  const logOutThunkCreator = () => (dispatch) => {
    authAPI.logOut()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null,false));
            }
        })

}
export default authReducer;






