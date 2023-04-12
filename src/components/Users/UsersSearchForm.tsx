import {ErrorMessage, Field, Form, Formik} from "formik";
import React from "react";
import {FilterUserType} from "../../redux/users-reducer";
type PropsType ={
    onFilterChanged: (filter: FilterUserType) => void

}
const userSearchFormValidate = (values: any) => {
    const errors = {};
    /*    if (!values.email) {
            errors.email = 'Required';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
            errors.email = 'Invalid email address';
        }*/
    return errors;
};
export const UsersSearchForm: React.FC<PropsType> = (props) => {
    const submit = (values: FilterUserType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        props.onFilterChanged(values)
        setSubmitting(false)
    };

    return (
        <div>
            <Formik
                initialValues={{term: ''}}
                validate={userSearchFormValidate}
                onSubmit={submit}
            >
                {({isSubmitting}) => (
                    <Form>
                        <Field type="text" name="term"/>
                        <ErrorMessage name="term" component="div"/>
                        <button type="submit" disabled={isSubmitting}>
                            Find
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}