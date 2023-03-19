import profileReducer, {addPostActionCreator, deletePost} from "./Profile-reducer";

let state = {
    posts: [
        {id: 1, likesCount: 10, messages: 'hi, how are you ?'},
        {id: 2, likesCount: 12, messages: 'Are you'},
        {id: 3, likesCount: 45, messages: 'Simple pimple'},
        {id: 4, likesCount: 2, messages: 'Ben roberts hi hi hi'},
        {id: 5, likesCount: 8, messages: 'good day'},
    ],
};

it('new post should be added', () => {
    // 1. test data
    let action = addPostActionCreator('it-kamasutra');
    // 2. action
    let newState = profileReducer (state,action);
    // 3. expectation
   // newState.posts.length === 5;
    expect(newState.posts.length).toBe(6);
});

it('message of new post shout be correct', () => {
    // 1. test data
    let action = addPostActionCreator('it-kamasutra');
    // 2. action
    let newState = profileReducer (state,action);
    // 3. expectation
    expect(newState.posts[6].messages).toBe('it-kamasutra');
});

it('after deleting length of messages should be decrement', () => {
    // 1. test data
    let action = deletePost(1)
    // 2. action
    let newState = profileReducer (state,action);
    // 3. expectation
    expect(newState.posts.length).toBe(4);
});

it(`after deleting length shouldn't be decrement if id is incorrect`, () => {
    // 1. test data
    let action = deletePost(1000)
    // 2. action
    let newState = profileReducer (state,action);
    // 3. expectation
    expect(newState.posts.length).toBe(4);
});
