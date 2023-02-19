import React from 'react';
import axios from "axios";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/Profile-reducer";
import { useParams} from 'react-router-dom';
import Product from "./Product";
import Hook from "./HOOK";




function ProductHOOK (props) {




        // получаем параметры
        const params = useParams();
        const prodId = params.id;
        const prodName = params.name;
        console.log(params)



let pusk = () =>{
    let prodId = params.id;
    if (!prodId) {
        prodId = 2
    }

   return axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + prodId)
            .then(response => {
                props.setUserProfile(response.data);

            })}




        return (
            <div>
                ProductHOOK
                <div><button onClick={pusk}>pusk</button> </div>
                <Hook {...props} prodId={prodId} profile={props.profile} pusk={pusk} />

            </div>
        );
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile
});




export default connect (mapStateToProps,{setUserProfile}) (ProductHOOK);