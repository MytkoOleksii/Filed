import {ErrorMessage, Field, Form, Formik} from "formik";
import React from "react";
import {FilterUserType} from "../../redux/users-reducer";

type PropsType ={
    onFilterChanged: (filter: FilterUserType) => void
    filter: FilterUserType

}
type FormType = {
    term: string
    friend: any //"true" | "false" | "null"  ,
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
 export const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {

    const submit = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        //Преобразовывает строки в булеан
        const formFilter: FormType = {
            term: values.term,
            friend: values.friend === "null" ? null : values.friend === "true" ? true : false,
        }

        props.onFilterChanged(formFilter)
        setSubmitting(false)
    };

    return (
        <div>
            <Formik
                initialValues={{
                    term: '',
                    friend: "null",
            }}
                validate={userSearchFormValidate}
                onSubmit={submit}
            >
                {({isSubmitting}) => (
                    <Form>
                        <Field name="friend" as="select">
                            <option value="null">All</option>
                            <option value="true">Only friends</option>
                            <option value="false">Only unfollowed</option>
                        </Field>
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
})
