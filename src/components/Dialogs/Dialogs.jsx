import React from 'react';
import  teg from './Dialogs.module.css'
import {NavLink} from "react-router-dom";
const Dialogs = (props) => {
    return (
        <div className={teg.dialogs} >

            <div className={teg.dialogsItems}>
                <div className={teg.dialog}>
                    <NavLink to='/dialogs/1'>Dimon</NavLink>                </div>
                <div className={teg.dialog}>
                    <NavLink to='/dialogs/2'>Alex</NavLink>               </div>
                <div className={teg.dialog}>
                    <NavLink to='/dialogs/3'>Bob</NavLink>              </div>
                <div className={teg.dialog}>
                    <NavLink to='/dialogs/4'>Jek</NavLink>              </div>
                <div className={teg.dialog}>
                    <NavLink to='/dialogs/5'>Andrey</NavLink>
                </div>

            </div>
            <div className={teg.messages}>
                <div className={teg.message}>Hi</div>
                <div className={teg.message}>Hi 2</div>
                <div className={teg.message}>Hi 3</div>
                <div className={teg.message}>Hi 4</div>
            </div>

        </div>
    );
}

export default Dialogs;