import {Button, Descriptions, Image, Tag, Skeleton, Spin, message, Modal} from 'antd';
import {useNavigate, useParams} from "react-router-dom";
import { getBillById, updateBillInfo} from "../../../utils/api";
import   {useEffect, useState} from "react";
import {ExclamationCircleFilled, LeftOutlined} from "@ant-design/icons";
import "./ReviewDetail.css"

interface IData {
    id: string,
    description: string,
    imgUrl: string,
    amount: number,
    userId: string,
    status: number,
    remarks: string,
    type: string,
    createTime: string,
    updateTime: string,
    name: string,
    teamName: string,
    phone: string,
    email: string,
    userName: string
}

function ReviewDetail() {
    const [data, setData] = useState<IData>();
    const [loading, setLoading] = useState<boolean>(false);
    const params = useParams()
    const navigate = useNavigate();
    console.log(params)
    useEffect(() => {
        getBill()
    }, [])
    const getBill = async () => {
        setLoading(true)
        try {
            let id: string = params.id as string
            let res: any = await getBillById(id)
            setData(res.data)
            setLoading(false)
            console.log(res)
        } catch (e) {
            setLoading(false)
            message.error("出错了")
        }
    }
    const deleteConfirm = () => {
        Modal.confirm({
            title: '确定此发票通过审核吗?',
            icon: <ExclamationCircleFilled/>,
            // content: 'Some descriptions',
            cancelText: "取消",
            okText: "确定",
            onOk: () => new Promise((resolve, reject) => {
                let id: string = params.id as string
                updateBillInfo({id, status: 1}).then((res: any) => {
                    if (res.code !== 200) {
                        return reject(message.error(res.message))
                    }
                    message.success("审核通过成功")
                    return resolve(getBill())
                }).catch(error => {
                    console.log(error)
                    return reject(message.error("出错了"))
                })
            })
        })
    }
    return (
        <div style={{position: "relative"}}>
            <div style={{position: "absolute", right: 0, zIndex: 5}}>
                <Button type="text" size="large" icon={<LeftOutlined/>} onClick={() => navigate(-1)}>返回</Button>
            </div>
            <Spin tip="加载中..." spinning={loading}>
                <Descriptions title="账单详细详细" bordered>
                    <Descriptions.Item label="账单编号">{data?.id || "-"}</Descriptions.Item>
                    <Descriptions.Item label="账单金额">{data && "￥"}{data?.amount || "-"}</Descriptions.Item>
                    <Descriptions.Item label="账单类型">{data?.type || "-"}</Descriptions.Item>
                    <Descriptions.Item label="状态">
                        {data ? <Tag color={data?.status === 0 ? "warning" : data?.status === 1 ? "success" : "error"}>
                            {data?.status === 0 ? "待审核" : data?.status === 1 ? "审核通过" : "审核失败"}
                        </Tag> : "-"}
                    </Descriptions.Item>
                    <Descriptions.Item label="提交时间">{data?.createTime || "-"}</Descriptions.Item>
                    <Descriptions.Item label="审核时间">{data?.updateTime || "-"}</Descriptions.Item>
                    <Descriptions.Item label="提交人">{data?.name || "-"}</Descriptions.Item>
                    <Descriptions.Item label="手机号">{data?.phone || "-"}</Descriptions.Item>
                    <Descriptions.Item label="组别">{data?.teamName || "-"}</Descriptions.Item>
                    <Descriptions.Item label="发票图片">
                        {data ? <Image width={200} src={`http://oss.hyqstudio.top/${data?.imgUrl}`} placeholder
                                       alt="发票图片"/> :
                            <Skeleton.Image active={loading}/>}
                    </Descriptions.Item>
                </Descriptions>
                {data?.status !== 1 && <div style={{margin: "50px 0", textAlign: "center"}}>
                    <Button type="primary" danger style={{marginRight: 40}}>不通过</Button>
                    <Button type="primary" onClick={deleteConfirm}>通过</Button>
                </div>}

            </Spin>
        </div>
    );
}

export default ReviewDetail;