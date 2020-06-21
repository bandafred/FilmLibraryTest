import * as React from "react";
import { connect } from "react-redux";
import { Typography } from 'antd';
const { Title, Paragraph } = Typography;

const Home = () => (
    <div>
        <Title style={{textAlign: "center"}}>Тестовое задание на вакансию Asp.Net Core разработчик</Title>
        <p>Выполнил: Пучеглазов А.Е. <a href="mailto:bandafred@mail.ru">bandafred@mail.ru</a></p>
        
    </div>
);

export default connect()(Home);
