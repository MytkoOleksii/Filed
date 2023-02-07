import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/redux-store'
import {BrowserRouter} from "react-router-dom";
import StoreContext from "./OLD-StoreContext";
import {Provider} from "react-redux";

console.log(store)
const root = ReactDOM.createRoot(document.getElementById('root'));


    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <Provider store={store}>
                    <App/>
                </Provider>
                {/*<App state={state} dispatch={store.dispatch.bind(store) } store={store} />*/}

                {/*
            <App state={store.getState()} addLikes={store.addLikes.bind(store)} addPost={store.addPost.bind(store)} updateNewPostText={store.updateNewPostText.bind(store)} addMessage={store.addMessage.bind(store)} updateNewMessage={store.updateNewMessage.bind(store)} />
*/}</BrowserRouter>
        </React.StrictMode>
    )


reportWebVitals();
