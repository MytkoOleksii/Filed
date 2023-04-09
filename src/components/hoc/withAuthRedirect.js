import React from 'react';
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";

let mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth,
});

export function WithAuthRedirect(Component) {
  class RedirectComponent extends React.Component {
      render() {
          if (!this.props.isAuth) return  <Navigate to={'/Login'} />
          return  <Component {...this.props} />
      }
  }
    let ConnectAuthRedirectComponent = connect(mapStateToPropsForRedirect) (RedirectComponent);
  return ConnectAuthRedirectComponent;
}

export default WithAuthRedirect;
