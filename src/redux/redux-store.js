import {combineReducers, createStore} from "redux";
import sidebarReducer from "./Sidebar-reducer";
import profileReducer from "./Profile-reducer";
import dialogsReducer from "./Dialogs-reducer";
import addLikes from "./addLike-reducer";
import usersReducer from "./Useres-reducer";


let reducers = combineReducers({
    sidebar: sidebarReducer,
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    addLikes: addLikes,
    usersPage: usersReducer,
});

let store = createStore(reducers);
export default store;