import {Avatar, Badge, Button, Layout, Modal, Popover} from 'antd';
import styles from "./Container.module.scss"
import {Outlet} from "react-router-dom";

import logo from "../../assets/image/calogo.png"
import {UserOutlined, BellOutlined, ExclamationCircleFilled} from '@ant-design/icons';
import {JSX} from "react";

const {Header, Content, Footer} = Layout;
const {confirm} = Modal;

function Container() {

    const logout = (): void => {
        console.log("我被点击了")
        confirm({
            title: '确认退出登录吗？',
            icon: <ExclamationCircleFilled/>,
            okText: '确定',
            okType: "danger",
            cancelText: '取消',
            zIndex:1040,
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    const content: JSX.Element = (
        <div style={{display: "flex", flexDirection: "column"}}>
            <Button type="text">个人主页</Button>
            <Button type="text" onClick={logout}>退出登录</Button>
        </div>
    );

    return (
        <Layout style={{minHeight: "100vh"}}>
            <Header className={styles.header}>
                <div className={styles.left}>
                    <img src={logo} className={styles.logo}/>
                    <h1 className={styles.title}>计算机协会</h1>
                </div>
                <div className={styles.avatar}>
                    <Badge dot={true}>
                        <BellOutlined className={styles.icon}/>
                    </Badge>
                    <Popover content={content}>
                        <Avatar size={40} icon={<UserOutlined/>} style={{marginLeft: 15}}/>
                    </Popover>
                </div>
                {/*<Menu*/}
                {/*    theme="dark"*/}
                {/*    mode="horizontal"*/}
                {/*    defaultSelectedKeys={['2']}*/}
                {/*    items={new Array(3).fill(null).map((_, index) => ({*/}
                {/*        key: String(index + 1),*/}
                {/*        label: `nav ${index + 1}`,*/}
                {/*    }))}*/}
                {/*/>*/}
            </Header>
            <Content className={styles.content} id={"content"}>
                {/*<Breadcrumb style={{ margin: '16px 0' }}>*/}
                {/*    <Breadcrumb.Item>Home</Breadcrumb.Item>*/}
                {/*    <Breadcrumb.Item>List</Breadcrumb.Item>*/}
                {/*    <Breadcrumb.Item>App</Breadcrumb.Item>*/}
                {/*</Breadcrumb>*/}
                {/*<div style={{background: colorBgContainer }} ><Outlet/></div>*/}
                {/*<button onClick={setHeight}>test</button>*/}
                <Outlet/>

            </Content>
            <Footer className={styles.footer}>计算机协会 ©2023 Created by 追梦路上的孩子</Footer>
        </Layout>
    );
}

export default Container;