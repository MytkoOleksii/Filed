//const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
import {InferActionsTypes} from "./redux-store";

type DialogType = {
    id: number
    name: string
}

type MessageType = {
    id: number
    messages: string
}

let initialState =  {
    //  writeNewMessage: 'Hello', // newMessageBody
    messages: [
        {id: 1, messages: 'hi'},
        {id: 2, messages: 'Are you'},
        {id: 3, messages: 'Simple pimple'},
        {id: 4, messages: 'Ben roberts hi hih i'},
        {id: 5, messages: 'good day'},
        {id: 6, messages: 'Hello world'},
    ] as Array<MessageType> ,
        dialogs: [
        {id: 1, name: 'Dimon'},
        {id: 2, name: 'Bob'},
        {id: 3, name: 'Din'},
        {id: 4, name: 'Ben'},
        {id: 5, name: 'Alex'},
        {id: 6, name: 'Djeck'},
    ] as Array<DialogType>,
        //newMessageBody:'',
};

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof  actionsCreator>

 const dialogsReducer = (state = initialState, action: ActionsType):InitialStateType => {
     switch (action.type) {
       /*  case UPDATE_NEW_MESSAGE_BODY :
             return {
                 ...state,
                 newMessageBody: action.body
             }*/
         case 'SN/DIALOGS/SEND-MESSAGE' :
             let body =  action.newMessageBody;
             return {
                 ...state,
               //  newMessageBody: '',
                 messages: [...state.messages, {id: state.messages.length + 1, messages:body}],
             };
         default:
             return state;
     }
 }

  /*   switch (action.type) {
         case UPDATE_NEW_MESSAGE_BODY :

             state.newMessageBody = action.body;
             break;
         case SEND_MESSAGE :
             let body = state.newMessageBody;
             state.newMessageBody = '';
             state.messages.push({id: 6, messages: body});
             break;
         default:
             return state;
     }
     return state;
}*/
export const actionsCreator = {
 sendMessageCreator: (newMessageBody: string) => ({ type: 'SN/DIALOGS/SEND-MESSAGE', newMessageBody } as const),

}

export default dialogsReducer;