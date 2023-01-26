import React from 'react';
import tag from  './AddMessage.module.css'
import App from "../../../../App";

function AddMessage(props) {
    let newMessage = React.createRef();
    let addMessage = function () {
        let text = newMessage.current.value ;
       return (
           props.state.messages.messages[props.state.messages.messages.length] = text

       )
    }
    console.log(props)
    return (
        <div>
            <div className={tag.item}>
                <textarea className={tag.ta} ref={newMessage}></textarea>
                <button className={tag.btn} onClick={addMessage}>add Message</button>

            </div>
        </div>
    );
}

export default AddMessage;