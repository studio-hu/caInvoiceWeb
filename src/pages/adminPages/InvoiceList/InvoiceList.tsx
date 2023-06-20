import {Button, Divider, message, Popover, Table, Typography} from "antd";
import {ReloadOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {getInvoice} from "../../../utils/api";

const {Column} = Table
interface IPagination{
    current:number,
    pageSize:number,
    total?:number
}

function InvoiceList() {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState<IPagination>({
        current:1,
        pageSize:10
    });
    useEffect(() => {
        getInvoiceList()
    }, [JSON.stringify(pagination)])
    const getInvoiceList = async () => {
        try {
            setLoading(true)
            let res: any = await getInvoice(pagination.current, pagination.pageSize)
            if (res.code !== 200) {
                message.error(res.messages)
                setLoading(false)
                return
            }
            setData(res.data.records)
            setPagination({...pagination,total:res.data.total})
            setLoading(false)
            // message.success(res.messages)
            console.log(res)
        } catch (e) {
            setLoading(false)
            message.error("出错了")
            console.log(e)
        }
    }
    const handleTableChange = (pagination:any) => {
        // let {current,pageSize}=pagination
        setPagination(pagination)
        console.log(pagination)
    }
    return (
        <div>
            <Typography.Title level={4}>
                用户标签
            </Typography.Title>
            <div>
                <div style={{float: "right", marginBottom: "25px", display: "flex", alignItems: "center"}}>
                    <Popover placement="bottom" content={'刷新'}>
                        <ReloadOutlined onClick={getInvoiceList}
                                        style={{fontSize: '16px', margin: '0 20px', cursor: "pointer"}}/>
                    </Popover>
                    {/*<Button type={"primary"} onClick={() => setAddUserModal(true)}>添加标签</Button>*/}
                </div>
            </div>
            <Divider/>
            {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
            {/*@ts-ignore*/}
            <Table dataSource={data} rowKey="id" loading={loading} onChange={handleTableChange} pagination={pagination}
                   style={{borderRadius: 10, overflow: "hidden"}}>
                <Column title="编号" align="center" render={(_: any, _r: any, index: number) => index + 1}/>
                <Column title="发票用途" align="center" dataIndex="description" width={200} ellipsis/>
                <Column title="发票金额" align="center" dataIndex="amount" render={value => `￥${value}`}/>
                <Column title="提交人" align="center" dataIndex="user" render={value => value.userName}/>
                <Column title="发票提交时间" align="center" dataIndex="createTime"/>
                <Column title="发票审核时间" align="center" dataIndex="updateTime"/>
                <Column
                    title="操作"
                    align="center"
                    dataIndex="id"
                    width={200}
                    render={() => <Button type="primary">查看详情</Button>}
                />
            </Table>
            {/*    添加标签对话框*/}
            {/*<Modal*/}
            {/*    title="用户标签添加"*/}
            {/*    open={addUserModal}*/}
            {/*    onOk={confirmAddUser}*/}
            {/*    confirmLoading={addUserLoading}*/}
            {/*    onCancel={() => setAddUserModal(false)}*/}
            {/*>*/}
            {/*    <div style={{display: "flex", alignItems: "center"}}>*/}
            {/*        <span style={{width: 100}}>用户标签：</span>*/}
            {/*        <Input type="text" placeholder="用户标签" width={200} value={useTag} onChange={handleAddChange}*/}
            {/*               onKeyDown={event => event.key === 'Enter' && confirmAddUser()}/>*/}
            {/*    </div>*/}
            {/*</Modal>*/}
            {/*/!*    修改标签对话框*!/*/}
            {/*<Modal*/}
            {/*    title="用户标签修改"*/}
            {/*    open={updateUserModal}*/}
            {/*    onOk={confirmUpdateUser}*/}
            {/*    confirmLoading={updateUserLoading}*/}
            {/*    onCancel={() => setUpdateUserModal(false)}*/}
            {/*>*/}
            {/*    <div style={{display: "flex", alignItems: "center"}}>*/}
            {/*        <span style={{width: 100}}>用户标签：</span>*/}
            {/*        <Input type="text" placeholder="用户标签" width={200} value={updateUseTag.teamName}*/}
            {/*               onChange={handleUpdateChange}*/}
            {/*               onKeyDown={event => event.key === 'Enter' && confirmUpdateUser()}/>*/}
            {/*    </div>*/}
            {/*</Modal>*/}
        </div>
    );
}

export default InvoiceList;