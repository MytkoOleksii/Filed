import React from 'react';
import teg from './MyPosts.module.css'
import Post from "./Post/Post";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {createField, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {PostType} from "../../../types/types";

export type MyPostStatePropsType = {
    posts: Array<PostType>
}
export type MyPostDispatchPropsType = {
    addPost: (newPostText: string) => void
}

const MyPosts: React.FC<MyPostStatePropsType & MyPostDispatchPropsType> = props => {

    let postsElements = props.posts.map( (element) => {
        return (
            <Post id={element.id} key={element.id} likesCount={element.likesCount} message={element.messages}/>
        )
    })
    let onAddPost = (values: AddPostFormValuesType) => {
        props.addPost(values.newPostText);
    }
  /*  let onPostChange = () => {
        let text = newPostElement.current.value;
            props.updateNewPostText(text);
    }*/
    return (
        <div className={teg.postsBlock}>
          <h3> My posts </h3>
           <AddNewPostFormRedux onSubmit={onAddPost}/>
            <div className={teg.posts}>
                {postsElements}
            </div>
        </div>
    );
}
//------------------------------------ AddNewPostForm -------------------//
type PropsType = { };
type AddPostFormValuesType = {
    newPostText: string
};

type AddPostFormValuesTypeKeys = GetStringKeys <AddPostFormValuesType >

let AddNewPostForm: React.FC<InjectedFormProps<AddPostFormValuesType,PropsType> & PropsType> = (props) => {
    return <form onSubmit={props.handleSubmit}>
            <div>
                {createField<AddPostFormValuesTypeKeys>('Your post','newPostText',[required], Input)}

                <Field component={Textarea} name={"newPostText"} validate={[required,maxLengthCreator(10)]} />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>

}


let AddNewPostFormRedux = reduxForm<AddPostFormValuesType, PropsType>({form: "ProfileAddNewPostForm"}) (AddNewPostForm)

const MyPostsMemorized = React.memo (MyPosts)
export default MyPostsMemorized;

// Вытягивает ключи из указанного объекта type
export type GetStringKeys<T> = Extract<keyof T, string>