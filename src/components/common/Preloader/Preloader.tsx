import React from 'react';
//@ts-ignore
import preloader from '../../../assets/images/Loading.gif'

const Preloader: React.FC = (props) => {
    return (
        <div style={ { backgroundColor: "white"}}>
            <img src={preloader}/>

        </div>
    );
};

export default Preloader;