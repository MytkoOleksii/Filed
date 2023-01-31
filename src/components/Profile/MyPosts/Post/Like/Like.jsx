import React, {useState} from 'react';
import t from './Like.module.css'

function Like(props) {
    /*
         let arr = useState(0);
         let like = arr[0];
         let plus = arr[1];
 */
    let [like, plus] = useState(props.likesCount) /* количество существующих лайков */

    let addLikes = function () {
        let a = props.id - 1;
        let b = () => {plus(like += 1)} /* +1 лайк */
        b()
        props.addLikes(a, like) /* id номера поста , количество лайков */
    }

    return (
        <div>
            <button className={t.heart} onClick={addLikes}> Like</button>
            {/* <button className={t.heart} onClick={()=>{plus(like+1)}} > {like} </button>*/}

        </div>
    )
}

export default Like;

