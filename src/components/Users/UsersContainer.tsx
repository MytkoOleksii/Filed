import {useSelector} from "react-redux";
import {getIsFetching} from "../../redux/users-selectors";
import Preloader from "../common/Preloader/Preloader";
import {Users} from "./Users";
import React from "react";

type UserPagePropsType ={
    pageTitle: string
/*    filter: FilterUserType
    unfollow: (userId: number) => any
    follow: (userId: number) => any
    pageSize: number
    currentPage: number*/

}

export const UserPage: React.FC<UserPagePropsType> = (props) => {
    const isFetching = useSelector(getIsFetching)
    return (<>
            <h2>{props.pageTitle}</h2>
            {isFetching ? <Preloader/> : null}
            <Users/>
        </>
    )
}
