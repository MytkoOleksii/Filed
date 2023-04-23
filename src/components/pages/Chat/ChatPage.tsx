import React, {useEffect, useState} from 'react';

import {Avatar} from "antd";

const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
console.log(ws)

export type ChatMessageType = {
    message: string,
    photo: string
    userId: number
    userName: string
}

const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat/>
        </div>
    );
};

export default ChatPage;
//----------------------------------------//
const Chat: React.FC = () => {

    return (
        <div>
            <Messages/>
            <AddMessagesChatForm/>
        </div>
    )
};
//----------------------------------------//

const Messages: React.FC = () => {

    const [messages, setMessages] = useState<ChatMessageType[]>([]);

    useEffect(() => {
        ws.addEventListener('message', (event) => {
            console.log(JSON.parse(event.data))
            setMessages(JSON.parse(event.data))
        })
    }, [])

    return (
        <div style={{height: '500px', overflowY: 'auto'}}>
            {messages.map((m) => <Message message={m} key={m.userId} />)}
        </div>
    )
};
//----------------------------------------//
const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {

    return (
        <div>
            <Avatar/>
            <img src={message.photo} style={{width: '50px'}}/> <b>{message.userName}</b>
            <br/>
            {message.message}
            <hr/>
        </div>
    )
};


//--------------------------------------------//
const AddMessagesChatForm: React.FC = () => {
    return (
        <div>
            <div>
                <textarea></textarea>
            </div>
            <div>
                <button>Send</button>
            </div>
        </div>
    )
};