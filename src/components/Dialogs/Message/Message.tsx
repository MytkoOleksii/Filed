import React from 'react';
import teg from './Message.module.css'

type PropsType = {
    message: string
}
const Message: React.FC<PropsType> = (props) => {
    return (
        <div className={teg.message}>{props.message}</div>
    )
}
export default Message;