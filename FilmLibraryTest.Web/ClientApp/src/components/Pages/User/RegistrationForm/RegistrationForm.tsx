import * as React from "react";
import {Form, Input, Button, Checkbox, Select, DatePicker} from 'antd';
import {useCallback, useState} from "react";
import {register} from "../../../../store/User/thunks";
import {useDispatch} from "react-redux";
import {Interface} from "readline";

const {Option} = Select;

export const RegistrationForm = () => {
    const layout = {
        labelCol: {span: 8},
        wrapperCol: {span: 8},
    };
    const tailLayout = {
        wrapperCol: {offset: 8, span: 8},
    };


    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [result, setResult] = useState(undefined as string | undefined);

    const dispatch = useDispatch();

    const registerCallback = useCallback(
        async (values: any) => {
            setError("");
            setResult(undefined);
            setIsLoading(true);
            let error = await register(values.email, values.password)(dispatch);
            if (error) setError(error);
            else setResult("Удачная регистрация.");
            setIsLoading(false);
        },
        [dispatch]);

    const validateMessages = {
        required: '${label} обязателен для ввода!',
        types: {
            email: '${label} введен не корректно!',
        },
    };

    return (
        <>
            <p style={{textAlign: "center", fontSize: "1.5rem"}}>Регистрация нового пользователя</p>
            <Form
                {...layout}
                name="basic"
                initialValues={{remember: true}}
                onFinish={registerCallback}
                validateMessages={validateMessages}
            >
                <Form.Item
                    label="Почтовый ящик"
                    name="email"
                    rules={[{type: 'email', required: true}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Пароль"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Подтверждение пароля"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({getFieldValue}) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('Пароли не совпадают!');
                            },
                        }),
                    ]}
                >
                    <Input.Password/>
                </Form.Item>

              
                {error && <p style={{color: "red", textAlign: "center"}}>{error}</p>}
                {result
                    ?
                    <p style={{textAlign: "center"}}>{result}</p>
                    :
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" loading={isLoading}>
                            Зарегистрироваться
                        </Button>
                    </Form.Item>
                }
            </Form>
        </>
    )
}
