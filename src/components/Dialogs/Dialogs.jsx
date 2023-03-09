import React from 'react';
import teg from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import AddMessageForm from "./Message/addMessage/AddMessageForm";

const Dialogs = (props) => {
    let state = props.dialogsPage;
    let dialogsElement = state.dialogs.map((element) => {
        return (
            <DialogItem key={element.id} name={element.name} id={element.id}/>
        )
    });
    let messageElement = state.messages.map(function (element) {
        return (
            <Message key={element.id} message={element.messages}/>
        )
    })
    // let newMessageBody = state.newMessageBody;
    //
    // let onSendMessageClick = () => {
    //     props.sendMessage()
    // }
    /* let onNewMessageChange = (e) => {
        let body = e.target.value;
         props.updateNewMessageBody(body);
     }*/
    let addNewMessage = (values) => {
        props.sendMessage(values.newMessageBody)
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
                <AddMessageForm onSubmit={addNewMessage}/>
            </div>
        </div>
    );
}


export default Dialogs;