import React from 'react';
import teg from './Dialogs.module.css'
import {NavLink} from "react-router-dom";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import AddMessage from "./Message/addMessage/AddMessage";

const Dialogs = (props) => {

    let dialogsElement = props.dialogsPage.dialogs.map( (element) => {
        return (
            <DialogItem name={element.name} id={element.id} />
        )
    });

    let messageElement = props.dialogsPage.messages.map( function (element) {
        return (
            <Message message={element.messages}/>
        )
    })

    return (
        <div>
         <div className={teg.dialogs}>

            <div className={teg.dialogsItems}>
                {dialogsElement}
            </div>
            <div className={teg.messages}>
                {messageElement}
            </div>

         </div>
           <AddMessage  addMessage={props.addMessage} writeNewMessage={props.dialogsPage.writeNewMessage}/>
        </div>
    );
}

export default Dialogs;