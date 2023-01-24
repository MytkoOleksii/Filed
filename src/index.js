import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

let dialogsData = [
    {id: 1, name: 'Dimon'},
    {id: 2, name: 'Bob'},
    {id: 3, name: 'Din'},
    {id: 4, name: 'Ben'},
    {id: 5, name: 'Alex'},
    {id: 6, name: 'Djeck'},
]
let messageData = [
    {id: 1, messages: 'hi'},
    {id: 2, messages: 'Are you'},
    {id: 3, messages: 'Simple pimple'},
    {id: 4, messages: 'Ben roberts hi hih i'},
    {id: 5, messages: 'good day'},
    {id: 6, messages: 'Hello world'},
]
let postData = [
    {id: 1, likesCount: 10, messages: 'hi, how are you ?'},
    {id: 2, likesCount: 12, messages: 'Are you'},
    {id: 3, likesCount: 45, messages: 'Simple pimple'},
    {id: 4, likesCount: 2, messages: 'Ben roberts hi hi hi'},
    {id: 5, likesCount: 8, messages: 'good day'},
    {id: 6, likesCount: 34, messages: 'Hello world'},
]

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App postData={postData} dialogsData={dialogsData} messageData={messageData} />
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
