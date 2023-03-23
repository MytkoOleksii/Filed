import React, {useState} from 'react';
import styles from "./paginator.module.css";
import cn from 'classnames'

// portionSize - сколько кнопок выводить (порции)
// totalItemsCount -  количество загруженых страниц (общее количество пользователей )
// pageSize - размер страницы
// currentPage -
// currentPage -

const Paginator = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize);
     // pagesCount - какое есть количество страниц
    let pages = [];
     for (let i = 1; i < pagesCount; i++) {
         pages.push(i);
     };
    // portionCount - все пользователи разделеные на порции
    // portionNumber -
    // setPortionNumber -
    // leftPortionPageNumber - отрисовать границы которые больше левой стороны (номер страницы левой границы) порции
    // rightPortionPageNumber - отрисовать границы которые больше правой  стороны (номер страницы левой границы)

     let portionCount = Math.ceil(pagesCount / portionSize);
     let [portionNumber, setPortionNumber] = useState(1);
     let leftPortionPageNumber =( portionNumber - 1) * portionSize + 1;
     let rightPortionPageNumber = portionNumber * portionSize;

     return <div className={styles.paginator}>
        {/* показывай кнопку с лева если  portionNumber больше 1*/}
         {portionNumber > 1 &&
             <button onClick={() => { setPortionNumber(portionNumber - 1)}}>Prev</button> }
         {pages.filter(p =>  p >= leftPortionPageNumber && p < rightPortionPageNumber).map((p)=> {
             return <span className={ cn({
                 [styles.selectorPage]: currentPage === p
             }, styles.pageNumber)}
                          key={p}
                          onClick={(e) => {
                              onPageChanged(p);
                          }}>{p}</span>
         })}
         {/* показывай кнопку с права если  portionNumber больше чем текущая порция */}
         { portionCount > portionNumber &&
             <button onClick={ () => { setPortionNumber(portionNumber + 1)} } >Next</button> }
     </div>

}

export  default  Paginator;

/*
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

export default Paginator;*/
