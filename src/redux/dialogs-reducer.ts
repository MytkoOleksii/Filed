//const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';

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

 const dialogsReducer = (state = initialState, action: SendMessageCreatorActionType):InitialStateType => {
     switch (action.type) {
       /*  case UPDATE_NEW_MESSAGE_BODY :
             return {
                 ...state,
                 newMessageBody: action.body
             }*/
         case SEND_MESSAGE :
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
type SendMessageCreatorActionType = {
    type: typeof SEND_MESSAGE
    newMessageBody: string
}
export const sendMessageCreator = (newMessageBody: string):SendMessageCreatorActionType  => ({ type: SEND_MESSAGE, newMessageBody });
/*export const updateNewMessageBodyCreator = (text) => {
    return(
        { type: UPDATE_NEW_MESSAGE_BODY , body: text}
    )};*/


export default dialogsReducer;