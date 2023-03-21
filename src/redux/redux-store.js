import {applyMiddleware, combineReducers, createStore} from "redux";
import sidebarReducer from "./Sidebar-reducer";
import profileReducer from "./Profile-reducer";
import dialogsReducer from "./Dialogs-reducer";
import addLikes from "./addLike-reducer";
import usersReducer from "./Users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from  'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import appReducer from "./app-reducer";
import {compose } from 'redux';

let reducers = combineReducers({
    sidebar: sidebarReducer,
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    addLikes: addLikes,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
});



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware) ));

//let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;
export default store;