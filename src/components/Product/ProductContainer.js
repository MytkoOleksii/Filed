import React, {useEffect, useLayoutEffect} from 'react';
import {
    follow,
    setCurrentPage,
    setTotalCount,
    setUsers,
    toggleIsFetching,
    unfollow
} from "../../redux/Useres-reducer";
import {connect} from "react-redux";
import axios from "axios";
import Preloader from "../common/Preloader/Preloader";
import Product from "./Product";
import {useParams} from "react-router-dom";



function ProductContainer  (props) {
/*   let getProduct = () => {
       props.toggleIsFetching(true);
       axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${props.currentPage}&count=${props.pageSize}`)
           .then(response => {
               props.toggleIsFetching(false);
               props.setUsers(response.data.items);
               props.setTotalCount(response.data.totalCount)
           })
   }*/
    //Варіант 2
/*    useEffect(() => {
        props.toggleIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${props.currentPage}&count=${props.pageSize}`)
            .then(response => {
                props.toggleIsFetching(false);
                props.setUsers(response.data.items);
                props.setTotalCount(response.data.totalCount)
            });
    },[])*/
//Варіант 3
    useLayoutEffect(() => {
        props.toggleIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${props.currentPage}&count=${props.pageSize}`)
            .then(response => {
                props.toggleIsFetching(false);
                props.setUsers(response.data.items);
                props.setTotalCount(response.data.totalCount)
            });
    }, []);

    let onPageChanged = (pageNumber) => {
        props.setCurrentPage(pageNumber);
        props.toggleIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${props.pageSize}`)
            .then(response => {
                props.toggleIsFetching(false);
                props.setUsers(response.data.items);
            })};



        // получаем параметры
        const params = useParams();
        const prodId = params.id;
        const prodName = params.name;
        console.log(params)




        let pagesCount = props.totalUsersCount / props.pageSize;
        let pages = [];
        for (let i=1; i < pagesCount; i++) {
            pages.push(i)}
        let curP = props.currentPage;// номер сторінки
        let curPF = ((curP - 3) < 0) ?  0  : curP - 3 ;
        let curPL = curP + 2;
        let slicedPages = pages.slice( curPF, curPL);
        return ( <>
                {props.isFetching ? <Preloader/> : null}
                <Product totalUsersCount={props.totalUsersCount}
                       pageSize={props.pageSize}
                       currentPage={props.currentPage}
                       onPageChanged={onPageChanged}
                       users={props.users}
                       follow={props.follow}
                       unfollow={props.unfollow}
                       slicedPages={slicedPages}
                      /*   getProduct={getProduct}*/
                         prodId={prodId}
                         prodName={prodName}
                />
            </>

        )}



let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
    }
};

export default connect(mapStateToProps, {follow, unfollow, setUsers, setCurrentPage, setTotalCount, toggleIsFetching,})
(ProductContainer);
