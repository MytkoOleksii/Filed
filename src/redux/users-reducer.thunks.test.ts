import {actionsCreate, follow, unfollow} from "./users-reducer";
import {usersAPI} from "../API/users-API";
import {APIResponseType, ResultCodesEnum} from "../API/api";

jest.mock("../API/users-API")
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;
const result: APIResponseType = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {},
}


test('success follow thunk', async () => {
    //@ts-ignore
    userAPIMock.postUsersFollow.mockReturnValue(Promise.resolve(result));
    const thunk = follow(1)

    const dispatchMock = jest.fn();
    const getStateMock = jest.fn();
    //@ts-ignore
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actionsCreate.toggleFollowingProgress(true, 1))
});

test('success unfollow thunk', async () => {
    //@ts-ignore
    userAPIMock.deleteUsersUnfollow.mockReturnValue(Promise.resolve(result));
    const thunk = unfollow(1)
    const dispatchMock = jest.fn();
    const getStateMock = jest.fn();

    //@ts-ignore
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actionsCreate.toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actionsCreate.unfollowSuccess( 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actionsCreate.toggleFollowingProgress(false, 1))

})