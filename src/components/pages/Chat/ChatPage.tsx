import React, {useEffect, useRef, useState} from 'react';
import {Avatar, Button} from "antd";
import {UserOutlined} from "@ant-design/icons";

import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../../redux/chat-reducer";
import {AppStateType} from "../../../redux/redux-store";
import {AnyAction} from "redux";


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

    const status = useSelector((state: AppStateType) => state.chat.status)

    useEffect(() => {
        dispatch(startMessagesListening() as unknown as AnyAction);
        return () => {
            dispatch(stopMessagesListening() as unknown as AnyAction)
        }
    }, [])

    return (
        <div>
            {status === 'error' && <div> Ошибка. Перезагрузить страницу. </div>}
            <Messages/>
            <AddMessagesChatForm/>
        </div>
    )
};
//----------------------------------------//

// Принимает массив узеров и сообщений, мапит и рисует компоненту
const Messages: React.FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [autoScrollIsActive, setAutoScrollIsActive] = useState(false)//вкл/викл перемотки

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        let element = e.currentTarget;
        if(Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !autoScrollIsActive && setAutoScrollIsActive  (true)
        } else  {
            autoScrollIsActive &&   setAutoScrollIsActive(false)
        }
    }
    //Если приходят другие сообщения происходит перемотка auto scroll
    useEffect(() => {
        if (autoScrollIsActive) {// Если автоскрол выключен нету перемотки
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])

    return (
        <div style={{height: '500px', overflowY: 'auto'}} onScroll={scrollHandler}>
            {messages.map((m, index) => <Message message={m} key={index}/>)}
            <div ref={messagesAnchorRef}>

            </div>
        </div>
    )
};
//----------------------------------------//

// Рисует Аватар пользователя и сообщение
const Message: React.FC<{ message: ChatMessageType }> = React.memo(({message}) => {

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
});
//--------------------------------------------//

//Рисует поле ввода сообщения и кнопку отправки
const AddMessagesChatForm: React.FC = () => {
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()
    const status = useSelector((state: AppStateType) => state.chat.status)


    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message) as unknown as AnyAction)

        setMessage('')
    }
    // Отправка смс по нажатию ентер
    const pressEnter = (e: any) => {
        if (e.keyCode == 13) {
            sendMessageHandler()
        }
    }
    return (
        <div>
            <div>
                <textarea onKeyDown={pressEnter} onChange={(e) => setMessage(e.currentTarget.value)}
                          value={message}></textarea>
            </div>
            <div>

                {/*// неможна отправить пока не подключится вебсокит*/}
                <Button type={"primary"}
                        disabled={status !== 'ready'}
                        onClick={sendMessageHandler}>Send</Button>
            </div>
        </div>
    )
};