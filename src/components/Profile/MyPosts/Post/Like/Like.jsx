import React, {useState} from 'react';
import t from './Like.module.css'
import {returnTypeActionCreator} from "../../../../../redux/addLike-reducer";
import Post from "../Post";

function Like(props) {
   /* let Elements = props.state.profilePage.posts.map( (element) => {
        return {
            id: element.id,
            key: element.id,
            likesCount: element.likesCount,
        }
    })*/


    /*
         let arr = useState(0);
         let like = arr[0];
         let plus = arr[1];
 */

    let [like, plus] = useState(props.likesCount) /* количество существующих лайков */

    let addLikes = function () {

        let id = props.id;
        function b ()  {plus(like += 1)} /* +1 лайк */
        b()
        console.log(id)
        props.returnTypeActionCreator(id,like) /* id номера поста, количество лайков */
       // props.returnType()
       // props.updateNewPostText()

    }

    return (
        <div>
            <button className={t.heart} onClick={addLikes}> Like</button>
            {/* <button className={t.heart} onClick={()=>{plus(like+1)}} > {like} </button>*/}

        </div>
    )
}

export default Like;

