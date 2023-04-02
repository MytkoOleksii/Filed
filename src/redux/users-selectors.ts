import {createSelector} from "reselect";
import {AppStateType} from "./redux-store";



//--------------------------------------------//

export const getUsersSelector = (state: AppStateType) => { //Примитивный селектор
    return state.usersPage.users;
}
/*export const getUsersSuper = (state) => {
    return getUsers(state).filter(u => true);
}*/
export const getUsers = createSelector( getUsersSelector,(users) => { // Сложный селектор, зависит от примитивных
  return  users.filter(u => true)
})

//-----------------------------------------------//
export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize;
}

export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount;
}

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage;
}

export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching;
}

export const getFollowInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress;
}