import styles from "./InvoiceForReimbursement.module.scss";
import {Button, Form, Input, Modal, Select, Upload} from "antd";
import {PlusOutlined, LeftOutlined} from "@ant-design/icons"
import type {RcFile, UploadProps} from 'antd/es/upload';
import type {UploadFile} from 'antd/es/upload/interface';
import {useState} from "react";
import {useNavigate} from "react-router-dom";


const {Option} = Select;
const {TextArea} = Input
// {
//     uid: '-1',
//         name: 'image.png',
//     status: 'done',
//     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
// },
const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

function InvoiceForReimbursement() {
    const [previewOpen, setPreviewOpen] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([])
    const navigate = useNavigate();
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };
    const handleCancel = () => setPreviewOpen(false);
    const handleChange: UploadProps['onChange'] = ({fileList: newFileList}) => {
        setFileList(newFileList);
    }
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    // const handleChange = ({ fileList: newFileList }) =>{
    //     setFileList(newFileList);
    //     // console.log("value",value)
    //     console.log(newFileList)
    // }

    // const onFinishFailed = (errorInfo: any) => {
    //     console.log('Failed:', errorInfo);
    // };
    const uploadButton = (
        <div>
            <PlusOutlined/>
            <div style={{marginTop: 8}}>Upload</div>
        </div>
    );
    return (
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
                <div className={styles.form}>
                    <Form
                        name="basic"
                        labelCol={{span: 8}}
                        wrapperCol={{span: 16}}
                        style={{padding: 0, margin: 0, width: 800}}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="发票类型"
                            name="type"
                            rules={[{required: true, message: '请选择发票类型'}]}
                        >
                            <Select>
                                <Option value="a">办公用品</Option>
                                <Option value="b">电子产品</Option>
                                <Option value="d">打车</Option>
                                <Option value="c">生活用品</Option>
                                <Option value="s">其他</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="发票金额"
                            name="amount"
                            rules={[{required: true, message: '请填写发票金额'}]}
                        >
                            <Input className={styles.input}/>
                        </Form.Item>
                        <Form.Item
                            label="发票上传"
                            // name="amount"
                            // rules={[{ required: true}]}
                        >
                            {/*<Input className={styles.input} />*/}
                            <Upload
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={handlePreview}
                                onChange={handleChange}
                            >
                                {fileList.length >= 1 ? null : uploadButton}
                            </Upload>
                            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                                <img alt="example" style={{width: '100%'}}
                                     src={previewImage}
                                />
                            </Modal>
                        </Form.Item>
                        <Form.Item
                            label="发票用途"
                            name="description"
                            rules={[{required: true, message: '请填写发票用途'}]}
                        >
                            <TextArea maxLength={200} showCount/>
                        </Form.Item>


                        <Form.Item wrapperCol={{offset: 8, span: 16}}>
                            <Button type="default" style={{marginRight: 20}}>
                                取消
                            </Button>
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default InvoiceForReimbursement;