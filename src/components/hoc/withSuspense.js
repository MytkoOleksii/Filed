import React, {lazy} from 'react';


const WithSuspense = (Component) => {
    return (props) => {
        <Component {...props} />
    };
};

export default WithSuspense;


export const WithLazy = (Component, adress) => {
    return (props) => {
        const Component = lazy( () => import (adress));
    };
};

