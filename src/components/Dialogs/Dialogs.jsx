import React from 'react';
import teg from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

import {Field, reduxForm} from "redux-form";

const Dialogs = (props) => {
    let state = props.dialogsPage;

    let dialogsElement = state.dialogs.map( (element) => {
        return (
            <DialogItem key={element.id}  name={element.name} id={element.id} />
        )
    });

    let messageElement = state.messages.map( function (element) {
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
/*if (props.isAuth == false) {
    return  <Navigate to={'/Login'} /> ;
}*/
    return (

         <div className={teg.dialogs}>

            <div className={teg.dialogsItems}>
                {dialogsElement}
            </div>
            <div className={teg.messages}>
                <div>
                    {messageElement}
                </div>
<AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>
         </div>
    );
}
const AddMessageForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={"textarea"} name={"newMessageBody"}  placeholder={'Enter your message'} />
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm ({form: "dialogAddMessageForm"}) (AddMessageForm);

export default Dialogs;