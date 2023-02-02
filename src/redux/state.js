import React from "react";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

let store = {
    _state: {
        profilePage: {
            posts: [
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
            writeNewMessage: 'Hello',
            messages: [
                {id: 1, messages: 'hi'},
                {id: 2, messages: 'Are you'},
                {id: 3, messages: 'Simple pimple'},
                {id: 4, messages: 'Ben roberts hi hih i'},
                {id: 5, messages: 'good day'},
                {id: 6, messages: 'Hello world'},
            ],
            dialogs: [
                {id: 1, name: 'Dimon'},
                {id: 2, name: 'Bob'},
                {id: 3, name: 'Din'},
                {id: 4, name: 'Ben'},
                {id: 5, name: 'Alex'},
                {id: 6, name: 'Djeck'},
            ],

        },
    },
    getState() {
        return this._state
    },
    subscribe(observer) {
        this.callSubscriber = observer;
    },

    dispatch (action) { // { type: 'ADD-POST' }

        if (action.type === ADD_POST) {
            let newPost = {
                id: 7,//state.profilePage.posts.length
                likesCount: 0,
                messages: this._state.profilePage.newPostText,
            };
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newPostText = '';
            this.callSubscriber(this._state);
        } else  if (action.type === UPDATE_NEW_POST_TEXT) {

            this._state.profilePage.newPostText = action.newText;
            this.callSubscriber(this._state);
        }

    },

    callSubscriber() {
        console.log('rerender');
    },
///////////////////////////////////////
  /*  addPost(postMessage) {
        let newPost = {
            id: 7,//state.profilePage.posts.length
            likesCount: 0,
            messages: this._state.profilePage.newPostText,
        };
        this._state.profilePage.posts.push(newPost);
        this._state.profilePage.newPostText = '';
        this.callSubscriber(this._state);
    },*/
 /*   updateNewPostText(newText) {

        this._state.profilePage.newPostText = newText;
        this.callSubscriber(this._state);
    },*/
////////////////////////////////////////
    addMessage(getNewMessage) {
        let addNewMessage = {
            id: 7,
            messages: this._state.dialogsPage.writeNewMessage,
        };
        this._state.dialogsPage.messages.push(addNewMessage);
        this._state.dialogsPage.writeNewMessage = '';
        this.callSubscriber(this._state);

    },
    updateNewMessage(newText) {
        this._state.dialogsPage.writeNewMessage = newText;
        this.callSubscriber(this._state)
    },
    //////////////////////////////////////////////
    /* обрабатывает лайки */
    /* а- id поста, б-текст поста */
    addLikes(a, b) {
        this._state.profilePage.posts[a].likesCount = b
        this.callSubscriber(this._state)
    },
    //////////////////////////////////////////////////////
}

export const addPostActionCreator = () => {return({type: ADD_POST})}

export const updateNewPostTextActionCreator = (text) =>
{return ({ type: 'UPDATE-NEW-POST-TEXT', newText: text })
}


export default store;
window.store = store;