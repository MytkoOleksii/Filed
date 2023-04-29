import {chatAPI, ChatMessageType} from "../API/chat-API";
import {Dispatch} from "react";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {stopSubmit} from "redux-form";


let initialState = {
    messages: [] as ChatMessageType []

}


const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case 'SN/chat/MESSAGES_RECEIVED': {
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages] //копируем старые которые были и новые которые пришли
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
//Получает новые сообщения
export const startMessagesListening = (): ThunkType => async (dispatch: any) => {
    chatAPI.start()
    chatAPI.subscribe(newMessageHandlerCreator(dispatch))
};

export const stopMessagesListening = (): ThunkType => async (dispatch: any) => {
    chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
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




