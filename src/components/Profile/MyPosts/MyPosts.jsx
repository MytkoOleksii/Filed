import React from 'react';
import teg from './MyPosts.module.css'
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";

function MyPosts(props) {

    let postsElements = props.posts.map( (element) => {
        return (
            <Post id={element.id} key={element.id} likesCount={element.likesCount} message={element.messages}
                  dispatch={props.dispatch} returnType={props.returnType} updateNewPostText={props.updateNewPostText}/>
        )
    })
   // let newPostElement = React.createRef();
    let onAddPost =  (values) => {
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
                {/*<Post likesCount={postData[0].likesCount} message={postData[0].messages}/>
                <Post likesCount={postData[1].likesCount} message={postData[1].messages}/>*/}
            </div>
        </div>
    );
}

let AddNewPostForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name={"newPostText"} validate={[required,maxLengthCreator(10)]} />

                {/*
                <Field component={"textarea"} name={"newPostText"} validate={[required,maxLengthCreator(10)]} />
*/}
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

let AddNewPostFormRedux = reduxForm({form: "ProfileAddNewPostForm"}) (AddNewPostForm)


export default MyPosts;