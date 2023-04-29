import {chatAPI, ChatMessageType} from "../API/chat-API";
import {Dispatch} from "react";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {stopSubmit} from "redux-form";

export type StatusType = 'pending'| 'ready' | 'error'

let initialState = {
    messages: [] as ChatMessageType [],
    status: 'pending' as StatusType,

}


const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case 'SN/chat/MESSAGES_RECEIVED': {
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages] //копируем старые которые были и новые которые пришли
            }
        }
            case 'SN/chat/STATUS_CHANGED': {
            return {
                ...state,
                status: action.payload.status
            }
        }
        default:

            return state;
    }
};
export const actionsCreator = {
    // Полученные меседжи
    setMessagesReceived: (messages: ChatMessageType[]) => ({
        type: 'SN/chat/MESSAGES_RECEIVED',
        payload: {messages}
    } as const),
    //Получает статус конекта
    statusChanged: (status: StatusType) => ({
        type: 'SN/chat/STATUS_CHANGED',
        payload: {status}
    } as const),

};

//-------------------------------------- Thunk---------------------------------------------------------//

let newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null;

//Получает сообщения / приходит новый массив сообщений
const newMessageHandlerCreator = (dispatch: Dispatch<any>) =>  {
    if (newMessageHandler === null) {
        newMessageHandler = (messages) => {
            dispatch(actionsCreator.setMessagesReceived(messages))
        }
    }
    return newMessageHandler
}
//-------------------------------------------------//
let statusChangedHandler: ((status: StatusType) => void) | null = null;

//Получает сообщения / приходит новый массив сообщений
const statusChangedHandlerCreator = (dispatch: Dispatch<any>) =>  {
    if (statusChangedHandler === null) {
        statusChangedHandler = (status) => {
            dispatch(actionsCreator.statusChanged(status))
        }
    }
    return statusChangedHandler
}
//-------------------------------------------------//
//Получает новые сообщения
export const startMessagesListening = (): ThunkType => async (dispatch: any) => {
    chatAPI.start()
    chatAPI.subscribe('message-received',newMessageHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed',statusChangedHandlerCreator(dispatch))

};

export const stopMessagesListening = (): ThunkType => async (dispatch: any) => {
    chatAPI.unsubscribe('message-received',newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-changed',statusChangedHandlerCreator(dispatch))
    chatAPI.stop()
};

//Отправить сообщения
export const sendMessage = (message: string): ThunkType => async (dispatch: any) => {
    chatAPI.sendMessage(message)
}

export default chatReducer;


export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actionsCreator>
type ThunkType = BaseThunkType<ActionsType | ReturnType<typeof stopSubmit>>




