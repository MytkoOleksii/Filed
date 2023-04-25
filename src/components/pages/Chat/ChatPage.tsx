import React, {useEffect, useState} from 'react';
import {Avatar} from "antd";
import {UserOutlined} from "@ant-design/icons";

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
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)

    useEffect(() => {

        let ws: WebSocket;
        const closeHandler = () => {
            console.log('close WS')
            setTimeout(createChannel, 3000);
        }

        function createChannel() {
           // if (ws !== null) { //если вебсокет был , делаем отписку
                ws?.removeEventListener('close', closeHandler)
                ws?.close()
          //  }
            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx') // ложим WebSocket v state/ создаем channel
            ws.addEventListener('close', closeHandler)
            setWsChannel(ws);
        }

        createChannel();

        return () => {
            ws.removeEventListener('close', closeHandler)
            ws.close()
        }
    }, [])

    return (
        <div>
            <Messages wsChannel={wsChannel}/>
            <AddMessagesChatForm wsChannel={wsChannel}/>
        </div>
    )
};
//----------------------------------------//

// Принимает массив узеров и сообщений, мапит и рисует компоненту
const Messages: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {

    const [messages, setMessages] = useState<ChatMessageType[]>([])
    useEffect(() => {
        let messageHandler = (event: MessageEvent) => {
            console.log(JSON.parse(event.data))
            let newMessages = JSON.parse(event.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        };
        wsChannel?.addEventListener('message', messageHandler)

        return () => {
            wsChannel?.removeEventListener('message',messageHandler )
        }
    }, [wsChannel])

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
const AddMessagesChatForm: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {
    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

    useEffect(() => {
        let openHandler = () => {
            setReadyStatus('ready');
        }
        wsChannel?.addEventListener('open', openHandler)

        return () => {
            wsChannel?.removeEventListener('open', openHandler)
        }
        }, [wsChannel] )


        const sendMessage = () => {
            if (!message) {
                return
            }
            wsChannel?.send(message)
            setMessage('')
        }
        return (
            <div>
                <div>
                    <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
                </div>
                <div>
                    <button disabled={wsChannel == null || readyStatus !== 'ready'} onClick={sendMessage}>Send</button>
                </div>
            </div>
        )
    };