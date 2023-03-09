 import React from "react";
import styles from "./FormsControls.module.css"

const FormControl = ({input,meta, ...props}) => {
     const showError = meta.touched && meta.error;
     return (
         <div className={styles.formControl + " "+ (showError ? styles.error : '') }>
             <div>
                 {props.children}
             </div>
             {showError && <span>{meta.error}</span> }
         </div>
     )
 }
export const Textarea = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps} /> </FormControl>
};

 export const Input = (props) => {
     const {input, meta, child, ...restProps} = props;

     return <FormControl {...props}><input {...input} {...restProps} /> </FormControl>
 }
// Варіант 2
/* export const Textarea2 = ({input,meta, ...props}) => {
    const showError = meta.touched && meta.error;
     return (
         <div className={styles.formControl + " "+ (showError ? styles.error : '') }>
            <div>
             <textarea {...input} {...props} />
            </div>
             {showError && <span>{meta.error}</span> }

             {/!*
             {meta.touched && meta.error && <span>{"some error"}</span> }
*!/}
         </div>
     )
 };*/

 /*export const Input = ({input,meta, ...props}) => {
     const showError = meta.touched && meta.error;
     return (
         <div className={styles.formControl + " "+ (showError ? styles.error : '') }>
             <div>
                 <input {...input} {...props} />
             </div>
             {showError && <span>{meta.error}</span> }
         </div>
     )
 };*/
 // Варіант 3
/*
export const Textarea = (props) => {
    return (
        <div>
            <textarea {...props.input} />
        </div>
    )
 }*/
