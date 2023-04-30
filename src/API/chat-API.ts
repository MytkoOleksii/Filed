import {StatusType} from "../redux/chat-reducer";

let subscribers = {
    'message-received': [] as MessagesReceivedSubscriberType [],
    'status-changed': [] as StatusChangedSubscriberType []
}


//----------------------------------------------------------//
let ws: WebSocket | null = null;// старый вебсокет
type EventNamesType = 'message-received' | 'status-changed';
// функция перезапускает вызов вебсокета// если вебсокет "умрет" , вызовется функция перезапуска
const closeHandler = () => { // нужно сделать одну фн дл всех
    notifySubscriberAboutStatus('pending')
    setTimeout(createChannel, 3000);
}
//----------------------------------------------------------//
let messageHandler = (event: MessageEvent) => {
    let newMessages = JSON.parse(event.data)
    subscribers['message-received'].forEach(s => s(newMessages))
};
//----------------------------------------------------//
// Уведомляет статус что готов
let openHandler = () => {
    notifySubscriberAboutStatus('ready')
};
// Уведомляет об ошибке
let errorHandler = () => {
    notifySubscriberAboutStatus('error')
};
//----------------------------------------------------------//
const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
}
//----------------------------------------------------------//
// Уведомляет подписчиков о подписке
const notifySubscriberAboutStatus = (status: StatusType) => {
    subscribers['status-changed'].forEach(s => s(status))
}

//----------------------------------------------------------//
function createChannel() {
    //или ставим "?" // if (ws !== null) { //если вебсокет был , перед тем как делать новый, делаем отписку.
    cleanUp()
    ws?.close()// принудительно закрывает
    //  }
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx') // ложим WebSocket v state/ создаем channel/ подключаем
    notifySubscriberAboutStatus('pending')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)
}

//----------------------------------------------------------//

export let chatAPI = {
    start() {
        createChannel();
    },
    stop() {
        subscribers['message-received'] = []
        subscribers['status-changed'] = []
        cleanUp()
        ws?.close()
    },
    subscribe(eventName: EventNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName].push(callback)
        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter((s) => s !== callback)// Делает отписку
        }
    },
    // Делает отписку
    unsubscribe(eventName: EventNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter((s) => s !== callback)
    },
    //Отправка сообщений
    sendMessage(message: string) {
        ws?.send(message)
    },
}


//----------------------------------------------------------//
export type ChatMessageType = {
    message: string,
    photo: string
    userId: number
    userName: string
}

type MessagesReceivedSubscriberType = (messages: ChatMessageType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void
