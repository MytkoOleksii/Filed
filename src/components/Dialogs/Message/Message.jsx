import React from 'react';
import teg from './Message.module.css'

const Message = (props) => {
    return (

        <div className={teg.message}>{props.message}</div>



    )
}
export default Message;