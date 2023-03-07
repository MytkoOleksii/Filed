import {applyMiddleware, combineReducers, createStore} from "redux";
import sidebarReducer from "./Sidebar-reducer";
import profileReducer from "./Profile-reducer";
import dialogsReducer from "./Dialogs-reducer";
import addLikes from "./addLike-reducer";
import usersReducer from "./Useres-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from  'redux-thunk';
import {reducer as formReducer} from 'redux-form';


let reducers = combineReducers({
    sidebar: sidebarReducer,
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    addLikes: addLikes,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;
export default store;