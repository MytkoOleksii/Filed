import React from 'react';
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/Dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import withAuthRedirect from "../hoc/withAuthRedirect";

let mapStateToProps = (state) => {
return {
    dialogsPage: state.dialogsPage,
}
};
let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: () => {
            dispatch(sendMessageCreator());
        },
       updateNewMessageBody: (body) => {
            dispatch(updateNewMessageBodyCreator(body))
        },
    }
};

let AuthRedirectComponent = withAuthRedirect(Dialogs);

/*let AuthRedirectComponent = (props) => {
    if (!this.props.isAuth) {
        return <Navigate to={'/Login'}/>;
    }
    /!* if (this.props.isAuth == false) {return  <Navigate to={'/Login'} /> ;}*!/
    return <Dialogs {...props} />
}*/

let DialogsContainer = connect (mapStateToProps,mapDispatchToProps) (AuthRedirectComponent);

export default DialogsContainer;