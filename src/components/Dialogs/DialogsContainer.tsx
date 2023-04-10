import React from 'react';
import {actionsCreator,} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import withAuthRedirect from "../hoc/withAuthRedirectHOK";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";

let mapStateToProps = (state: AppStateType) => {
return {
    dialogsPage: state.dialogsPage,
}
};
/*let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (newMessageBody) => {
            dispatch(actionsCreator.sendMessage(newMessageBody));
        },
     /!*  updateNewMessageBody: (body) => {
            dispatch(updateNewMessageBodyCreator(body))
        },*!/
    }
};*/

export default  compose<React.ComponentType>(connect(mapStateToProps,{...actionsCreator}),
   //     {sendMessage: actionsCreator.sendMessage,}),
withAuthRedirect)
(Dialogs);

/*
compose (withAuthRedirect) (Dialogs)
let AuthRedirectComponent = withAuthRedirect(Dialogs);

/!*let AuthRedirectComponent = (props) => {
    if (!this.props.isAuth) {
        return <Navigate to={'/Login'}/>;
    }
    /!* if (this.props.isAuth == false) {return  <Navigate to={'/Login'} /> ;}*!/
    return <Dialogs {...props} />
}*!/

let DialogsContainer = connect (mapStateToProps,mapDispatchToProps) (AuthRedirectComponent);

export default DialogsContainer;*/
