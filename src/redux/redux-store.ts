import {applyMiddleware, combineReducers, createStore} from "redux";
//import sidebarReducer from "./Sidebar-reducer";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
//import addLikes from "./addLike-reducer";
import usersReducerTs from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from  'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import appReducer from "./app-reducer";
import {compose } from 'redux';

let rootReducer = combineReducers({
   // sidebar: sidebarReducer,
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
   // addLikes: addLikes,
    usersPage: usersReducerTs,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
});

type RootReducerType = typeof rootReducer;
 export type AppStateType = ReturnType<RootReducerType>
 let state: AppStateType;

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware) ));

//let store = createStore(reducers, applyMiddleware(thunkMiddleware));
//@ts-ignore
window.store = store;
export default store;