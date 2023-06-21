import {Button, Divider, message, Popover, Table, Tag, Typography} from "antd";
import {ReloadOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {getPendingInvoice} from "../../../utils/api";
import {useNavigate} from "react-router-dom";

const {Column} = Table;
interface IData {
    id: string,
    description: string,
    imgUrl: string,
    amount: number,
    isDelete: number,
    userId: string,
    status: number,
    remarks: string,
    type: string,
    createTime: string,
    updateTime: string,
    user: { userName: string }
}

function InvoiceReview() {
    const [data, setData] = useState<Array<IData>>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        getInvoiceList()
    }, []);

    const getInvoiceList = async () => {
        setLoading(true)
        try {
            let res: any = await getPendingInvoice()
            if (res.code !== 200) {
                message.error(res.messages)
                setLoading(false)
                return
            }
            setData(res.data)
            setLoading(false)
            // console.log(res);
        } catch (e) {
            setLoading(false)
            message.error("出错了")
            console.log(e)
        }
    }


    return (
        <div>
            <Typography.Title level={4}>
                发票审核
            </Typography.Title>
            <div>
                <div style={{float: "right", marginBottom: "25px", display: "flex", alignItems: "center"}}>
                    <Popover placement="bottom" content={'刷新'}>
                        <ReloadOutlined
                            onClick={getInvoiceList}
                            style={{fontSize: '16px', margin: '0 20px', cursor: "pointer"}}/>
                    </Popover>
                </div>
            </div>
            <Divider/>
            <Table dataSource={data} rowKey="id" loading={loading} style={{borderRadius: 10, overflow: "hidden"}}>
                <Column title="编号" align="center" render={(_: any, _r: any, index: number): number => index + 1}/>
                <Column title="发票用途" align="center" dataIndex="description" width={200} ellipsis/>
                <Column title="发票金额" align="center" dataIndex="amount" render={value => `￥${value}`}/>
                <Column title="提交人" align="center" dataIndex="user" render={value => value.userName}/>
                <Column title="状态" align="center" dataIndex="status"
                        render={value =>
                            <Tag color={value === 0 ? "warning" : value === 1 ? "success" : "error"}>
                                {value === 0 ? "待审核" : value === 1 ? "审核通过" : "审核失败"}
                            </Tag>
                        }/>
                <Column title="发票提交时间" align="center" dataIndex="createTime"/>
                <Column title="操作" align="center" dataIndex="id"
                        render={id => <Button type="primary"
                                              onClick={() => navigate(`pendingReview/${id}`)}>查看详情</Button>}
                />
            </Table>
        </div>
    );
}

export default InvoiceReview;
