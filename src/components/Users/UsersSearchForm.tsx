import {ErrorMessage, Field, Form, Formik} from "formik";
import React from "react";
import {FilterUserType} from "../../redux/users-reducer";
import {useSelector} from "react-redux";
import {getUsersFilter} from "../../redux/users-selectors";
import {Button, Select,} from "antd";
import Search from "antd/es/input/Search";
import {SearchOutlined} from "@ant-design/icons";
import {FormItemProps} from 'antd/lib/form/FormItem';

const { Option } = Select;
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
    return errors;
};
export const UsersSearchForm: React.FC<PropsType & FormItemProps> = React.memo((props) => {

    const filter = useSelector(getUsersFilter)

    const submit = (values: any, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {

        //Преобразовывает строки в булеан
        const formFilter: FormType = {
            term: values.term,
            friend: values.friend === "null" ? null : values.friend === 'true' ? true : false,
        }

        props.onFilterChanged(formFilter)
        setSubmitting(false)
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

                        <Field name="friend">
                            {({ field, form }: any) => (
                                <Select
                                    {...field}
                                    style={{ width: 120 }}
                                    defaultValue={String(filter.friend)}
                                    onChange={(value) => form.setFieldValue('friend', value)}
                                >
                                    <Option value="null">All</Option>
                                    <Option value='true'>Only friends</Option>
                                    <Option value="false">unfollowed</Option>

                                </Select>
                            )}
                        </Field>

                    {/*   <Field name="friend" as="select">
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



