import {Avatar, Badge, Button, Layout, Modal, Popover} from 'antd';
import styles from "./Container.module.scss"
import {Outlet, useNavigate} from "react-router-dom";

import logo from "../../assets/image/calogo.png"
import {
    UserOutlined,
    BellOutlined,
    ExclamationCircleFilled,
    ExportOutlined,
    SettingOutlined,
    QuestionCircleOutlined
} from '@ant-design/icons';
import {JSX} from "react";
import {useSelector} from "react-redux";

const {Header, Content, Footer} = Layout;
const {confirm} = Modal;

function Container() {
    const navigate = useNavigate();
    const {user}:any=useSelector(state => state)
    const logout = () => {
        confirm({
            title: '确认退出登录吗？',
            icon: <ExclamationCircleFilled/>,
            okText: '确定',
            okType: "danger",
            cancelText: '取消',
            zIndex: 1040,
            onOk() {
                // console.log('OK');
                localStorage.clear()
                navigate('/login', {replace: true})
            },
            onCancel() {
                // console.log('Cancel');
            },
        });
    }
    const content: JSX.Element = (
        <div style={{display: "flex", flexDirection: "column"}}>
            <Button type="text" icon={<SettingOutlined/>} onClick={() => navigate('/personalCenter')}>个人主页</Button>
            <Button type="text" icon={<ExportOutlined/>} onClick={logout}>退出登录</Button>
        </div>
    );

    return (
        <Layout style={{minHeight: "100vh"}}>
            <Header className={styles.header}>
                <div className={styles.left} onClick={() => navigate('/')}>
                    <img src={logo} className={styles.logo}/>
                    <h1 className={styles.title}>计算机协会</h1>
                </div>
                <div className={styles.avatar}>
                    <div className={styles.avatarItem}>
                        <QuestionCircleOutlined className={styles.icon}/>
                        <span className={styles.avatarItemText}>帮助</span>
                    </div>
                    <div className={styles.avatarItem}>
                        <Badge dot={true}>
                            <BellOutlined className={styles.icon}/>
                        </Badge>
                        <span className={styles.avatarItemText}>消息</span>
                    </div>
                    <div className={styles.avatarItem}>
                        <Popover content={content}>
                            <Avatar size={40} icon={<UserOutlined/>} style={{marginLeft: 15}}/>
                            <span style={{marginLeft: 10}}>{user.username}</span>
                        </Popover>
                    </div>


                </div>
            </Header>
            <Content className={styles.content} id={"content"}>
                <Outlet/>
            </Content>
            <Footer className={styles.footer}>计算机协会 ©2023 Created by 追梦路上的孩子</Footer>
        </Layout>
    );
}

export default Container;