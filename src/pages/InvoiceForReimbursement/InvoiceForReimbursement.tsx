import styles from "./InvoiceForReimbursement.module.scss";
import {Button, Form, Input, Result, message, Select, Upload, Modal} from "antd";
import {LeftOutlined, PlusOutlined} from "@ant-design/icons"
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {addInvoice, getUserInfo, uploadFile} from "../../utils/api";
import {useSelector} from "react-redux";
import type {RcFile, UploadProps} from 'antd/es/upload';
import type {UploadFile} from 'antd/es/upload/interface';


const {Option} = Select;
const {TextArea} = Input
const invoiceType = ["零食", "日用", "交通", "数码", "办公", "It服务", "其他"]

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

function InvoiceForReimbursement() {
    const [fileList, setFileList] = useState<UploadFile[]>([])
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const navigate = useNavigate();
    const {user}: any = useSelector(state => state)
    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };
    const handleChange: UploadProps['onChange'] = ({fileList: newFileList}) =>
        setFileList(newFileList);
    const beforeUpload = (file: UploadFile): string | boolean => {
        const MAX_SIZE: number = 5242880 as number
        let size: number = file.size as number
        if (size > MAX_SIZE) {
            message.error("图片大小超过限制")
            return Upload.LIST_IGNORE
        }
        return false
    }
    const uploadInvoiceImg = async (file: any) => {
        let format = new FormData()
        format.append("file", file)
        let res: any = await uploadFile(format)
        if (res.status !== "success") {
            message.error("表单提交失败")
            return ''
        }
        return res.filePath
    }
    const onFinish = async (values: any) => {
        setLoading(true)
        try {
            let res: any = await getUserInfo(user.username)
            if (res.code !== 200) {
                message.error("出错了")
                setLoading(false)
                return
            }
            let imgUrl:string=await uploadInvoiceImg(values.fileList.file)
            if(imgUrl===''){
                message.error("出错了")
                setLoading(false)
                return
            }
            let id: string = res.data.id
            let result: any = await addInvoice({...values, imgUrl,userId: id})
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
                                        extra={"注意：图片大小不能超过5MB"}
                                        name="fileList"
                                        rules={[{required: true, message: "请选择发票上传"}]}
                                    >
                                        <Upload
                                            name="fileList"
                                            listType="picture-card"
                                            fileList={fileList}
                                            onPreview={handlePreview}
                                            onChange={handleChange}
                                            beforeUpload={beforeUpload}
                                        >
                                            {fileList.length >= 1 ? null :
                                                <div>
                                                    <PlusOutlined/>
                                                    <div style={{marginTop: 8}}>
                                                        发票上传
                                                    </div>
                                                </div>
                                            }
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
            <Modal open={previewOpen} title={previewTitle}
                   footer={null} onCancel={handleCancel}
                   width={1000}
            >
                <img alt="图片预览" style={{width: '100%'}}
                     src={previewImage}
                />
            </Modal>
        </>

    );
}

export default InvoiceForReimbursement;