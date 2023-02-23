const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

let initialState = {
    users: [],
    pageSize: 10,       // відображае кількість користувачів на сторінці (яку порцію отримувати)
    totalUsersCount:0,// скільки пришло юзерів
    currentPage: 1,    // номер сторінки
    isFetching: false, // крутилка загрузки
}
const usersReducer = (state = initialState,action) => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                //   users: [...state.users],
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        case SET_USERS: {
            return {...state, users: action.users }
           /* return {...state, users: [...state.users, ...action.users ]}*/
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return  {...state, totalUsersCount: action.totalCount}
        }
        case TOGGLE_IS_FETCHING: {
            return  {...state, isFetching: action.isFetching}
        }
        default:
            return state;
    }
}

export let follow = (userID) => ( {type: FOLLOW, userID })
export let unfollow = (userID) => ( {type: UNFOLLOW, userID })
export let setUsers = (users) => ( {type: SET_USERS, users })
export let setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage})
export let setTotalCount = (totalCount) => ({type: SET_TOTAL_USERS_COUNT,totalCount})
export  let toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
export default usersReducer;






