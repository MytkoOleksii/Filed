import React from 'react';
import teg from './Dialogs.module.css'
import {NavLink} from "react-router-dom";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import AddMessage from "./Message/addMessage/AddMessage";
import {sendMessageCreator, updateNewMessage, updateNewMessageBodyCreator} from "../../redux/Dialogs-reducer";

const Dialogs = (props) => {
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

    let onNewMessageChange = (e) => {
        let body = e.target.value;
        props.store.dispatch(updateNewMessageBodyCreator(body))
    }

    return (

        <div className={teg.dialogs}>

            <div className={teg.dialogsItems}>
                {dialogsElement}
            </div>
            <div className={teg.messages}>
                <div>
                    {messageElement}
                </div>
                <div>
                    <div>
                        <textarea onChange={onNewMessageChange}
                                  value={newMessageBody}
                                  placeholder={'Enter your message'}></textarea>
                    </div>
                    <div>
                        <button onClick={onSendMessageClick}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dialogs;