const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const LIKE = "LIKE";

let initialState =   {
    posts: [
        {id: 1, likesCount: 10, messages: 'hi, how are you ?'},
        {id: 2, likesCount: 12, messages: 'Are you'},
        {id: 3, likesCount: 45, messages: 'Simple pimple'},
        {id: 4, likesCount: 2, messages: 'Ben roberts hi hi hi'},
        {id: 5, likesCount: 8, messages: 'good day'},
        {id: 6, likesCount: 34, messages: 'Hello world'},
    ],
        newPostText: 'It-kamasutra.'
};

export const profileReducer = (state = initialState,action) => {

    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 7,//state.profilePage.posts.length
                likesCount: 0,
                messages: state.newPostText,
            };
            state.posts.push(newPost);
            state.newPostText = '';
            break;
        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newText;
            break;
        default:
            return state;
    }
    return state;
}
export const addPostActionCreator = () => {return({type: ADD_POST})}
export const updateNewPostTextActionCreator = (text) =>
{return ({ type: 'UPDATE-NEW-POST-TEXT', newText: text })
}

export let addLikes = (state = initialState,action) => {
    switch (action.type) {
        case LIKE :
             state.posts[action.id].last = action.like;
             break;
        default:
            return state;
    }
    return state;
};
export let returnTypeActionCreator = (a,like) => {({type: LIKE ,id:a , like: like})}


