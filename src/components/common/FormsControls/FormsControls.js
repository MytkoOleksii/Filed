import React from "react";
import styles from "./FormsControls.module.css"
import {required} from "../../../utils/validators/validators";
import {Field} from "redux-form";

const FormControl = ({input, meta: {touched, error}, ...props}) => {
    //const showError = meta.touched && meta.error;
    const showError = touched && error;

    return (
        <div className={styles.formControl + " " + (showError ? styles.error : '')}>
            <div>
                {props.children}
            </div>
            {showError && <span>{error}</span>}
        </div>
    )
}
export const Textarea = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}> <textarea {...input} {...restProps} /> </FormControl>
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
//--------------------------------------------------------------------//
export const createField = (placeholder, name, validator, component, props = {}, text = '') => (
    <div>
        <Field placeholder={placeholder}
               name={name}
               validate={validator}
               component={component}
               {...props}
        /> {text}
    </div>
)