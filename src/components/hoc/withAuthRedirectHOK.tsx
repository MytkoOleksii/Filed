import React from 'react';
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";

let mapStateToPropsForRedirect = (state: AppStateType): MapPropType => ({
    isAuth: state.auth.isAuth,
});
type MapPropType = {
    isAuth: boolean
}
// Если не авторизован на сайте перекидывает на страницу логинизации
export function withAuthRedirectHOK(Component: React.ComponentType<MapPropType>) {
    function RedirectComponent(props: MapPropType) {
        if (!props.isAuth) return <Navigate to={'/Login'}/>

        return <Component {...props} />
    }

    let ConnectAuthRedirectComponent = connect(mapStateToPropsForRedirect) (RedirectComponent);
  return ConnectAuthRedirectComponent;
}

export default withAuthRedirectHOK;
