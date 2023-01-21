import React from 'react';
import teg from './Dialogs.module.css'
import {NavLink} from "react-router-dom";


const DialogItem = (props) => {

    return (
        <div className={teg.dialog + ' ' + teg.active}>
            <NavLink className={teg.dialog2} to={'/dialog/' + props.id}>{props.name}</NavLink>
        </div>
    )
}

const Message = (props) => {
    return (
        <div className={teg.message}>{props.message}</div>
    )
}


const Dialogs = (props) => {

    let dialogsData = [
        {id: 1, name: 'Dimon'},
        {id: 2, name: 'Bob'},
        {id: 3, name: 'Din'},
        {id: 4, name: 'Ben'},
        {id: 5, name: 'Alex'},
        {id: 6, name: 'Djeck'},
    ];

    let messageData = [
        {id: 1, messages: 'hi'},
        {id: 2, messages: 'Are you'},
        {id: 3, messages: 'Simple pimple'},
        {id: 4, messages: 'Ben roberts hi hih i'},
        {id: 5, messages: 'good day'},
        {id: 6, messages: 'Hello world'},
    ]


    return (
        <div className={teg.dialogs}>

            <div className={teg.dialogsItems}>

                <DialogItem name={dialogsData[0].name} id={dialogsData[0].id}/>
                <DialogItem name={dialogsData[1].name} id={dialogsData[1].id}/>
                <DialogItem name={dialogsData[2].name} id={dialogsData[2].id}/>
                <DialogItem name={dialogsData[3].name} id={dialogsData[3].id}/>
                <DialogItem name={dialogsData[4].name} id={dialogsData[4].id}/>

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

                <Message message={messageData[0].messages}/>
                <Message message={messageData[1].messages}/>
                <Message message={messageData[2].messages}/>
                <Message message={messageData[3].messages}/>
                <Message message={messageData[4].messages}/>


                {/*<div className={teg.message}>Hi</div>
                <div className={teg.message}>Hi 2</div>
                <div className={teg.message}>Hi 3</div>
                <div className={teg.message}>Hi 4</div>*/}
            </div>

        </div>
    );
}

export default Dialogs;