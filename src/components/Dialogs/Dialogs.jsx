import React from 'react';
import  teg from './Dialogs.module.css'
import {NavLink} from "react-router-dom";


const DialogItem = (props) => {

  return (
      <div className={teg.dialog + ' ' + teg.active} >
          <NavLink className={teg.dialog2} to={'/dialog/' + props.id}>{props.name}</NavLink>
      </div>
  )
}

const Message = (props) => {
    return(
        <div className={teg.message}>{props.message}</div>
    )
}


const Dialogs = (props) => {

    return (
        <div className={teg.dialogs} >

            <div className={teg.dialogsItems}>

                <DialogItem name={'Anna'} id={'1'}/>
                <DialogItem name={'Dimma'} id={'2'}/>
                <DialogItem name={'Alex'} id={'3'}/>
                <DialogItem name={'Bob'} id={'4'}/>
                <DialogItem name={'Djek'} id={'5'}/>

               {/* <div className={teg.dialog}>
                    <NavLink to='/dialogs/1'>Dimon</NavLink>                </div>
                <div className={teg.dialog}>
                    <NavLink to='/dialogs/2'>Alex</NavLink>               </div>
                <div className={teg.dialog}>
                    <NavLink to='/dialogs/3'>Bob</NavLink>              </div>
                <div className={teg.dialog}>
                    <NavLink to='/dialogs/4'>Jek</NavLink>              </div>
                <div className={teg.dialog}>
                    <NavLink to='/dialogs/5'>Andrey</NavLink>
                </div>*/}
            </div>
            <div className={teg.messages}>

                <Message message={'Hi'} />
                <Message message={'Hi 2'} />
                <Message message={'Hi 3'} />
                <Message message={'Hi 4'} />
                <Message message={'Hi 5'} />


                {/*<div className={teg.message}>Hi</div>
                <div className={teg.message}>Hi 2</div>
                <div className={teg.message}>Hi 3</div>
                <div className={teg.message}>Hi 4</div>*/}
            </div>

        </div>
    );
}

export default Dialogs;