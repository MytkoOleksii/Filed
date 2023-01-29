import React, {useState} from 'react';
import t from './Like.module.css'

function Like(props) {
   /*
        let arr = useState(0);
        let like = arr[0];
        let plus = arr[1];
*/

    let [like,plus] = useState(0)

      return (
        <div>
            <button className={t.heart} onClick={()=>{plus(like+1)}} > {like} </button>
        </div>
    )
}

export default Like;