import {
    TeamOutlined,
    HomeFilled,
    AccountBookFilled,
    BellOutlined,
    UserOutlined,
    QuestionCircleOutlined,
    TagsOutlined
} from '@ant-design/icons';
import {Avatar, Badge, Layout, Menu, Popover} from 'antd';
import styles from "./admin.module.scss"
import "./index.css"
import logo from "../../assets/image/calogo.png";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

const {Header, Sider, Content, Footer} = Layout;


function Admin() {
    const [openKeys, setOpenKeys] = useState<Array<string | undefined>>([]);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        defaultOpenKeys()
    }, []);
    
    const defaultOpenKeys: string[] | any = () => {
        let path: string = location.pathname
        switch (path) {
            case '/admin/invoiceAll':
            case '/admin/invoiceReview':
                setOpenKeys(['invoice'])
                break
            case '/admin/tagUser':
            case '/admin/tagInvoice':
                setOpenKeys(['tag'])
                break
        }
    }
    const onOpenChange = (keys: Array<string>) => {
        const latestOpenKey = keys.find((key: string) => openKeys.indexOf(key) === -1);
        setOpenKeys([latestOpenKey])
    }

    return (
        <Layout className={styles.layout}>
            <Header className={styles.header}>
                <div className={styles.left} onClick={() => navigate("/")}>
                    <img src={logo} className={styles.logo} alt={"logo"}/>
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
                        <Popover>

                            <Avatar size={40} icon={<UserOutlined/>} style={{marginLeft: 15}}/>
                            <span style={{marginLeft: 10}}>追梦路上的孩子</span>
                        </Popover>
                    </div>
                </div>
            </Header>
            <Layout className={styles.layout2}>
                <Sider className={styles.sider}>
                    <div className={styles.title}></div>
                    <Menu
                        mode="inline"
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        openKeys={openKeys}
                        onOpenChange={onOpenChange}
                        defaultSelectedKeys={[location.pathname]}
                        // defaultOpenKeys={['invoice']}
                        className={styles.menu}
                        items={[
                            {
                                key: '/admin',
                                icon: <HomeFilled/>,
                                label: '首页',
                                onClick: () => navigate("/admin")
                            },
                            {
                                key: 'invoice',
                                icon: <AccountBookFilled/>,
                                label: '发票管理',
                                children: [
                                    {
                                        key: '/admin/invoiceAll',
                                        label: '全部发票',
                                        onClick: () => navigate("invoiceAll")
                                    },
                                    {
                                        key: '/admin/invoiceReview',
                                        label: '发票审核',
                                        onClick: () => navigate("invoiceReview")
                                    }
                                ]
                            },
                            {
                                key: '/admin/user',
                                icon: <TeamOutlined/>,
                                label: '用户管理',
                                onClick: () => navigate("user")
                            },
                            {
                                key: 'tag',
                                icon: <TagsOutlined/>,
                                label: '标签管理',
                                children: [
                                    {
                                        key: '/admin/tagUser',
                                        label: '用户',
                                        onClick: () => navigate("tagUser")
                                    },
                                    {
                                        key: '/admin/tagInvoice',
                                        label: '发票',
                                        onClick: () => navigate("tagInvoice")
                                    }
                                ]
                            }
                        ]}
                    />
                </Sider>
                <Layout className={styles.layout3}>
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            // minHeight: 280,
                            borderRadius: 10,
                            backgroundColor: "#fff"
                        }}
                    >
                        <Outlet/>
                    </Content>
                    <Footer className={styles.footer}>计算机协会 ©2023 Created by 追梦路上的孩子</Footer>
                </Layout>
            </Layout>
        </Layout>
    );
}

export default Admin;