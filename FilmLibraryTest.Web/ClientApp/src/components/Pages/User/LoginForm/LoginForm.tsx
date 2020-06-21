import * as React from "react";
import {Form, Input, Button} from 'antd';
import styles from './LoginForm.module.css';
import {useCallback, useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {loginUser} from "../../../../store/User/thunks";

export const LoginForm = () => {
    const layout = {
        labelCol: {span: 8},
        wrapperCol: {span: 8},
    };
    const tailLayout = {
        wrapperCol: {offset: 8, span: 8},
    };

    const dispatch = useDispatch()
    const loginCallback = useCallback(
        async (values: any) => {
            setError("");
            setIsLoading(true);
            let error = await loginUser(values.email, values.password)(dispatch);
            setIsLoading(false);
            if(error) {
                setError(error);
            }
            else
                window.location.replace(document.location.href.replace(document.location.pathname, ''));
        },
        [dispatch]
    )

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const validateMessages = {
        required: '${label} обязателен для ввода!',
        types: {
            email: '${label} введен не корректно!',
        },
    };

    return (
        <>
            <p className={styles.title}>Вход в систему</p>
            <Form
                {...layout}
                name="basic"
                initialValues={{remember: true}}
                onFinish={loginCallback}
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
                    label="Пароль"
                    name="password"
                    rules={[{required: true}]}
                >
                    <Input.Password/>
                </Form.Item>

                {error!="" && <p style={{color: "red", textAlign: "center"}}> {error} </p>}

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" loading={isLoading}>
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}