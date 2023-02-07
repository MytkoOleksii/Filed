import React from 'react';
import StoreContext from "../../StoreContext";
import NFriends from "./NFriends";

function NewNFriends() {

    return (
        <StoreContext.Consumer>
            {(store) => (
                <NFriends store={store.getState().dialogsPage.dialogs}/>
            )}
        </StoreContext.Consumer>
    )
}

export default NewNFriends;