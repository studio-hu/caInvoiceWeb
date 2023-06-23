import {Button, Divider, message, Popover, Table, Tag, Typography} from "antd";
import {ReloadOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {getInvoice} from "../../../utils/api";
import {useNavigate} from "react-router-dom";

const {Column} = Table

interface IPagination {
    current: number,
    pageSize: number,
    total?: number
}

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
    name: string,
    teamName: string,
    phone: string,
    email: string,
    userName: string
}

function InvoiceList() {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<Array<IData>>([]);
    const [pagination, setPagination] = useState<IPagination>({
        current: 1,
        pageSize: 10
    });
    const navigate=useNavigate()
    useEffect(() => {
        getInvoiceList()
    }, [JSON.stringify(pagination)])
    const getInvoiceList = async () => {
        setLoading(true)
        try {
            let res: any = await getInvoice(pagination.current, pagination.pageSize)
            if (res.code !== 200) {
                message.error(res.messages)
                setLoading(false)
                return
            }
            setData(res.data.records)
            setPagination({...pagination, total: res.data.total})
            setLoading(false)
            // message.success(res.messages)
            console.log(res)
        } catch (e) {
            setLoading(false)
            message.error("出错了")
            console.log(e)
        }
    }
    const handleTableChange = (pagination: any) => {
        // let {current,pageSize}=pagination
        setPagination(pagination)
        console.log(pagination)
    }
    return (
        <div>
            <Typography.Title level={4}>
                全部发票
            </Typography.Title>
            <div>
                <div style={{float: "right", marginBottom: "25px", display: "flex", alignItems: "center"}}>
                    <Popover placement="bottom" content={'刷新'}>
                        <ReloadOutlined onClick={getInvoiceList}
                                        style={{fontSize: '16px', margin: '0 20px', cursor: "pointer"}}/>
                    </Popover>
                </div>
            </div>
            <Divider/>
            <Table dataSource={data} rowKey="id" loading={loading} onChange={handleTableChange} pagination={pagination}
                   style={{borderRadius: 10, overflow: "hidden"}}>
                <Column title="编号" align="center" render={(_: any, _r: any, index: number): number => index + 1}/>
                <Column title="发票用途" align="center" dataIndex="description" width={200} ellipsis/>
                <Column title="发票金额" align="center" dataIndex="amount" render={value => `￥${value}`}/>
                <Column title="用户昵称" align="center" dataIndex="userName"/>
                <Column title="状态" align="center" dataIndex="status" render={value =>
                    <Tag color={value === 0 ? "warning" : value === 1 ? "success" : "error"}>
                        {value === 0 ? "待审核" : value === 1 ? "审核通过" : "审核失败"}
                    </Tag>
                }/>
                <Column title="发票提交时间" align="center" dataIndex="createTime"/>
                <Column title="发票审核时间" align="center" dataIndex="updateTime"
                        render={(value: string, record: IData): string => record.status === 0 ? "-" : value}/>
                <Column title="操作" align="center" dataIndex="id" width={200}
                        render={id => <Button type="primary"
                                              onClick={() => navigate(`ReviewDetail/${id}`)}>查看详情</Button>}
                />
            </Table>
        </div>
    );
}

export default InvoiceList;