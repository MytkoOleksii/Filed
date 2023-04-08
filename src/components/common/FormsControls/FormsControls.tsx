import React from "react";
import styles from "./FormsControls.module.css"
import {FieldValidatorType, required} from "../../../utils/validators/validators";
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";
/*
type FormControlPropsType = {
    meta: {
        touched: boolean
        error: string
    }
    //children: React.ReactNode
    props: WrappedFieldMetaProps
}*/

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}

const FormControl: React.FC <FormControlPropsType> = ({ meta}, children) => {
    const showError = meta.touched && meta.error;
  //  const showError = touched && error;

    return (
        <div className={styles.formControl + " " + (showError ? styles.error : '')}>
            <div>
                {children}
            </div>
            {showError && <span>{showError.error}</span>}
        </div>
    )
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta,...restProps} = props;
    return <FormControl {...props}> <textarea {...input} {...restProps} /> </FormControl>
};

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta,...restProps} = props;

    return <FormControl {...props}><input {...input} {...restProps} /> </FormControl>
}
//--------------------------------------------------------------------//
// Создает елементы формы

export function createField<FormsKeysType extends string> (placeholder: string | undefined,
                            name: FormsKeysType,
                            validator: Array<FieldValidatorType>,
                            component: React.FC<WrappedFieldProps>,
                            props = {},
                            text = '')  {
    return (
        <div>
            <Field placeholder={placeholder}
                   name={name}
                   validate={validator}
                   component={component}
                   {...props}
            /> {text}
        </div>
    )
}