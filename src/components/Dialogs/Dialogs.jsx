import React from 'react';
import  teg from './Dialogs.module.css'
const Dialogs = (props) => {
    return (
        <div className={teg.dialogs} >

            <div className={teg.dialogsItems}>
                <div className={teg.dialog}>
                    Dimon
                </div>
                <div className={teg.dialog}>
                    Alex
                </div>
                <div className={teg.dialog}>
                    Bob
                </div>
                <div className={teg.dialog}>
                    Jek
                </div>
                <div className={teg.dialog}>
                    Andrey
                </div>

            </div>
            <div className={teg.messages}>
                <div className={teg.message}>Hi</div>
                <div className={teg.message}>Hi 2</div>
                <div className={teg.message}>Hi 3</div>
                <div className={teg.message}>Hi 4</div>
            </div>

        </div>
    );
};

export default Dialogs;