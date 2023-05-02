import React, {useEffect, useRef, useState} from 'react';
import {Avatar, Button, Popover} from "antd";
import {SendOutlined, SmileOutlined, UserOutlined} from "@ant-design/icons";

import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../../redux/chat-reducer";
import {AppStateType} from "../../../redux/redux-store";
import {AnyAction} from "redux";
import TextArea from "antd/es/input/TextArea";
import EmojiPicker from "emoji-picker-react";


export type ChatMessageType = {
    message: string,
    photo: string
    userId: number
    userName: string
}

type ScrollType ={
    setAutoScrollIsActive:  React.Dispatch<React.SetStateAction<boolean>>
    autoScrollIsActive: boolean
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

    const [autoScrollIsActive, setAutoScrollIsActive] = useState(false)//вкл/викл перемотки

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
            <Messages autoScrollIsActive={autoScrollIsActive} setAutoScrollIsActive={setAutoScrollIsActive}/>
            <AddMessagesChatForm autoScrollIsActive={autoScrollIsActive} setAutoScrollIsActive={setAutoScrollIsActive}/>
        </div>
    )
};
//----------------------------------------//

// Принимает массив узеров и сообщений, мапит и рисует компоненту
const Messages: React.FC <ScrollType>= (props) => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    /*const [autoScrollIsActive, setAutoScrollIsActive] = useState(false)//вкл/викл перемотки*/

    //Проверяет положение чата и выдает тру или фолс
    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        let element = e.currentTarget;
        if(Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !props.autoScrollIsActive && props.setAutoScrollIsActive(true)
        } else  {
            props.autoScrollIsActive &&   props.setAutoScrollIsActive(false)
        }
    }
    //Если приходят другие сообщения происходит перемотка auto scroll
    useEffect(() => {

        if (props.autoScrollIsActive) {// Если автоскрол выключен нету перемотки
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])

    return (
        <div style={{height: '500px', overflowY: 'auto'}} onScroll={scrollHandler}>
            {messages.map((m) => <Message message={m} key={m.id}/>)}
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
            {message.photo ? <img src={message.photo} style={{width: '50px'}} /> :
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
const AddMessagesChatForm: React.FC<ScrollType> = (props) => {
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()
    const status = useSelector((state: AppStateType) => state.chat.status)

    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message) as unknown as AnyAction)
        props.setAutoScrollIsActive(true)
        setMessage('')
    }
    // Отправка смс по нажатию ентер
    const pressEnter = (e: any) => {
        if (e.shiftKey && e.keyCode == 13 ) {
            sendMessageHandler()
        }
    }
    //------------ emoji  ----------------//

        const [isPicker, setIsPicker] = useState(false) // скрывает показывает блок емоций
      //  const [currentEmoji, setCurrentEmoji] = useState(null) // обрабатывает емоции

    return (
        <div>
            <div style={{display:'flex'}}>
                <TextArea

                    maxLength={100}
                    style={{ height: 80, resize: 'none' }}
                    onChange={(e) => setMessage(e.currentTarget.value)}
                    value={message}
                    onKeyDown={pressEnter}
                    placeholder="Shift+enter - send message"
                />

                {/*// неможна отправить пока не подключится вебсокит*/}
               <div> <Button icon={<SendOutlined />}
                             size={"large"}
                   type={"primary"}
                        disabled={status !== 'ready'}
                        onClick={sendMessageHandler}></Button>
                   <div>
                <Popover placement="right"
                    content={  <EmojiPicker
                    onEmojiClick={ (e) => {
                        // @ts-ignore
                        setMessage((actual) => actual + e.emoji)
                    }}
                /> } trigger="hover">
                    <Button size={"large"}  icon={<SmileOutlined />} type={"primary"}></Button>
                </Popover>
               </div>
               </div>
            </div>
        </div>
    )
};

