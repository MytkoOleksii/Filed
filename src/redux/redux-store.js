import {combineReducers, createStore} from "redux";
import sidebarReducer from "./Sidebar-reducer";
import profileReducer from "./Profile-reducer";
import dialogsReducer from "./Dialogs-reducer";
import addLikes from "./addLike-reducer";


let reducers = combineReducers({
    sidebar: sidebarReducer,
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    addLikes: addLikes,
});

let store = createStore(reducers);
window.store = store;
export default store;