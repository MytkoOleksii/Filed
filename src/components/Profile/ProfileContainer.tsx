import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getStatusThunkCreate,
    getUserProfileThunkCreate,
    savePhotoTC, saveProfileTC,
    updateStatusThunkCreate
} from "../../redux/profile-reducer";
import {RouteProps, useLocation, useNavigate, useParams} from 'react-router-dom';
import withAuthRedirect from "../hoc/withAuthRedirectHOK";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {ProfileType} from "../../types/types";
import {withRouter} from "../hoc/withRouter";
import {GetStringKeys} from "./MyPosts/MyPosts";
//@ts-ignore
/*export const withRouter = (Component) => {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{location, navigate, params}}
            />
        );
    }
    return ComponentWithRouterProp;
}*/

type PropsType = {
    location: any
    navigate: any
    params: any
    router: any
    userId: number | null
    myID: number
    store: any
    goToEditMode: () => void
}
type MapStateType = {
    profile: ProfileType
    status: string
    myID: number | null
    isAuth: boolean | null
    router: any
}
type MapDispatchType = {
    getUserProfileThunkCreate: (userId: number | null) => void
    getStatusThunkCreate: (userId: number | null) => void
    updateStatusThunkCreate: (status: string) => void
    savePhotoTC: (file: File) => void
    saveProfileTC: (profile: ProfileType | null) => Promise<any>
}

type MapPropsType = ReturnType<typeof mapStateToProps>
/*type PathParamsType ={
    userId: string
}

type PropsParamType = RouteComponentProps<PathParamsType> & {
    someString: string
}*/

type AllPropsType = MapPropsType & MapDispatchType & PropsType

class ProfileContainer extends React.Component <AllPropsType, PropsType > {

    refreshProfile() {
        let userId = +this.props.router.params.userId;
        if (!userId) {
            userId = this.props.myID;
            if (!userId) {
                this.props.router.navigate('/login');
            }
        }
        this.props.getUserProfileThunkCreate(userId);
        this.props.getStatusThunkCreate(userId);
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps:AllPropsType, prevState:AllPropsType, snapshot:AllPropsType) {
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
                         saveProfile={this.props.saveProfileTC}
                />
            </div>
        );
    }
}

let mapStateToProps = (state: AppStateType): MapStateType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    myID: state.auth.userID,
    isAuth: state.auth.isAuth,
}) as MapStateType;
withRouter(ProfileContainer)
export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        getUserProfileThunkCreate,
        getStatusThunkCreate,
        updateStatusThunkCreate,
        savePhotoTC,
        saveProfileTC
    }),
    withRouter,
    withAuthRedirect,
)(ProfileContainer);
