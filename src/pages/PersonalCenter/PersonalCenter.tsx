import styles from "./PersonalCenter.module.scss"
import {Avatar, Button, Form, Input, message, Modal, Select, Spin} from "antd";
import {UserOutlined, FormOutlined, LeftOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {getTeam, getUserInfo, updateUserInfo} from "../../utils/api";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

interface IUserInfo {
    id: string,
    name: string,
    userName: string,
    studentId: string,
    phone: string,
    email: string,
    team: {
        id: number | string,
        teamName: string,
    }
}
interface ITeamList {
    id: number ,
    teamName: string
}
const initUserInfo: IUserInfo = {
    id: '',
    name: '',
    userName: '',
    studentId: '',
    phone: '',
    email: '',
    team: {
        id: '',
        teamName: ''
    }
}
const initTeamList: ITeamList[] = [{
    id: NaN,
    teamName: ''
}]

function PersonalCenter() {
    const {user}: any = useSelector(state => state)
    const [form] = Form.useForm();
    const [spinning, setSpinning] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<IUserInfo>(initUserInfo);
    const [teamList, setTeamList] = useState<ITeamList[]>(initTeamList);
    const [updateUserInfoModal, setUpdateUserInfoModal] = useState<boolean>(false);
    const [updateUserInfoLoading, setUpdateUserInfoLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    useEffect(() => {
        getUser()
        getTeamList()
    }, [])
    const getUser = async () => {
        setSpinning(v => !v)
        try {
            let res: any = await getUserInfo(user.username)
            if (res.code === 200) {
                setUserInfo(res.data)
            }
            setSpinning(v => !v)
        } catch (error) {
            message.error("出错了")
            setSpinning(v => !v)
            console.log("error", error)
        }

    }
    const getTeamList = async () => {
        let res: any = await getTeam()
        if (res.code === 200) {
            setTeamList(res.data)
        }

    }
    const onFinish = async (values: { name: string, phone: string, studentId: string, teamId: string }) => {
        if (userInfo.id === '') {
            message.error("出错了")
            return
        }
        let newTeamId=''
        teamList.forEach(item => {
            if (item.teamName === values.teamId)
                newTeamId = item.id.toString()
        })
        let id: string = userInfo.id
        try {
            setUpdateUserInfoLoading(true)
            let res: any = await updateUserInfo({...values,teamId:newTeamId, id})
            console.log(res)
            if (res.code !== 200) {
                message.error(res.message)
                setUpdateUserInfoLoading(false)
            }
            message.success(res.message)
            getUser()
            setUpdateUserInfoLoading(false)
            setUpdateUserInfoModal(false)
        } catch (e) {
            message.error("出错了")
            setUpdateUserInfoLoading(false)
            console.log(e)
        }


    };

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
                            <h1 className={styles.nickName}>{userInfo.userName || "待完善"}</h1>
                        </div>
                        <div className={styles.detailList}>
                            <Button type={"text"} size={"small"} icon={<FormOutlined/>}
                                    className={styles.modify}
                                    onClick={() => {
                                        form.setFieldsValue({
                                            studentId: userInfo.studentId,
                                            name: userInfo.name,
                                            phone: userInfo.phone,
                                            teamId: userInfo.team?.teamName,
                                            email: userInfo.email
                                        })
                                        setUpdateUserInfoModal(true)
                                    }}>编辑资料</Button>
                            <div className={styles.userDetail}>
                                <div className={styles.detailItem}>
                                    <span>学号：{userInfo.studentId || "待完善"}</span>
                                </div>
                                <div className={styles.detailItem}>
                                    <span>姓名：{userInfo.name || "待完善"}</span>
                                </div>

                                <div className={styles.detailItem}>
                                    <span>手机号：{userInfo.phone || "待完善"}</span>
                                </div>
                                <div className={styles.detailItem}>
                                    <span>组别：{userInfo.team?.teamName || "待完善"}</span>
                                </div>
                                <div className={styles.detailItem}>
                                    <span>邮箱：{userInfo.email || "待完善"}</span>
                                    <Button type={"link"} className={styles.changeEmail}>换绑邮箱</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Spin>
            </div>
            {/*用户信息修改对话框*/}
            <Modal
                title="用户信息修改"
                open={updateUserInfoModal}
                onCancel={() => setUpdateUserInfoModal(false)}
                footer={null}
            >
                <Form
                    form={form}
                    labelCol={{span: 4}}
                    wrapperCol={{span: 20}}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="学号"
                        name="studentId"
                        rules={[{required: true, message: '请输入学号'}, {
                            pattern: /^\d+$/,
                            message: '请输入正确的学号'
                        }]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="姓名"
                        name="name"
                        rules={[{required: true, message: '请输入姓名'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="组别"
                        name="teamId"
                        rules={[{required: true, message: '请选择组别'}]}
                    >
                        <Select placeholder="--请选择--">
                            {
                                teamList.map((item: ITeamList) =>
                                    <Select.Option key={item.id} value={item.teamName}>{item.teamName}</Select.Option>)
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="手机号"
                        name="phone"
                        rules={[{
                            required: true,
                            pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/,
                            message: '请输入正确的手机号'
                        }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 15}}>
                        <Button type="default" style={{marginRight: 20}}
                                onClick={() => setUpdateUserInfoModal(false)}>
                            取消
                        </Button>
                        <Button type="primary" htmlType="submit" loading={updateUserInfoLoading}>
                            确定
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default PersonalCenter;