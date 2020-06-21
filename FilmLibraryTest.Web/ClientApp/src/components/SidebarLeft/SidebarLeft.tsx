import * as React from "react";
import styles from "./SidebarLeft.module.css";
import {Layout, Menu} from "antd";
import {
    YoutubeOutlined,
    ToolOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import {useState} from "react";
import {Link} from "react-router-dom";

const {Sider} = Layout;
const {SubMenu} = Menu;

const SidebarLeft = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className={styles.sidebar}>
            <Layout>
                <Sider

                    collapsible
                    collapsed={isCollapsed}
                    onCollapse={() => setIsCollapsed(!isCollapsed)}
                >
                    <div className="logo"/>
                    <Menu mode="inline" className={styles.menu} style={{overflow: 'auto'}}>
                        <Menu.Item key="1" icon={<YoutubeOutlined />}>
                            <Link to="/ViewAllFilms">Просмотр всех фильмов</Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<PlusOutlined />}>
                            <Link to="/AddFilm">Добавление фильма</Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<ToolOutlined />}>
                            <Link to="/ViewMyFilms">Редактирование фильмов</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
            </Layout>
        </div>
    );
}

export default SidebarLeft;
