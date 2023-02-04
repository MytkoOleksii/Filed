import {combineReducers, createStore} from "redux";
import sidebarReducer from "./Sidebar-reducer";
import {profileReducer} from "./Profile-reducer";
import dialogsReducer from "./Dialogs-reducer";
import {addLikes} from "./Profile-reducer";


let reducers = combineReducers({
    sidebar: sidebarReducer,
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    addLikes: addLikes,
});

let store = createStore(reducers);
console.log(store)

export default store;