import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatusThunkCreate, getUserProfileThunkCreate, updateStatusThunkCreate} from "../../redux/Profile-reducer";
import { useParams} from 'react-router-dom';
import withAuthRedirect from "../hoc/withAuthRedirect";
import {compose} from "redux";

function withRouter(Children) {
    return (props) => {

        const match = {params: useParams()};
        return <Children {...props} match={match}/>
    }
}

class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 27962
        }
        this.props.getUserProfileThunkCreate(userId);
        this.props.getStatusThunkCreate(userId);
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
                <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatusThunkCreate}/>
            </div>
        );
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    myID: state.auth.userID
});

export default compose(
    connect(mapStateToProps, {getUserProfileThunkCreate,getStatusThunkCreate,updateStatusThunkCreate}),
    withRouter,
    //withAuthRedirect,
) (ProfileContainer);

/*
let AuthRedirectComponent = withAuthRedirect(ProfileContainer);
//Варіант 2
/!*let AuthRedirectComponent = (props) => {
    if (!this.props.isAuth) {
        return <Navigate to={'/Login'}/>;
    }
    /!* if (this.props.isAuth == false) {return  <Navigate to={'/Login'} /> ;}*!/
    return <ProfileContainer {...props} />
}*!/

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
});

let withUrlDataContainerComponent = withRouter(AuthRedirectComponent)


export default connect(mapStateToProps, {getUserProfileThunkCreate})(withUrlDataContainerComponent);*/
