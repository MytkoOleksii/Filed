import React, {useEffect, useState} from 'react';

import {Avatar} from "antd";

const wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
console.log(wsChannel)

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
        wsChannel.addEventListener('message', (event) => {
            //console.log(JSON.parse(event.data))
            let newMessages = JSON.parse(event.data)
            setMessages((prevMessages) => [...prevMessages,...newMessages])
        })
    }, []);

    return (
        <div style={{height: '500px', overflowY: 'auto'}}>
            {messages.map((m,index) => <Message message={m} key={index} />)}
        </div>
    )
};
//----------------------------------------//
const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {

    return (
        <div>
            <img src={message.photo} style={{width: '50px'}}/> <b>{message.userName}</b>
            <br/>
            {message.message}
            <hr/>
        </div>
    )
};


//--------------------------------------------//
const AddMessagesChatForm: React.FC = () => {

    const [message, setMessage] = useState('')
    const sendMessage = () => {
        if (!message) { // если нету message
            return;
        }
        wsChannel.send(message)
        setMessage('')
    }

    return (
        <div>
            <div>
                <textarea onChange={(e)=> setMessage(e.currentTarget.value)} value={message}></textarea>
            </div>
            <div>
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
};