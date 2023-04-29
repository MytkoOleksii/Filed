let subscribers = [] as SubscriberType []



//----------------------------------------------------------//
let ws: WebSocket | null = null;// старый вебсокет
// функция перезапускает вызов вебсокета// если вебсокет "умрет" , вызовется функция перезапуска
const closeHandler = () => { // нужно сделать одну фн дл всех
    console.log('close WS')
    setTimeout(createChannel, 3000);
}
//----------------------------------------------------------//
let messageHandler = (event: MessageEvent) => {
    console.log(JSON.parse(event.data))
    let newMessages = JSON.parse(event.data)
    subscribers.forEach(s => s(newMessages))
};
//----------------------------------------------------------//
function createChannel() {
    //или ставим "?" // if (ws !== null) { //если вебсокет был , перед тем как делать новый, делаем отписку.
    ws?.removeEventListener('close', closeHandler)
    ws?.close()// принудительно закрывает
    //  }
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx') // ложим WebSocket v state/ создаем channel/ подключаем
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
}
//----------------------------------------------------------//


export let chatAPI = {
    start() {
        createChannel();
    },
    stop() {
        subscribers = []
        ws?.removeEventListener('close', closeHandler)
        ws?.removeEventListener('message', messageHandler)
        ws?.close()
    },
    subscribe(callback: SubscriberType) {
        subscribers.push(callback)
        return () => {
            subscribers = subscribers.filter((s) => s !== callback)// Делает отписку
        }
    },
    // Делает отписку
    unsubscribe(callback: SubscriberType) {
        subscribers = subscribers.filter((s) => s !== callback)
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

type SubscriberType = (messages: ChatMessageType[]) => void
