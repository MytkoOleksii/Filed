import React from "react";

let rerenderEntireTree = function () {
    console.log('rerender')
}


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
        writeNewMessage: 'Hello2 ',
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
///////////////////////////////////////////////////////
/* обрабатывает лайки */
/* а- id поста , б- текст поста */
export  let addLikes = (a,b) => {
    state.profilePage.posts[a].likesCount = b
    rerenderEntireTree(state)
}
//////////////////////////////////////////////////////
export  const addPost = (postMessage) => {
    let newPost = {
        id: 7 ,//state.profilePage.posts.length
        likesCount:0,
        messages: state.profilePage.newPostText,
    };
    state.profilePage.posts.push(newPost);
    state.profilePage.newPostText = '';
    rerenderEntireTree(state);
}

export  const updateNewPostText = (newText) => {

    state.profilePage.newPostText = newText;
    rerenderEntireTree(state);
}

//////////////////////////////////////////////////////
export const addMessage = (getNewMessage) => {
    let addNewMessage = {
        id: 7,
        messages: state.dialogsPage.writeNewMessage,
    }
    state.dialogsPage.messages.push(addNewMessage);
    state.dialogsPage.writeNewMessage = '';
    rerenderEntireTree(state);

}

export const updateNewMessage = (newText) => {
    state.dialogsPage.writeNewMessage = newText;
    rerenderEntireTree(state)
}
/////////////////////////////////////////////////////////

export const subscribe = (observer) => {
rerenderEntireTree = observer;
}


export  default state;