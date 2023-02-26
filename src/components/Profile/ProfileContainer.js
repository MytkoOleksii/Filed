import React from 'react';
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {getUserID, setUserProfile} from "../../redux/Profile-reducer";
import { useParams} from 'react-router-dom';
import {usersAPI} from "../../API/api";

function withRouter(Children){
    return(props)=>{

        const match  = {params: useParams()};
        return <Children {...props}  match = {match}/>
    }
}

class ProfileContainer extends React.Component {

    componentDidMount() {
        this.props.getUserID(this.props.match.params.userId)
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

let withUrlDataContainerComponent = withRouter(ProfileContainer)


export default connect (mapStateToProps,{setUserProfile,getUserID}) (withUrlDataContainerComponent);