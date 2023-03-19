import React from 'react';
import styles from "./paginator.module.css";



const Paginator = (props) => {
    let pagesCount = props.totalUsersCount / props.pageSize;
    let pages = [];
    for (let i=1; i < pagesCount; i++) {
        pages.push(i)}
    let curP = props.currentPage;// номер сторінки
    let curPF = ((curP - 3) < 0) ?  0  : curP - 3 ;
    let curPL = curP + 2;
    let slicedPages = pages.slice( curPF, curPL);
    return (
        <div>
            <div className={styles.block}>
                {slicedPages.map(p => {
                    return ( <span key={p}  className={props.currentPage === p && styles.selectedPage || props.currentPage !== p && styles.page }
                                   onClick={(e)=>{props.onPageChanged(p)}}>{p}</span>
                    )})}
            </div>
        </div>
    );
};

export default Paginator;