import {applyMiddleware, combineReducers, createStore, Action} from "redux";
//import sidebarReducer from "./Sidebar-reducer";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
//import addLikes from "./addLike-reducer";
import usersReducerTs from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import appReducer, {ActionsType} from "./app-reducer";
import {compose } from 'redux';
import chatReducer from "./chat-reducer";

let rootReducer = combineReducers({
   // sidebar: sidebarReducer,
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
   // addLikes: addLikes,
    usersPage: usersReducerTs,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
    chat: chatReducer,
});

type RootReducerType = typeof rootReducer;
 export type AppStateType = ReturnType<RootReducerType>
//----------------------------------OLD----------------------------------------------------------//
// Вытягивает типы с объектов action creator
//type PropertiesTypes<T> = T extends  {[key: string]: infer U} ? U : never;
//export type InferActionsTypes<T extends {[key: string]: (...args: any) => any }> = ReturnType<PropertiesTypes<T>>
//--------------------------------------------------------------------------------------------//

// Вытягивает типы с объектов action creator
export type InferActionsTypes<T> = T extends {[key: string]: (...args: any[]) => infer U } ? U : never;// lessons 11

// Типизирует Thunk creator
// A - Action Type, R - Promise<void>,
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware) ));

//let store = createStore(reducers, applyMiddleware(thunkMiddleware));
//@ts-ignore
window.store = store;
export default store;