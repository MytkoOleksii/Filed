import React from "react";
import {rerenderEntireTree} from "../render";

let state = {
    profilePage: {
        posts:  [
            {id: 1, likesCount: 10, messages: 'hi, how are you ?'},
            {id: 2, likesCount: 12, messages: 'Are you'},
            {id: 3, likesCount: 45, messages: 'Simple pimple'},
            {id: 4, likesCount: 2, messages: 'Ben roberts hi hi hi'},
            {id: 5, likesCount: 8, messages: 'good day'},
            {id: 6, likesCount: 34, messages: 'Hello world'},
        ],
newPostText: 'It-kamasutra.'
    },
    dialogsPage: {
        writeNewMessage: 'Hello ',
        messages: [
            {id: 1, messages: 'hi'},
            {id: 2, messages: 'Are you'},
            {id: 3, messages: 'Simple pimple'},
            {id: 4, messages: 'Ben roberts hi hih i'},
            {id: 5, messages: 'good day'},
            {id: 6, messages: 'Hello world'},
        ],
        dialogs:  [
            {id: 1, name: 'Dimon'},
            {id: 2, name: 'Bob'},
            {id: 3, name: 'Din'},
            {id: 4, name: 'Ben'},
            {id: 5, name: 'Alex'},
            {id: 6, name: 'Djeck'},
        ],

    },
}

export  let addPost = (postMessage) => {
    let newPost = {
        id: 7 ,//state.profilePage.posts.length
        likesCount:0,
        messages: state.profilePage.newPostText,
    };
    state.profilePage.posts.push(newPost);
    state.profilePage.newPostText = '';
    rerenderEntireTree(state);
}

export  let updateNewPostText = (newText) => {

    state.profilePage.newPostText = newText;
    rerenderEntireTree(state);
}


export let addMessage = (getNewMessage) => {
    let addNewMessage = {
        id: 7,
        messages: getNewMessage,
    }
    state.dialogsPage.messages.push(addNewMessage);
state.dialogsPage.writeNewMessage = '';
    rerenderEntireTree(state);

}



export  default state;