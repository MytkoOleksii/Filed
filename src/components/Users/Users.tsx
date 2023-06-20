import React, {useEffect} from 'react';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterUserType, follow, getUsersThunkCreator, unfollow} from "../../redux/users-reducer";
import {useDispatch, useSelector,} from "react-redux";
import {
    getCurrentPage,
    getFollowInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getUsersFilter
} from "../../redux/users-selectors";
import {AnyAction} from "redux";
import {useNavigate, useSearchParams} from "react-router-dom";

type PropsType = {
    /*     currentPage: number
       //  totalUsersCount: number
       // onPageChanged: (pageNumber: number) => void
        pageSize: number
       //  users: Array<UserType>
       // followingInProgress: Array<number>
         unfollow: (userId: number) => any
        follow: (userId: number) => any
       // onFilterChanged: (filter: FilterUserType) => void
         filter: FilterUserType*/
}
export const Users: React.FC<PropsType> = function (props) {

    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowInProgress)

    const dispatch = useDispatch();
    /*
    let location = useLocation(); // Получаем данные URL
        let {search} = location
    */
//---------------------------- Варіант 2 ---------------------------------//
// [1.Собирает данные с URL, 2. функция для обработки]
    const [searchParams, setURLSearchParams] = useSearchParams();

    useEffect(() => {
        // @ts-ignore                //преобразует список пар ключ-значение в объект.
        const parsed = Object.fromEntries([...searchParams]);

        let actualPage = currentPage | 1
        let actualFilter = filter

        if (!!parsed.page) actualPage = Number(parsed.page)

        if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}

        switch (parsed.friend) {
            case 'null':
                actualFilter = {...actualFilter, friend: null}
                break;
            case 'true' :
                actualFilter = {...actualFilter, friend: true}
                break;
            case 'false' :
                actualFilter = {...actualFilter, friend: false}
                break;
        }
        dispatch(getUsersThunkCreator(actualPage, pageSize, actualFilter) as unknown as AnyAction)
    }, [])
//----------------------- записывает в URL  -----------------------------//
    useEffect(() => {

        const term = filter.term
        const friend = filter.friend

        let newURL =
            (term === '' ? '' : `&term=${term}`)
            + (friend === null ? '' : `&friend=${friend}`)
            + (currentPage === 1 ? '' : `&page=${currentPage}`)

        setURLSearchParams(newURL)
    }, [filter, currentPage])
    //---------------------------END -------------------------------------//
    //------------------------- Вариант 1 -------------------------------//
    // может работать без 1 варианта !!!

    const history = useNavigate(); // замість useHistory. Записує данні в url

       useEffect(() => {
           history({
               pathname: '/users',
               search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`,
           })
       }, [filter, currentPage])

    //------------------------------END------------------------------------//

    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsersThunkCreator(pageNumber, pageSize, filter) as unknown as AnyAction)
    }
    const onFilterChanged = (filter: FilterUserType) => {
        dispatch(getUsersThunkCreator(currentPage, pageSize, filter) as unknown as AnyAction)
    }
    const _follow = (userId: number) => {
        dispatch(follow(userId) as unknown as AnyAction)
    }
    const _unfollow = (userId: number) => {
        dispatch(unfollow(userId) as unknown as AnyAction)
    }

    return (
        <div>
            <UsersSearchForm onFilterChanged={onFilterChanged} filter={filter}/>

            <Paginator currentPage={currentPage}
                       onPageChanged={onPageChanged}
                       totalItemsCount={totalUsersCount}
                       pageSize={pageSize}
            />
            {users.map(u => <User user={u} key={u.id}
                                  followingInProgress={followingInProgress}
                                  unfollow={_unfollow}
                                  follow={_follow}
                />
            )}
        </div>
    );
}