import React from 'react';
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/Profile-reducer";

class ProfileContainer extends React.Component {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
            .then(response => {
             //   this.props.toggleIsFetching(false);
                this.props.setUserProfile(response.data);
               // this.props.setTotalCount(response.data.totalCount)
            })

    }

    render () {
    return (
        <div>
            ProfileContainer
            <Profile {...this.props} profile={this.props.profile} />
        </div>
    );
}
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile
});

export default connect (mapStateToProps,{setUserProfile}) (ProfileContainer);