import * as React from "react";
import {Layout} from "antd";
import styles from "./Header.module.css";
import {UserHeaderLayout} from "../UserHeaderLayout/UserHeaderLayout";

const {Sider, Content} = Layout;

const Header = () => {
    return (

        <div className={styles.header}>
            <Layout>
                <Content className={styles.site_name}>
                    <span className={styles.name}>Каталог фильмов</span>
                </Content>
                <Sider className={styles.authorisation}>
                    <UserHeaderLayout/>
                </Sider>
            </Layout>
        </div>
    );
}
export default Header;
