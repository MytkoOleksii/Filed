import React from 'react';
import tag from  './AddMessage.module.css'
import App from "../../../../App";
//import {updateNewMessage} from "../../../../redux/OLD-store";

function AddMessage(props) {
    let newMessage = React.createRef();

    let addMessage = function () {

        props.addMessage()

    }

    let onChangeMessage = () => {
        let text = newMessage.current.value ;
        props.updateNewMessage(text)

    }

    return (
        <div>
            <div className={tag.item}>
                <textarea onChange={onChangeMessage}  className={tag.ta} ref={newMessage} value={props.writeNewMessage} />
                <button className={tag.btn} onClick={addMessage}>add Message</button>

            </div>
        </div>
    );
}

export default AddMessage;