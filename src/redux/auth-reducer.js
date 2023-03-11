import {authAPI, authAPI as aythAPI,} from "../API/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USERS_DATA';
//const ERROR_COD = 'ERROR_COD';

let initialState = {
    userID: null,
    email:  null,
    login:  null,
    isAuth: false,
  //  error:  "",
};


const authReducer = (state = initialState,action) => {

    switch (action.type) {
        case SET_USER_DATA: {
            return {...state,
                    ...action.data,
            }
        }
      /*  case ERROR_COD:
            return {...state,
               error: action.error,
            }*/
        default:
            return state;
    }
}

/*let follow = (userID) => ( {type: FOLLOW, userID }) ;
let unfollow = (userID) => ( {type: UNFOLLOW, userID });*/
let setAuthUserData = (userID, email, login, isAuth) => ( {type: SET_USER_DATA, data: {userID, email, login, isAuth} });
//let errorCod = (error) => ({type: ERROR_COD, error})

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
        } else {
             let messageError = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
             let error = stopSubmit('login', {_error:messageError });
            dispatch(error);
            //Варіант 1
          //  dispatch(errorCod(response.data.messages))
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






