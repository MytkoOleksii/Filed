import {getAuthUserData} from "./auth-reducer";
import {AppStateType, InferActionsTypes} from "./redux-store";
import {ThunkAction} from "redux-thunk";


let initialState = {
    initialized: false,
};

export type  ActionsType = InferActionsTypes<typeof actionsCreator>// получает у приходящих екшенов их тип

export type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/APP/INITIALIZED_SUCCESS' :
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

export const actionsCreator = {
    initializedSuccess: () => ({type: 'SN/APP/INITIALIZED_SUCCESS'} as const),
}
//------------------------thunk-------------------------//
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise])
        .then(() => {
            dispatch(actionsCreator.initializedSuccess());
        });
}

export default appReducer;