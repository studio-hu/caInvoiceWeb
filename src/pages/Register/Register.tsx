import styles from "./Register.module.scss"
import logo from "../../assets/image/calogo.png"
import bg from "../../assets/image/bg.png"
import shape from "../../assets/image/shape.png"
import {Button, Form, Input, message, Space} from 'antd';
import {checkVerificationCode, getEmailCode, register} from "../../utils/api"
import {useEffect, useState} from "react";
import ScrollReveal from 'scrollreveal'
// import {Simulate} from "react-dom/test-utils";
// import error = Simulate.error;


function Register() {
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
    const [codeLoading, setcodeLoading] = useState<boolean>(false);
    const [form] = Form.useForm()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const [countdown, setCountdown] = useState<number>(parseInt(sessionStorage.getItem('countdown')) || 0);
    useEffect(() => {
        if (countdown > 0) {
            let timeId = setInterval(() => {
                console.log("定时器")
                setCountdown(v => v - 1)
            }, 1000)
            return () => clearInterval(timeId)
        }

    }, [countdown])
    useEffect(() => {
        sessionStorage.setItem('countdown', countdown.toString());
    }, [countdown]);

    const getVerificationCode = async () => {
        let pending = form.validateFields(["email"])
        Promise.all([pending]).then(async res => {
            setcodeLoading(v => !v)
            let email: string = res[0].email
            let result = await getEmailCode(email)
            let {code} = result.data
            if (code === 200) {
                setcodeLoading(v => !v)
                message.success("验证码发送成功")
                sessionStorage.setItem('countdown', "10");
                setCountdown(60)
                // let code: string = result.data.data
                // setCode(code)
            }
            console.log(result)
        }).catch(error => {
            console.log('error', error)
            setcodeLoading(false)
        })
    }
    const onFinish = async (values: any) => {
        setLoading(v => !v)
        let {email, password, studentId, userName, verificationCode} = values
        try {
            let status = await checkVerificationCode({code: verificationCode, email})
            if (status.data.code !== 200) {
                setLoading(v => !v)
                message.error(status.data.message)
                return;
            }
            let res = await register({
                studentId, userName, password, email
            })
            console.log("res", res)
            let code = res.data.code;
            let msg = res.data.data.msg
            if (code === 200) {
                setLoading(v => !v)
                message.success(msg)
            } else {
                setLoading(v => !v)
                message.error(msg)
            }
        } catch (e) {
            message.error("出错了")
            setLoading(v => !v)
            console.log(e)
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
                        如果你已有帐户，现在<br/>
                        <a href="/login" className={styles.register}>登录</a>
                    </p>
                </div>
            </div>
            <div className={styles.middle}>
                <img src={bg} alt={"插画"} className={styles.bg}/>
            </div>
            <div className={styles.right}>
                <Form
                    form={form}
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="studentId"
                        rules={[{required: true, message: '请输入学号'}, {
                            pattern: /^\d+$/,
                            message: '请输入正确的学号'
                        }]}
                    >
                        <Input className={styles.input} bordered={false} placeholder={"学号"}/>
                    </Form.Item>
                    <Form.Item
                        name="userName"
                        rules={[{required: true, message: '请输入用户名'}]}
                    >
                        <Input className={styles.input} bordered={false} placeholder={"用户名"}/>
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[{required: true, message: '请输入邮箱'}, {type: "email", message: '请输入正确的邮箱'}]}
                    >
                        <Input className={styles.input} bordered={false} placeholder={"邮箱"}/>
                    </Form.Item>
                    <Form.Item
                        name="verificationCode"
                        rules={[{required: true, message: '请输入验证码'}]}
                    >
                        <Space.Compact style={{width: '400px'}}>
                            <Input className={styles.input} style={{
                                borderBottomRightRadius: 0,
                                borderTopRightRadius: 0
                            }} bordered={false} placeholder={"验证码"}/>
                            <Button type="primary" style={{
                                height: "60px",
                                width: "140px",
                                borderBottomRightRadius: "10px",
                                borderTopRightRadius: "10px"
                            }} onClick={getVerificationCode}
                                    disabled={countdown > 0}
                                    loading={codeLoading}>{countdown > 0 ? countdown : '获取验证码'}</Button>
                        </Space.Compact>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{required: true, message: '请输入密码'}, {
                            pattern: /^[A-Za-z0-9]{6,10}$/,
                            message: '密码由数字和字母组成，6到10位'
                        }]}
                    >
                        <Input.Password className={styles.input} bordered={false} placeholder={"密码"}/>
                    </Form.Item>

                    <Form.Item
                        name="passwordRepeat"
                        rules={[
                            {required: true, message: '请再次输入密码'},
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('两次输入的密码不一致!'));
                                },
                            })
                        ]}
                    >
                        <Input.Password className={styles.input} bordered={false} placeholder={"确认密码"}/>
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 0, span: 16}}>
                        <a className={styles.forgetPassword}>忘记密码</a>
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 0, span: 16}}>
                        <Button loading={loading} type="primary" htmlType="submit" className={styles.btn}>
                            注册
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default Register;