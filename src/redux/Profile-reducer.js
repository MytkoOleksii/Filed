const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const LIKE = "LIKE";


export let initialState =   {
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

 const profileReducer = (state = initialState,action) => {
    // console.log('в Profile')
    // console.log( state.posts)


     switch (action.type) {

         case ADD_POST:
             let newPost = {
                 id: state.posts.length + 1,
                 likesCount: 0,
                 messages: state.newPostText,
             };
             return {
                 ...state,
                 posts: [...state.posts, newPost],
                 newPostText: '',
             }

         case UPDATE_NEW_POST_TEXT:
             return {
                 ...state,
                 newPostText: action.newText,
             }

         case LIKE :
             return {
                 ...state,
                 posts: state.posts.map( u => {
                     if (u.id === action.id) {
                         return{ ...u, likesCount: action.like}
                     }
                     return u;
                 })
             }
/*
        let stateCopy = {...state,}
             stateCopy.posts[action.id].likesCount = action.like

             return stateCopy;*/

             default:
             return state;

     }
     return state;

 }
   /* switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: state.posts.length + 1,
                likesCount: 0,
                messages: state.newPostText,
            };
            let stateCopy = {...state};
            stateCopy.posts = [...state.posts]
            stateCopy.posts.push(newPost);
            stateCopy.newPostText = '';
            return stateCopy;
        case UPDATE_NEW_POST_TEXT: {
            let stateCopy = {...state};
            stateCopy.posts = [...state.posts]

            stateCopy.newPostText = action.newText;
            return stateCopy;
        }
        default:
            return state;
    }
    return state;
}*/

export let returnTypeActionCreator = (id,like) => {return ({type: LIKE ,id:id , like:like})}

export const addPostActionCreator = () => {return({type: ADD_POST})}
export const updateNewPostTextActionCreator = (text) =>
{return ({ type: 'UPDATE-NEW-POST-TEXT', newText: text })
}

export default profileReducer;
/*

export let addLikes = (state = initialState,action) => {
    switch (action.type) {
        case LIKE :
            state.posts[action.id].likesCount = action.like
            break;
        default:
            return state;
    }
    return state;
};
export let returnTypeActionCreator = (id,like) => {
    return ({type: LIKE ,id:id , like:like})}
*/


