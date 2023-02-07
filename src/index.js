import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/redux-store'
import {BrowserRouter} from "react-router-dom";
import StoreContext from "./StoreContext";

console.log(store)
const root = ReactDOM.createRoot(document.getElementById('root'));

export let rerenderEntireTree = (state) => {
    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <StoreContext.Provider value={store}>

                    <App/>
                </StoreContext.Provider>
                {/*<App state={state} dispatch={store.dispatch.bind(store) } store={store} />*/}

                {/*
            <App state={store.getState()} addLikes={store.addLikes.bind(store)} addPost={store.addPost.bind(store)} updateNewPostText={store.updateNewPostText.bind(store)} addMessage={store.addMessage.bind(store)} updateNewMessage={store.updateNewMessage.bind(store)} />
*/}</BrowserRouter>
        </React.StrictMode>
    );
}

rerenderEntireTree(store.getState());

store.subscribe(() => {
    let state = store.getState();
    rerenderEntireTree(state);
});

reportWebVitals();
