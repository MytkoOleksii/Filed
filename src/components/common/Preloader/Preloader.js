import React from 'react';
import preloader from '../../../assets/images/Loading.gif'

const Preloader = (props) => {
    return (
        <div style={ { backgroundColor: "white"}}>
            <img src={preloader}/>

        </div>
    );
};

export default Preloader;