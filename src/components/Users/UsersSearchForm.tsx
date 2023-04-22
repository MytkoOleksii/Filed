import {ErrorMessage, Field, Form, Formik} from "formik";
import React from "react";
import {FilterUserType} from "../../redux/users-reducer";
import {useSelector} from "react-redux";
import {getUsersFilter} from "../../redux/users-selectors";
import {Button, Form as AntForm, Select, Space} from "antd";
import Search from "antd/es/input/Search";
import {SearchOutlined} from "@ant-design/icons";
//import Item from "antd/es/list/Item";
const { Option } = Select;
const  {Item} = AntForm
//----------------- type ------------------------------//
type PropsType = {
    onFilterChanged: (filter: FilterUserType) => void
    filter: FilterUserType
}
type FormType = {
    term: string
    friend: any //"true" | "false" | "null"  ,
}

//--------------------- end ----------------------------//
const userSearchFormValidate = (value: any) => {
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

    const filter = useSelector(getUsersFilter)
    const onSearch = (value: string) => {
        console.log(value)
    }
    const submit = (value: any, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        console.log(value)
        //Преобразовывает строки в булеан
        const formFilter: FormType = {
            term: value.term,
            friend: value.friend === "null" ? null : value.friend === "true" ? true : false,
        }
        console.log(formFilter.term)
        const onSearch = (sss: string ) => {
            console.log(sss)
        }

        props.onFilterChanged(formFilter)
        setSubmitting(false)
    };
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };


    return (
        <div>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    term: filter.term,
                    friend: String(filter.friend),
                }}
                validate={userSearchFormValidate}
                onSubmit={submit}
            >
                {({isSubmitting}) => (
                    <Form>

                        <Field  as={Select}
                            defaultValue="null"
                            style={{ width: 120 }}
                            onChange={submit}
                            options={[
                                { value: 'null', label: 'All' },
                                { value: 'true', label: 'Friend' },
                                { value: 'false', label: 'unfollowed' },
                                { value: 'disabled', label: 'Disabled', disabled: true },
                            ]}
                        />


                        {/*<Field name="friend" as="select">
                            <option value="null">All</option>
                            <option value="true">Only friends</option>
                            <option value="false">Only unfollowed</option>
                        </Field>*/}
                        <Field as={Search} name="term" placeholder="input search text" enterButton={  <Button htmlType={'submit'} type={"primary"} disabled={isSubmitting}>
                            <SearchOutlined />
                        </Button>} style={{ width: 200 }} />

                       {/* <Field type="text" name="term"/>*/}
                        <ErrorMessage name="term" component="div"/>

                    </Form>
                )}
            </Formik>
        </div>
    )
})



