import React from 'react';
import teg from './DialogItem.module.css'
import {NavLink} from "react-router-dom";


const DialogItem = (props) => {

    return (
        <div className={teg.dialog + ' ' + teg.active}>
            <NavLink className={teg.dialog2} to={'/dialog/' + props.id}>{props.name}</NavLink>
        </div>
    )
}



export default DialogItem;