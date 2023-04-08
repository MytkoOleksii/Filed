import {usersAPI} from "../API/api";
import {updateObjectInArray} from "../utils/object-helpers";
import {PhotosType, UserType} from "../types/types";
import {number} from "yargs";
import {AppStateType, InferActionsTypes} from "./redux-store";
import {Dispatch} from "react";
import {ThunkAction} from "redux-thunk";

/*const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';*/

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,       // відображае кількість користувачів на сторінці (яку порцію отримувати)
    totalUsersCount: 0,// скільки пришло юзерів
    currentPage: 1,    // номер сторінки
    isFetching: true, // крутилка загрузки
    followingInProgress: [] as Array<number>, //отключает кнопку // Масив id users
}

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionTypes): InitialStateType => {

    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, "id", {followed: true})
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, "id", {followed: false})
            }
        case 'SET_USERS': {
            return {...state, users: action.users}
            /* return {...state, users: [...state.users, ...action.users ]}*/
        }
        case 'SET_CURRENT_PAGE': {
            return {...state, currentPage: action.currentPage}
        }
        case 'SET_TOTAL_USERS_COUNT': {
            return {...state, totalUsersCount: action.totalCount}
        }
        case 'TOGGLE_IS_FETCHING': {
            return {...state, isFetching: action.isFetching}
        }
        case 'TOGGLE_IS_FOLLOWING_PROGRESS': {
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
type ActionTypes = InferActionsTypes<typeof actionsCreate>// получает у приходящих екшенов их тип

export const actionsCreate = {
    followSuccess: (userID: number) => ({type: 'FOLLOW', userID} as const),

    unfollowSuccess: (userID: number) => ({type: 'UNFOLLOW', userID} as const),

    setUsers: (users: Array<UserType>) => ({type: 'SET_USERS', users} as const),

    setCurrentPage: (currentPage: number) => ({type: 'SET_CURRENT_PAGE', currentPage} as const),

    setTotalCount: (totalCount: number)=> ({type: 'SET_TOTAL_USERS_COUNT', totalCount} as const),

    toggleIsFetching: (isFetching: boolean) => ({type: 'TOGGLE_IS_FETCHING', isFetching} as const),

    toggleFollowingProgress: (isFetching: boolean, userID: number) => ({type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userID} as const),
}
//---------------------- Action Create -------------------------------//

/*let followSuccess = (userID: number) => ({type: FOLLOW, userID})
let unfollowSuccess = (userID: number) => ({type: UNFOLLOW, userID})
let setUsers = (users: Array<UserType>) => ({type: SET_USERS, users})
export let setCurrentPage = (currentPage: number) => ({type: SET_CURRENT_PAGE, currentPage})
let setTotalCount = (totalCount: number)=> ({type: SET_TOTAL_USERS_COUNT, totalCount})
export let toggleIsFetching = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching})
let toggleFollowingProgress = (isFetching: boolean, userID: number) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userID})*/

//----------------------------------------------- Thunk  -----------------------------------------------------------//
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>
export const getUsersThunkCreator = (currentPage: number, pageSize: number): ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> => {
    return async (dispatch, getState) => {
        dispatch(actionsCreate.toggleIsFetching(true));
        dispatch(actionsCreate.setCurrentPage(currentPage))

        let response = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(actionsCreate.toggleIsFetching(false));
        dispatch(actionsCreate.setUsers(response.data.items));
        dispatch(actionsCreate.setTotalCount(response.data.totalCount))
    }
};
//---------------------------------------------------------------------------//
const followUnfollowFlow = async (dispatch: Dispatch<ActionTypes>, userID: number, apiMethod: any, actionCreator: (userId: number) => ActionTypes) => {
    dispatch(actionsCreate.toggleFollowingProgress(true, userID));
    let response = await apiMethod(userID);
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userID))
    }
    dispatch(actionsCreate.toggleFollowingProgress(false, userID))
};

export const follow = (userID: number): ThunkType => {
    return async (dispatch) => {
        let apiMethod = usersAPI.postUsersFollow.bind(usersAPI)
        let actionCreator = actionsCreate.followSuccess;

        followUnfollowFlow(dispatch, userID, apiMethod, actionCreator);
    }
};

export const unfollow = (userID: number): ThunkType => {
    return async (dispatch) => {
        let apiMethod = usersAPI.deleteUsersUnfollow.bind(usersAPI)
        let actionCreator = actionsCreate.unfollowSuccess;

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




