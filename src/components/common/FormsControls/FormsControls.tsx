import React from "react";
import styles from "./FormsControls.module.css"
import {FieldValidatorType, required} from "../../../utils/validators/validators";
import {Field, WrappedFieldProps} from "redux-form";

type FormControlPropsType = {
    meta: {
        touched: boolean
        error: string
    }
    children: React.ReactNode
}

const FormControl: React.FC <FormControlPropsType> = ({ meta: {touched, error}, children}) => {
    //const showError = meta.touched && meta.error;
    const showError = touched && error;

    return (
        <div className={styles.formControl + " " + (showError ? styles.error : '')}>
            <div>
                {children}
            </div>
            {showError && <span>{error}</span>}
        </div>
    )
}


export const Textarea: React.FC<WrappedFieldProps> = (props) => {
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
// Создает елементы формы
export const createField = (placeholder: string, name: string, validator: Array<FieldValidatorType>, component: string | React.Component | React.FC, props = {}, text = '') => (
    <div>
        <Field placeholder={placeholder}
               name={name}
               validate={validator}
               component={component}
               {...props}
        /> {text}
    </div>
)