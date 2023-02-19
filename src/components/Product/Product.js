
import styles from "./product.module.css";
import userPhoto from "../../assets/images/user.png";
import {NavLink} from "react-router-dom";

function Product(props) {


    return (
        <div>
            <div>
                <div><button onClick={props.getProduct}>Reload</button> </div>
                <div><h2>Id: {props.prodId}   Name: {props.prodName}</h2>;</div>
                <div className={styles.block}>
                    {props.slicedPages.map(p => {
                        return ( <span   className={props.currentPage === p && styles.selectedPage || props.currentPage !== p && styles.page }
                                         onClick={(e)=>{props.onPageChanged(p)}}>{p}</span>
                        )})}
                </div>

                {props.users.map(u => <div key={u.id} className={styles.us}>
                <span>
                    <div>
                        <NavLink to={'/productHOOK/'+ u.id}>
                            <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles} />
                        </NavLink>
                        </div>
                    <div>


                        {u.followed ? <button onClick={() => {props.unfollow(u.id)}} >Unfollow</button>
                            : <button onClick={()   => {props.follow(u.id)}} >Follow</button> }
                    </div>
                </span>
                        <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{"u.location.city"}</div>
                        <div>{"u.location.country"}</div>
                    </span>
                </span>

                    </div>
                )}
            </div>
        </div>
    );
}

export default Product;