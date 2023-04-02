import {usersAPI} from "../API/api";
import {updateObjectInArray} from "../utils/object-helpers";
import {PhotosType, UserType} from "../types/types";
import {number} from "yargs";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,       // відображае кількість користувачів на сторінці (яку порцію отримувати)
    totalUsersCount: 0,// скільки пришло юзерів
    currentPage: 1,    // номер сторінки
    isFetching: true, // крутилка загрузки
    followingInProgress: [] as Array<number>, //отключает кнопку // Масив id users
}

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, "id", {followed: true} )
                //Варіант 2
                //   users: [...state.users],
               /* users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: true}
                    }
                    return u;
                })*/
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, "id", {followed: false} )
                //Варіант 2
               /* users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: false}
                    }
                    return u;
                })*/
            }
        case SET_USERS: {
            return {...state, users: action.users}
            /* return {...state, users: [...state.users, ...action.users ]}*/
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.totalCount}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userID]
                    : state.followingInProgress.filter(id => id != action.userID)

            }
        }

        default:
            return state;
    }
}

type FollowSuccessActionType = {
    type: typeof FOLLOW
    userID: number
}
let followSuccess = (userID: number):FollowSuccessActionType => ({type: FOLLOW, userID})

type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW
    userID: number
}
let unfollowSuccess = (userID: number): UnfollowSuccessActionType => ({type: UNFOLLOW, userID})

type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
let setUsers = (users: Array<UserType>):SetUsersActionType => ({type: SET_USERS, users})

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
let setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({type: SET_CURRENT_PAGE, currentPage})

type SetTotalCountActionType = {
    type: typeof  SET_TOTAL_USERS_COUNT
    totalCount: number
}
let setTotalCount = (totalCount: number): SetTotalCountActionType => ({type: SET_TOTAL_USERS_COUNT, totalCount})

type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export let toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({type: TOGGLE_IS_FETCHING, isFetching})

type ToggleFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userID: number
}
let toggleFollowingProgress = (isFetching: boolean, userID: number): ToggleFollowingProgressActionType => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userID})

////////////////// Thunk  ///////////////////////////////////////////
export const getUsersThunkCreator = (currentPage: number, pageSize: number) => {
    return async (dispatch: any) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(currentPage))

        let response = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(response.data.items));
        dispatch(setTotalCount(response.data.totalCount))
    }
};
//---------------------------------------------------------------------------//
const followUnfollowFlow = async (dispatch: any, userID: number, apiMethod: any, actionCreator: any) => {
    dispatch(toggleFollowingProgress(true, userID));
    let response = await apiMethod(userID);
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userID))
    }
    dispatch(toggleFollowingProgress(false, userID))
};

export const follow = (userID: number) => {
    return async (dispatch: any) => {
        let apiMethod = usersAPI.postUsersFollow.bind(usersAPI)
        let actionCreator = followSuccess;

        followUnfollowFlow(dispatch, userID, apiMethod, actionCreator);
    }
};

export const unfollow = (userID: number) => {
    return  async (dispatch: any) => {
        let apiMethod = usersAPI.deleteUsersUnfollow.bind(usersAPI)
        let actionCreator = unfollowSuccess;

        followUnfollowFlow(dispatch, userID, apiMethod, actionCreator);
    }
};
//---------------------------------------------------------------//

/*export const follow = (userID) => {
    return async (dispatch) => {
    dispatch(toggleFollowingProgress(true, userID));
    let response = await usersAPI.postUsersFollow(userID)
    if (response.data.resultCode === 0) {
        dispatch(followSuccess(userID))
    }
    dispatch(toggleFollowingProgress(false, userID))
}
};

export const unfollow = (userID) => {
return  async (dispatch) => {
    dispatch(toggleFollowingProgress(true, userID));
    let response = await usersAPI.deleteUsersUnfollow(userID)
    if (response.data.resultCode === 0) {
        dispatch(unfollowSuccess(userID))
    }
    dispatch(toggleFollowingProgress(false, userID))
}
};*/
// used .then
/*export const getUsersThunkCreator = (currentPage, pageSize) => {
    return  (dispatch) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(currentPage))


        usersAPI.getUsers(currentPage, pageSize)
            .then(data => {
                dispatch(toggleIsFetching(false));
                dispatch(setUsers(data.items));
                dispatch(setTotalCount(data.totalCount))
                // dispatch(setCurrentPage(currentPage))
            });
    }
}
export const follow = (userID) => {
    return (dispatch) => {
        dispatch(toggleFollowingProgress(true, userID));
        usersAPI.postUsersFollow(userID)
            .then(data => {
                    if (data.resultCode === 0) {
                        dispatch(followSuccess(userID))
                    }
                    dispatch(toggleFollowingProgress(false, userID))
                }
            )
    }
}
export const unfollow = (userID) => {
    return (dispatch) => {
        dispatch(toggleFollowingProgress(true, userID));
        usersAPI.deleteUsersUnfollow(userID)
            .then(data => {
                    if (data.resultCode === 0) {
                        dispatch(unfollowSuccess(userID))
                    }
                    dispatch(toggleFollowingProgress(false, userID))
                }
            )
    }
}*/


export default usersReducer;




