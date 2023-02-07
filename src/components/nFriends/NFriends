import React from 'react';
import tag from './NFriends.module.css'
import DialogItem from "../Dialogs/DialogItem/DialogItem";
import Dialogs from "../Dialogs/Dialogs";
import teg from "../Dialogs/DialogItem/DialogItem.module.css";
import {NavLink} from "react-router-dom";


let img =  <img src='data:image/png;base64,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'/>


function NFriends(props) {
    let user = props.user.map( (element) => {
        return{ name: element.name ,
               id: element.id }
    });
    return (
        <div className={tag.friends}>
            <div>
              <div>  <span> friends</span></div>

                <div className={tag.left} > <NavLink className={tag.left +''+ tag.friends} to={'/dialog/' + user[3].id}>{img}{user[user[3].id].name}</NavLink> </div>
                <div className={tag.left} > <NavLink className={tag.left +''+ tag.friends} to={'/dialog/' + user[2].id}>{img}{user[user[2].id].name}</NavLink> </div>
                <div className={tag.left} > <NavLink className={tag.left +''+ tag.friends} to={'/dialog/' + user[1].id}>{img}{user[1].name}</NavLink> </div>
          {/*  <div className={tag.left} > <a href='#'>{img}</a></div>
            <div className={tag.left} > <a href='#'>{img}</a></div>
            <div className={tag.left} > <a href='#'>{img}</a></div>*/}
            </div>
        </div>
    );
}

export default NFriends;