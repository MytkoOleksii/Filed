import React, {useEffect, useState} from 'react';
import {Avatar, Button} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {useDynamicList} from "@shopify/react-form";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../../redux/chat-reducer";
import {AppStateType} from "../../../redux/redux-store";
import {AnyAction} from "redux";
import {debug} from "util";

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

// Рисует две компоненты
const Chat: React.FC = () => {

   const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(startMessagesListening()as unknown as AnyAction);
       return () => {
            dispatch(stopMessagesListening()as unknown as AnyAction)
        }
    },[])

    return (

        <div>
            <Messages />
            <AddMessagesChatForm />
        </div>
    )
};
//----------------------------------------//

// Принимает массив узеров и сообщений, мапит и рисует компоненту
const Messages: React.FC = () => {
const messages = useSelector((state: AppStateType )=> state.chat.messages)
    console.log(messages)
    return (
        <div style={{height: '500px', overflowY: 'auto'}}>
            {messages.map((m, index) => <Message message={m} key={index}/>)}
        </div>
    )
};
//----------------------------------------//

// Рисует Аватар пользователя и сообщение
const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {

    return (
        <div>
            {message.photo ? <img src={message.photo} style={{width: '50px'}}/> :
                <Avatar size={64} icon={<UserOutlined/>}/>}
            <b>{message.userName}</b>
            <br/>
            {message.message}
            <hr/>
        </div>
    )
};
//--------------------------------------------//

//Рисует поле ввода сообщения и кнопку отправки
const AddMessagesChatForm: React.FC= () => {
    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')
 const dispatch = useDispatch()


    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message) as unknown as AnyAction)
        setMessage('')
    }
    return (
        <div>
            <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
            </div>
            <div>

                {/*// неможна отправить пока не подключится вебсокит*/}
                <Button type={"primary"}
                        onClick={sendMessageHandler}>Send</Button>
            </div>
        </div>
    )
};