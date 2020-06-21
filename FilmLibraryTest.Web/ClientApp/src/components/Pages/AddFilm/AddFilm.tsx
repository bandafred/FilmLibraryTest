import * as React from "react";
import {Button, Col, Form, Input, InputNumber, message, Row, Select, Switch, Upload} from "antd";
import {useState} from "react";
import {AddFilmsAction} from "./AddFilmsAction";
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import {useSelector} from "react-redux";
import {userInfoSelector} from "../../../store/User/selectors";
import {NotLoggedUser} from "../User/NotLoggedUser";
import {FormInstance} from "antd/lib/form";

const {Option} = Select;

export const AddFilm = () => {
    const userInfo = useSelector(userInfoSelector);

    const [form] = Form.useForm();

    const [file, setFile] = useState({} as any);
    const [isLoad, setIsLoad] = useState(false);
    const [imageUrl, setImageUrl] = useState({} as any);
    const [isValidImage, setIsValidImage] = useState(false);

    const formItemLayout = {
        labelCol: {span: 6},
        wrapperCol: {span: 14},
    };

    const normFile = (e: { fileList: any; }) => {
        setFile(e.fileList[0]);
        return e.fileList;
    };

    const loadData = async (title: string, description: string, year: number, producer: string) => {
        setIsLoad(true);
        let result = await AddFilmsAction(file, undefined, title, description, year, producer, localStorage.getItem("apiToken"));
        if (result?.error) message.error(result.error)
        if (result?.result) {
            message.success(result.result)
            form.resetFields();
        }
        setIsLoad(false);
    };


    const onFinish = (values: any) => {
        loadData(values.title, values.description, values.year, values.producer).then();
    };

    const toBase64 = (file: any) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const handleChange = async (info: any) => {
        if (isValidImage) {
            let s = await toBase64(info.file.originFileObj);
            setFile(info.file)
            setImageUrl(s)
        }
    };

    function beforeUpload(file: any) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('Вы можете загружать только JPG/PNG файлы!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Картинка должна быть не более 2MB!');
        }
        setIsValidImage(isJpgOrPng && isLt2M);

        return isJpgOrPng && isLt2M;
    }

    const uploadButton = (
        <div>
            {isLoad ? <LoadingOutlined/> : <PlusOutlined/>}
            <div className="ant-upload-text">Добавить постер</div>
        </div>
    );

    if (!userInfo) return <NotLoggedUser/>

    return (
        <Row>
            <Col span={24}>
                <h2 style={{textAlign: "center", marginBottom: "25px"}}>Добавление фильма</h2>
                <Form
                    form={form}
                    name="validate_other"
                    {...formItemLayout}
                    onFinish={onFinish}
                    initialValues={{
                        'year': 2020,
                    }}
                >

                    <Form.Item label="Название фильма">
                        <Form.Item
                            name="title"
                            rules={[{required: true, message: 'Пожалуйста введите название фильма!'}]}
                        >
                            <Input/>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item label="Режиссер">
                        <Form.Item
                            name="producer"
                        >
                            <Input/>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item label="Год выпуска">
                        <Form.Item
                            name="year"
                            rules={[{required: true, message: 'Please select your country!'}]}
                        >
                            <InputNumber min={1895} max={new Date(Date.now()).getFullYear()}/>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item label="Описание">
                        <Form.Item
                            name="description"
                        >
                            <Input.TextArea/>
                        </Form.Item>
                    </Form.Item>

                    <Col offset={18}>
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                        >
                            {imageUrl?.length > 0 ?
                                <img src={imageUrl} id="poster" alt="poster"
                                     style={{width: '100%'}}/> : uploadButton}
                        </Upload>
                    </Col>

                    <Form.Item wrapperCol={{span: 12, offset: 6}}>
                        <Button type="primary" htmlType="submit" loading={isLoad}>
                            Добавить
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}
