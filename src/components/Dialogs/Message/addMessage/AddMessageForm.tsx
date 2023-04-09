import {InjectedFormProps, reduxForm} from "redux-form";
import React from "react";
import {createField, Textarea} from "../../../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../../../utils/validators/validators";
import {NewMessageFormValuesType} from "../../Dialogs";
import {LoginFormValuesType} from "../../../login/login";

let maxLengthCreator50 = maxLengthCreator(50);

 type NewMessageFormsValuesTypeKeys = Extract <keyof NewMessageFormValuesType, string>  // взять ключи из ...
type PropsType = {}
const AddMessageForm: React.FC<InjectedFormProps <NewMessageFormValuesType, PropsType > & PropsType> = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<NewMessageFormsValuesTypeKeys>('Enter your message','newMessageBody',[required, maxLengthCreator50], Textarea)}
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}
export default reduxForm<NewMessageFormValuesType> ({form: "dialogAddMessageForm"}) (AddMessageForm);
