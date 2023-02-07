import React from 'react';
import {NavLink} from "react-router-dom";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import AddMessage from "./Message/addMessage/AddMessage";
import {sendMessageCreator, updateNewMessage, updateNewMessageBodyCreator} from "../../redux/Dialogs-reducer";
import Dialogs from "./Dialogs";
import StoreContext from "../../StoreContext";

const DialogsContainer = (props) => {

    return (
        <StoreContext.Consumer>
            { ( store )=> (

                <Dialogs updateNewMessageBody={(body) => {
                    store.dispatch(updateNewMessageBodyCreator(body))
                }}
                         sendMessage={() => {
                             store.dispatch(sendMessageCreator())
                         }}
                         dialogsPage={store.getState().dialogsPage}/>
            )}
        </StoreContext.Consumer>
    );
}

export default DialogsContainer;