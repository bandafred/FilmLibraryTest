import * as React from "react";
import {IParam} from "../../../Common/Interfacies";
import {Button, Col, Form, Input, InputNumber, message, Row, Select, Spin, Switch, Upload} from "antd";
import {useEffect, useState} from "react";
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import {useSelector} from "react-redux";
import {userInfoSelector} from "../../../store/User/selectors";
import {NotLoggedUser} from "../User/NotLoggedUser";
import {RouteComponentProps} from "react-router";
import {EditFilmAction} from "./EditFilmAction";
import {Film, FilmViewModel, IResultModelOfFilm} from "../../../apiClient/apiClient";
import {ViewFilmInfoAction} from "../ViewFilmInfo/ViewFilmInfoAction";
import {GetPhotoAction} from "../ViewAllFilms/Actions/GetPhotoAction";

const {Option} = Select;

export const EditFilm = ({match}: RouteComponentProps<IParam>) => {

    let film: Film = {
        description: undefined,
        id: 0,
        posterUrl: undefined,
        producer: undefined,
        title: undefined,
        user: undefined,
        year: 0
    }

    let def: IResultModelOfFilm = {
        error: undefined,
        result: film
    };

    const userInfo = useSelector(userInfoSelector);

    const [file, setFile] = useState({} as any);
    const [isLoad, setIsLoad] = useState(false);
    const [imageUrl, setImageUrl] = useState({} as any);
    const [isValidImage, setIsValidImage] = useState(false);
    const [result, setResult] = useState(def);


    const formItemLayout = {
        labelCol: {span: 6},
        wrapperCol: {span: 14},
    };
    const getFilm = async () => {
        setIsLoad(true);
        setResult(await ViewFilmInfoAction(Number(match.params.id)));
        setIsLoad(false);
    };

    useEffect(() => {
        GetPhoto().then();
        getFilm().then();
    }, []);


    const loadData = async (title: string, description: string, year: number, producer: string) => {
        setIsLoad(true);
        let res = await EditFilmAction(file, result.result?.id, title, description, year, producer, localStorage.getItem("apiToken"));
        if (res?.error) message.error(res.error)
        if (res?.result) {
            message.success(res.result)
        }
        setIsLoad(false);
    };

    const GetPhoto = async () => {
        try {
            let res = await GetPhotoAction(Number(match.params.id));
            setFile(res?.data)
            let s = await toBase64(res?.data);
            setImageUrl(s);
        } catch (e) {
        }
    }


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
        console.log(info)
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

    if (result.result?.id == 0) return <Spin/>

    return (
        <Row>
            {isLoad && <Spin/>}
            <Col span={24}>
                <h2 style={{textAlign: "center", marginBottom: "25px"}}>Редактирование фильма</h2>
                <Form
                    name="validate_other"
                    {...formItemLayout}
                    onFinish={onFinish}
                    initialValues={{
                        'title': result.result?.title,
                        'producer': result.result?.producer,
                        'year': result.result?.year,
                        'description': result.result?.description,
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
                            Изменить
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}


