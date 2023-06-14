import styles from "./PersonalCenter.module.scss"
import {Avatar, Button, message, Spin} from "antd";
import {UserOutlined, FormOutlined, LeftOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {getUserInfo} from "../../utils/api";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

interface IUserInfo {
    userName: string,
    studentId: string,
    phone: string,
    email: string
}

const initUserInfo: IUserInfo = {
    userName: '',
    studentId: '',
    phone: '',
    email: ''
}

function PersonalCenter() {
    const {user}: any = useSelector(state => state)
    const [spinning, setSpinning] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<IUserInfo>(initUserInfo);
    const navigate = useNavigate();
    useEffect(() => {
        getUser()
    }, [])
    const getUser = async () => {
        setSpinning(v=>!v)
        try {
            let res: any = await getUserInfo(user.username)
            if (res.code === 200) {
                setUserInfo(res.data)
            }
            console.log(res);
            setSpinning(v=>!v)
        }catch (error) {
            message.error("出错了")
            setSpinning(v=>!v)
            console.log("error",error)
        }

    }
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>个人主页</h1>
                <Button
                    type={"text"}
                    icon={<LeftOutlined/>}
                    size={"large"}
                    className={styles.btn}
                    onClick={() => navigate(-1)}
                >返回</Button>
                <Spin spinning={spinning}>
                <div className={styles.message}>
                    <div className={styles.avatar}>
                        <Avatar size={80} icon={<UserOutlined/>}/>
                        <h1 className={styles.nickName}>{userInfo.userName}</h1>
                    </div>
                    <div className={styles.detailList}>
                        <Button type={"text"} size={"small"} icon={<FormOutlined/>}
                                className={styles.modify}>编辑资料</Button>
                        <div className={styles.userDetail}>
                            <div className={styles.detailItem}>
                                <span>学号：{userInfo.studentId||"待完善"}</span>
                            </div>
                            <div className={styles.detailItem}>
                                <span>姓名：胡运琦</span>
                            </div>

                            <div className={styles.detailItem}>
                                <span>手机号：{userInfo.phone||"待完善"}</span>
                            </div>
                            <div className={styles.detailItem}>
                                <span>组别：设计组</span>
                            </div>
                            <div className={styles.detailItem}>
                                <span>邮箱：{userInfo.email}</span>
                                <Button type={"link"} className={styles.changeEmail}>换绑邮箱</Button>
                            </div>
                        </div>
                    </div>
                </div>
                </Spin>
            </div>
        </div>
    );
}

export default PersonalCenter;