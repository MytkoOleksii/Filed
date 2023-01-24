import React from 'react';
import teg from './Dialogs.module.css'
import {NavLink} from "react-router-dom";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

const Dialogs = (props) => {

    let dialogsElement = props.state.dialogs.map( (element) => {
        return (
            <DialogItem name={element.name} id={element.id} />
        )
    });

    let messageElement = props.state.messages.map( function (element) {
        return (
            <Message message={element.messages} />
        )
    })
    return (
        <div className={teg.dialogs}>

            <div className={teg.dialogsItems}>
                {dialogsElement}
                {/*<DialogItem name={dialogsData[0].name} id={dialogsData[0].id}/>
                <DialogItem name={dialogsData[1].name} id={dialogsData[1].id}/>
                <DialogItem name={dialogsData[2].name} id={dialogsData[2].id}/>
                <DialogItem name={dialogsData[3].name} id={dialogsData[3].id}/>
                <DialogItem name={dialogsData[4].name} id={dialogsData[4].id}/>*/}

                {/* <div className={teg.dialog}>
                    <NavLink to='/dialogs/1'>Dimon</NavLink>                </div>
                <div className={teg.dialog}>
                    <NavLink to='/dialogs/2'>Alex</NavLink>               </div>
                <div className={teg.dialog}>
                    <NavLink to='/dialogs/3'>Bob</NavLink>              </div>
                <div className={teg.dialog}>
                    <NavLink to='/dialogs/4'>Jek</NavLink>              </div>
                <div className={teg.dialog}>
                    <NavLink to='/dialogs/5'>Andrey</NavLink>
                </div>*/}
            </div>
            <div className={teg.messages}>

                {messageElement}

                {/*<Message message={messageData[0].messages}/>
                <Message message={messageData[1].messages}/>
                <Message message={messageData[2].messages}/>
                <Message message={messageData[3].messages}/>
                <Message message={messageData[4].messages}/>*/}


                {/*<div className={teg.message}>Hi</div>
                <div className={teg.message}>Hi 2</div>
                <div className={teg.message}>Hi 3</div>
                <div className={teg.message}>Hi 4</div>*/}
            </div>

        </div>
    );
}

export default Dialogs;