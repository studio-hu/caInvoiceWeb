import styles from "./Login.module.scss"
import logo from "../../assets/image/calogo.png"
import bg from "../../assets/image/bg.png"
import shape from "../../assets/image/shape.png"
import {Button, Form, Input, message} from 'antd';
import {login} from "../../utils/api"
import {useEffect, useState} from "react";
import ScrollReveal from 'scrollreveal'
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setToken, setUserName} from "../../store/userSlice.ts";


function Login() {
    useEffect(() => {
        ScrollReveal().reveal(`.${styles.shape}`, {
            // 动画开始的方向
            origin: "left",
            //移动距离
            distance: "50px",
            // 动画持续时间
            duration: 1000,
            // 延迟
            delay: 0,
            //缩放
            //   scale: 0.8,
            // 初始透明度
            opacity: 0,
        })
        ScrollReveal().reveal(`.${styles.logo}`, {
            origin: "left",
            distance: "50px",
            duration: 1000,
            delay: 0,
            opacity: 0,
        })
        ScrollReveal().reveal(".text", {
            origin: "left",
            distance: "50px",
            duration: 1000,
            delay: 300,
            opacity: 0,
        })
        ScrollReveal().reveal(`.${styles.bg}`, {
            origin: "left",
            distance: "50px",
            duration: 2000,
            delay: 600,
            opacity: 0,
        })
        ScrollReveal().reveal(`.${styles.right}`, {
            duration: 1000,
            delay: 0,
            opacity: 0,
        })
    }, [])
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.preLocation || "/"
    const onFinish = async (values: any) => {
        setLoading(v => !v)
        let {userName, password} = values
        try {
            let res:any = await login({
                userName,
                password
            })
            console.log("res", res)
            let code = res.code;
            let msg = res.data.msg

            if (code === 200) {
                let token = res.data.token
                localStorage.setItem("token", token)
                localStorage.setItem("username", userName)
                dispatch(setToken(token))
                dispatch(setUserName(userName))
                setLoading(v => !v)
                message.success(msg)
                setTimeout(() => navigate(from, {replace: true}), 300)
            } else {
                setLoading(v => !v)
                message.error(msg)
            }
        } catch (e) {
            console.log(e)
            message.error("出错了")
            setLoading(v => !v)
        }


    };

    return (
        <div className={styles.content}>
            <img src={shape} alt={"shape"} className={styles.shape}/>
            <div className={styles.left}>
                <img src={logo} alt={"logo"} className={styles.logo}/>
                <div className="text">
                    <h1 className={styles.title}>
                        欢迎来到<br/>计算机协会
                    </h1>
                    <p className={styles.desc}>
                        如果你没有帐户，可以<br/>
                        <a href="/register" className={styles.register}>立即注册</a>
                    </p>
                </div>
            </div>
            <div className={styles.middle}>
                <img src={bg} alt={"插画"} className={styles.bg}/>
            </div>
            <div className={styles.right}>
                <Form
                    name="basic"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="userName"
                        rules={[{required: true, message: '请输入用户名'}]}
                    >
                        <Input className={styles.input} bordered={false} placeholder={"用户名"}/>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{required: true, message: '请输入密码'}]}
                    >
                        <Input.Password className={styles.input} bordered={false} placeholder={"密码"}/>
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 0, span: 16}}>
                        <a className={styles.forgetPassword}>忘记密码</a>
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 0, span: 16}}>
                        <Button loading={loading} type="primary" htmlType="submit" className={styles.btn}>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default Login;