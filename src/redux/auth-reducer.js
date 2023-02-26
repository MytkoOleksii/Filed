import {usersAPI} from "../API/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USER_DATA = 'SET_USERS_DATA';


let initialState = {
    userID: null,
    email: null,
    login: null,
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
                      isAuth: true,
            }

        }

        default:
            return state;
    }
}

/*let follow = (userID) => ( {type: FOLLOW, userID }) ;
let unfollow = (userID) => ( {type: UNFOLLOW, userID });*/
export let setAuthUserData = (userID, email, login) => ( {type: SET_USER_DATA, data: {userID, email, login} });
////////////////// Thunk ////////////////

export  const setAuth_MeThunkCreator = () => {
    return (dispatch) => {
        usersAPI.setAuth_Me()
            .then(data => {
                if(data.resultCode === 0) {
                    let{id, email, login } = data.data;
                    dispatch(setAuthUserData(id, email, login));
                }})
    }
}

export default authReducer;






