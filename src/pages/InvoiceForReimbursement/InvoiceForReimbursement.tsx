import styles from "./InvoiceForReimbursement.module.scss";
import {Button, Form, Input, Result, message, Select, Upload} from "antd";
import {LeftOutlined, UploadOutlined} from "@ant-design/icons"
import type {UploadFile} from 'antd/es/upload/interface';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {addInvoice, getUserInfo} from "../../utils/api";
import {useSelector} from "react-redux";


const {Option} = Select;
const {TextArea} = Input
const invoiceType = ["零食", "日用", "交通", "数码", "办公", "It服务", "其他"]
// {
//     uid: '-1',
//         name: 'image.png',
//     status: 'done',
//     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
// },

function InvoiceForReimbursement() {
    const [fileList, setFileList] = useState<UploadFile[]>([])
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const navigate = useNavigate();
    const {user}: any = useSelector(state => state)
    const onFinish = async (values: any) => {
        setLoading(true)
        try {
            let res: any = await getUserInfo(user.username)
            if (res.code !== 200) {
                message.error("出错了")
                setLoading(false)
                return
            }
            let id: string = res.data.id
            let result: any = await addInvoice({...values, userId: id})
            if (result.code !== 200) {
                message.error(result.message)
                setLoading(false)
                return
            }
            message.success(result.message)
            setLoading(false)
            setSuccess(true)
        } catch (e) {
            message.error("出错了")
            setLoading(false)
            console.log(e)
        }
    };
    const beforeUpload=(file)=>{
        console.log(file)
        return false;
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1 className={styles.title}>发票报销</h1>
                    <Button
                        type={"text"}
                        icon={<LeftOutlined/>}
                        size={"large"}
                        className={styles.btn}
                        onClick={() => navigate(-1)}
                    >返回</Button>
                    {
                        success ?
                            <div className={styles.result}>
                                <Result
                                    status="success"
                                    title="发票报销提交成功！"
                                    subTitle="请耐心等待管理员审核"
                                ></Result>
                            </div> :
                            <div className={styles.form}>
                                <Form
                                    labelCol={{span: 4}}
                                    wrapperCol={{span: 18}}
                                    // style={{padding: 0, margin: 0}}
                                    onFinish={onFinish}
                                >
                                    <Form.Item
                                        label="发票类型"
                                        name="type"
                                        rules={[{required: true, message: '请选择发票类型'}]}
                                    >
                                        <Select placeholder="-请选择-">
                                            {
                                                invoiceType.map((value, index) =>
                                                    <Option key={index} value={value}>{value}</Option>)
                                            }
                                        </Select>
                                    </Form.Item>

                                    <Form.Item
                                        label="发票金额"
                                        name="amount"
                                        rules={[
                                            {required: true, message: '请填写发票金额'},
                                            {pattern: /^[0-9]+(\.[0-9]{1,2})?$/, message: '请输入正确的金额'}
                                        ]}
                                    >
                                        <Input
                                            prefix="￥"
                                            className={styles.input}/>
                                    </Form.Item>
                                    <Form.Item
                                        label="发票上传"
                                        // name="amount"
                                        // rules={[{ required: true}]}
                                    >
                                        <Upload
                                            accept="image/png,image/png,image/jpeg"
                                            maxCount={1}
                                            listType="picture"
                                            fileList={fileList}
                                            beforeUpload={beforeUpload}
                                        >
                                            <Button icon={<UploadOutlined/>}>发票上传</Button>
                                        </Upload>
                                    </Form.Item>
                                    <Form.Item
                                        label="发票用途"
                                        name="description"
                                        rules={[{required: true, message: '请填写发票用途'}]}
                                    >
                                        <TextArea maxLength={200} showCount/>
                                    </Form.Item>


                                    <Form.Item wrapperCol={{offset: 4, span: 20}}>
                                        <Button type="default" style={{marginRight: 20}}>
                                            取消
                                        </Button>
                                        <Button type="primary" htmlType="submit" loading={loading}>
                                            提交
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                    }
                </div>
            </div>

        </>

    );
}

export default InvoiceForReimbursement;