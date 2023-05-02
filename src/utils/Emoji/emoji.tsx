import React, {useState} from 'react';
import {Button} from "antd";
import EmojiPicker from "emoji-picker-react";
import any = jasmine.any;
import {SmileOutlined} from "@ant-design/icons";

function Emoji() {
    const [isPicker, setIsPicker] = useState(false)
    const [currentEmoji, setCurrentEmoji] = useState(null)
    return (
        <div>
            <div>{currentEmoji || 'Here emoji'}</div>
            <Button icon={<SmileOutlined />} type={"primary"} onClick={() => setIsPicker(!isPicker)}>Emoji</Button>
            <div >
                { isPicker ?
                    <EmojiPicker
                    onEmojiClick={ (e) => {
                        // @ts-ignore
                        setCurrentEmoji(e.emoji)
                        setIsPicker(!isPicker)
                    }}
                /> : null }

            </div>
        </div>
    );
}

export default Emoji;