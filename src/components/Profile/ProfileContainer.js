import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getStatusThunkCreate,
    getUserProfileThunkCreate, initializePhotoDownload,
    savePhotoTC,
    updateStatusThunkCreate
} from "../../redux/Profile-reducer";
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import withAuthRedirect from "../hoc/withAuthRedirect";
import {compose} from "redux";
/*
function withRouter(Children) {
    return (props) => {

        const match = {params: useParams()};
        return <Children {...props} match={match}/>
    }
}*/

export const withRouter = (Component) => {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }
    return ComponentWithRouterProp;
}



class ProfileContainer extends React.Component {

    refreshProfile () {
        let userId = this.props.router.params.userId;
        if (!userId) {
            userId=this.props.myID;
            if (!userId) {
                this.props.router.navigate('/login');
            }
            ////////////////////////////////////
            /*let userId = this.props.match.params.userId;
            if (!userId) {
                userId = this.props.myID
                if (!userId) {
                    this.props.history.push('/login')
                }*/
        }
        this.props.getUserProfileThunkCreate(userId);
        this.props.getStatusThunkCreate(userId);
    }

    componentDidMount() {
this.refreshProfile()

    }

    componentDidUpdate(prevProps, prevState,snapshot) {
if (this.props.router.params.userId != prevProps.router.params.userId) {
    this.refreshProfile();
}

    }

    render() {
        return (
            <div>
                ProfileContainer
                <Profile {...this.props}
                isOwner={!this.props.router.params.userId}
                         profile={this.props.profile}
                         status={this.props.status}
                         updateStatus={this.props.updateStatusThunkCreate}
                         savePhoto={this.props.savePhotoTC}
                 />
            </div>
        );
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    myID: state.auth.userID,
    isAuth: state.auth.isAuth,
});
withRouter(ProfileContainer)
export default compose(
    connect(mapStateToProps, {getUserProfileThunkCreate,getStatusThunkCreate,updateStatusThunkCreate, savePhotoTC,}),
    withRouter,
       withAuthRedirect,
) (ProfileContainer);
