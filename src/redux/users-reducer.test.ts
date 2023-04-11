import usersReducer, {actionsCreate, InitialStateType} from "./users-reducer";
import {UserType} from "../types/types";

let state: InitialStateType;
beforeEach(() => {
    state = {
    users: [
        {id: 0, name: 'Dimych', followed: false, photos: {small: null, large: null}, status: 'status 0'},
        {id: 1, name: 'Dimych', followed: false, photos: {small: null, large: null}, status: 'status 1'},
        {id: 2, name: 'Dimych', followed: true, photos: {small: null, large: null}, status: 'status 2'},
        {id: 3, name: 'Dimych', followed: true, photos: {small: null, large: null}, status: 'status 3'},
    ] as Array<UserType>,
    pageSize: 10,       // відображае кількість користувачів на сторінці (яку порцію отримувати)
    totalUsersCount: 0,// скільки пришло юзерів
    currentPage: 1,    // номер сторінки
    isFetching: true, // крутилка загрузки
    followingInProgress: [],
}})

test('follow success', () => {
    const newState = usersReducer(state,actionsCreate.followSuccess(1))

    expect(newState.users[0].followed).toBeFalsy();
    expect(newState.users[1].followed).toBeTruthy();
});

test('unfollow success', () => {
    const newState = usersReducer(state,actionsCreate.unfollowSuccess(3))

    expect(newState.users[2].followed).toBeTruthy();
    expect(newState.users[3].followed).toBeFalsy();
})