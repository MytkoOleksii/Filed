import React from 'react';
import NFriends from "./NFriends";
import {connect} from "react-redux";

let store = (store) => {
    return {
        store: store.dialogsPage.dialogs
    }
}

let NewNFriendsContainer = connect(store) (NFriends);
export default NewNFriendsContainer;