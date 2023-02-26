import React from 'react';
import {NavLink} from "react-router-dom";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import AddMessage from "./Message/addMessage/AddMessage";
import {sendMessageCreator, updateNewMessage, updateNewMessageBodyCreator} from "../../redux/Dialogs-reducer";
import Dialogs from "./Dialogs";

import {connect} from "react-redux";

let mapStateToProps = (state) => {
return {
    dialogsPage: state.dialogsPage,
    isAuth: state.auth.isAuth,
}
};
let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: () => {
            dispatch(sendMessageCreator());
        },
       updateNewMessageBody: (body) => {
            dispatch(updateNewMessageBodyCreator(body))
        },
    }

};

let DialogsContainer = connect (mapStateToProps,mapDispatchToProps) (Dialogs);

export default DialogsContainer;