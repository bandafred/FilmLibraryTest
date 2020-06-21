import * as React from "react";
import {Col, Row, Select} from "antd";
import {RouteComponentProps} from "react-router";
import {IParam} from "../../../Common/Interfacies";
import {Film, FilmViewModel, IResultModelOfFilm} from "../../../apiClient/apiClient";
import {useEffect, useState} from "react";
import {ViewFilmInfoAction} from "./ViewFilmInfoAction";
import {GetPhotoAction} from "../ViewAllFilms/Actions/GetPhotoAction";
import {Typography} from 'antd';

const {Title, Paragraph} = Typography;
const {Option} = Select;

export const ViewFilmInfo = ({match}: RouteComponentProps<IParam>) => {

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

    const [result, setResult] = useState(def);
    const [isLoad, setIsLoad] = useState(false);

    const loadData = async () => {
        setIsLoad(true);
        setResult(await ViewFilmInfoAction(Number(match.params.id)));
        setIsLoad(false);
    };

    useEffect(() => {
        loadData().then();
    }, []);

    useEffect(() => {
        GetPhoto().then();
    }, [result])

    const GetPhoto = async () => {
        try {
            let res = await GetPhotoAction(result.result?.id);
            // @ts-ignore
            let html = document.getElementById("poster");
            // @ts-ignore
            if (html && res) html.src = window.URL.createObjectURL(res?.data);
        } catch (e) {
        }
    }

    return (
        <Row>
            <Col span={24}>
                <h2 style={{textAlign: "center", marginBottom: "25px"}}>Подробная информация о фильме</h2>
            </Col>

            <Col span={5}>
                <img src="" width={"100%"} id="poster" alt="Постер"/>
            </Col>
            <Col offset={2} span={17}>
                <Title>{result.result?.title}</Title>
                <Paragraph>{result.result?.producer}</Paragraph>
                <Paragraph>{result.result?.year}</Paragraph>
                <Paragraph>{result.result?.description}</Paragraph>
            </Col>

        </Row>
    )
}