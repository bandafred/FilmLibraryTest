import * as React from "react";
import {useEffect, useState} from "react";
import {TablePaginationConfig} from "antd/es/table";
import {FilmViewModel, IResultModelOfListFilm} from "../../../apiClient/apiClient";
import {GetPhotoAction} from "./Actions/GetPhotoAction";
import {GetMyFilmsAction} from "./Actions/GetMyFilmsAction";
import {Col, Row, Table} from "antd";
import Column from "antd/es/table/Column";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {userInfoSelector} from "../../../store/User/selectors";
import {NotLoggedUser} from "../User/NotLoggedUser";

export const ViewMyFilms = () => {
    const userInfo = useSelector(userInfoSelector);

    let def: IResultModelOfListFilm = {
        error: undefined,
        result: {
            totalCount: 0,
            films: []
        }
    };
    let pageSizeDefault = 10;

    const [result, setResult] = useState(def);
    const [isLoad, setIsLoad] = useState(false);
    const [page, setPage] = useState(1);

    const loadData = async (skip: number, take: number) => {
        setIsLoad(true);
        setResult(await GetMyFilmsAction(skip, take));
        setIsLoad(false);
    };

    let pagination: TablePaginationConfig = {
        current: page,
        pageSize: pageSizeDefault,
        onChange: setPage,
        showSizeChanger: false,
        total: result.result?.totalCount
    }

    React.useEffect(() => {
        loadData(0, pageSizeDefault).then();
    }, []);

    useEffect(() => {
        GetPhoto()
    }, [result])

    React.useEffect(() => {
        loadData((page - 1) * pageSizeDefault, pageSizeDefault).then();
    }, [page]);

    const GetPhoto = () => {
        try {
            result.result?.films?.map(async (x: FilmViewModel) => {
                let res = await GetPhotoAction(x.id);
                // @ts-ignore
                let html = document.getElementById("img-" + x.id);
                // @ts-ignore
                if (html && res) html.src = window.URL.createObjectURL(res?.data);
            })
        } catch (e) {
        }
    }

    if (!userInfo) return <NotLoggedUser/>
    
    return (
        <Row>
            <Col span={24}>
                <h2 style={{textAlign: "center", marginBottom: "25px"}}>Просмотр фильмов</h2>
            </Col>

            <Col xl={24}>
                <Table
                    dataSource={result.result?.films}
                    loading={isLoad}
                    pagination={pagination}
                    scroll={{y: 500}}
                    rowKey={e => e.id}
                    onRow={(record, rowIndex) => {
                        return {
                            onDoubleClick: event => {
                                window.location.assign('/ViewFilmInfo/' + rowIndex)
                            }
                        };
                    }}
                >
                    <Column
                        title="Постер"
                        dataIndex="id"
                        key="id"
                        render={(tags, value: FilmViewModel) => {
                            return (
                                <>
                                    <img width={80} id={"img-" + tags} src="" alt={value.title}/>
                                </>
                            );
                        }}
                    />
                    <Column title="Название" dataIndex="title" key="title"/>
                    <Column title="Продюсер" dataIndex="producer" key="producer"/>
                    <Column title="Год" dataIndex="year" key="year"/>
                    <Column title="Описание" dataIndex="description" key="description"/>
                    <Column title="Пользователь" dataIndex="userName" key="userName"/>
                    <Column
                        title="Редактирование"
                        render={(tags, value: FilmViewModel) =>
                            (
                                <>
                                    {
                                        value.userName == userInfo?.name &&
                                        <Link to={"/EditFilm/" + value.id}>Редактировать</Link>
                                    }
                                </>
                            )}
                    />
                </Table>
            </Col>
        </Row>
    )
}