import React from 'react';
import {NavLink} from "react-router-dom";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import AddMessage from "./Message/addMessage/AddMessage";
import {sendMessageCreator, updateNewMessage, updateNewMessageBodyCreator} from "../../redux/Dialogs-reducer";
import Dialogs from "./Dialogs";

const DialogsContainer = (props) => {
    let state = props.store.getState().dialogsPage;

    let dialogsElement = state.dialogs.map( (element) => {
        return (
            <DialogItem name={element.name} id={element.id} />
        )
    });

    let messageElement = state.messages.map( function (element) {
        return (
            <Message message={element.messages}/>
        )
    })

    let newMessageBody = state.newMessageBody;

    let onSendMessageClick = () => {
        props.store.dispatch(sendMessageCreator())
    }

    let onNewMessageChange = (body) => {
        props.store.dispatch(updateNewMessageBodyCreator(body))
    }

    return (
                <Dialogs updateNewMessageBody={onNewMessageChange}
                         sendMessage={onSendMessageClick}
                         dialogsPage={state}
                />
    );
}

export default DialogsContainer;