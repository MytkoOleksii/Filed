import React, {useState} from 'react';
import  tag from './News.module.css'
import {Button, Drawer, FloatButton, message, Popconfirm, Popover, theme} from "antd";
import EmojiPicker from "emoji-picker-react";
function News(props) {
    const [isPicker, setIsPicker] = useState(false)
    const [currentEmoji, setCurrentEmoji] = useState(null)
    //-----------------------------------------------------------------//

    return (
        <div> News 777
            <div>{currentEmoji || 'Here emoji'}</div>
            <FloatButton type={"primary"} onClick={() => console.log('click')} />
            <Button type={"primary"} onBlur={() => setIsPicker(!isPicker)}>Emoji</Button>
            <div >
                { isPicker ?   <EmojiPicker
                    emojiStyle={'google'}
                                            onEmojiClick={ (e) => {
                                                setCurrentEmoji(e.emoji)
                                                setIsPicker(!isPicker)
                                            }} /> : null }

            </div>

            <Popover content={<EmojiPicker
                onEmojiClick={ (e) => {
                    setCurrentEmoji(e.emoji)
                }} />} trigger="hover">
                <Button>Focus me</Button>
            </Popover>

        </div>
    );
}

export default News;