import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/redux-store'
import {HashRouter} from "react-router-dom";
import {Provider} from "react-redux";
//@ts-ignore
const root = ReactDOM.createRoot(document.getElementById('root'));


    root.render(
        <React.StrictMode>
         {/*   <SamuraiJSApp />*/}
            {/*<BrowserRouter basename={process.env.PUBLIC_URL}>*/}
          {/*  <HashRouter basename='/'>*/}
            <HashRouter>
                <Provider store={store}>
                    <App/>
                </Provider>
             {/*   <App state={state} dispatch={store.dispatch.bind(store) } store={store} />

            <App state={store.getState()} addLikes={store.addLikes.bind(store)} addPost={store.addPost.bind(store)} updateNewPostText={store.updateNewPostText.bind(store)} addMessage={store.addMessage.bind(store)} updateNewMessage={store.updateNewMessage.bind(store)} />
*/}
                </HashRouter>

        </React.StrictMode>
    )


reportWebVitals();
