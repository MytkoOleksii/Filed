import {createSelector} from "reselect";
import {AppStateType} from "./redux-store";



//--------------------------------------------//

export const getSelectIsAuthSelector = (state: AppStateType) => { //Примитивный селектор
return state.auth.isAuth
};
export const selectUserCurrentSelector = (state:AppStateType) => {
    return state.auth.login
}
