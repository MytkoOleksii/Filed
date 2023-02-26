import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfileThunkCreate} from "../../redux/Profile-reducer";
import { useParams} from 'react-router-dom';
import withAuthRedirect from "../hoc/withAuthRedirect";

function withRouter(Children) {
    return (props) => {

        const match = {params: useParams()};
        return <Children {...props} match={match}/>
    }
}

class ProfileContainer extends React.Component {

    componentDidMount() {
        this.props.getUserProfileThunkCreate(this.props.match.params.userId)
        /*  let userId = this.props.match.params.userId;
          if (!userId) {
              userId = 2
          }
          usersAPI.getUserID_URL(userId)
              .then((data =>{
                  this.props.setUserProfile(data);
              }))*/
        /*axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
            .then(response => {
                this.props.setUserProfile(response.data);

            })*/

    }

    render() {
       /* if (!this.props.isAuth) {
            return <Navigate to={'/Login'}/>;
        }
        /!* if (this.props.isAuth == false) {return  <Navigate to={'/Login'} /> ;}*!/*/
        return (
            <div>
                ProfileContainer
                <Profile {...this.props} profile={this.props.profile}/>
            </div>
        );
    }
}

let AuthRedirectComponent = withAuthRedirect(ProfileContainer);
//Варіант 2
/*let AuthRedirectComponent = (props) => {
    if (!this.props.isAuth) {
        return <Navigate to={'/Login'}/>;
    }
    /!* if (this.props.isAuth == false) {return  <Navigate to={'/Login'} /> ;}*!/
    return <ProfileContainer {...props} />
}*/

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
});

let withUrlDataContainerComponent = withRouter(AuthRedirectComponent)


export default connect(mapStateToProps, {getUserProfileThunkCreate})(withUrlDataContainerComponent);