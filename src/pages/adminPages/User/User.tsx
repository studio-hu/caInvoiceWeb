import {Button, Divider, message, Popover, Table, Typography} from "antd";
import {ReloadOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {getUser} from "../../../utils/api";

const {Column} = Table;

interface IPagination {
    current: number,
    pageSize: number,
    total?: number
}

interface IData {
    id: string,
    studentId: string,
    userName: string,
    name: string,
    avatar: string,
    email: string,
    phone: string,
    isDelete: number,
    teamId: number,
    createTime: string,
    updateTime: string,
    team: { teamName: string }
}

function User() {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<Array<IData>>([]);
    const [pagination, setPagination] = useState<IPagination>({
        current: 1,
        pageSize: 10
    });
    useEffect(() => {
        getUserList()
    }, [JSON.stringify(pagination)])
    const getUserList = async () => {
        setLoading(true)
        try {
            let res: any = await getUser(pagination.current, pagination.pageSize)
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
                用户管理
            </Typography.Title>
            <div>
                <div style={{float: "right", marginBottom: "25px", display: "flex", alignItems: "center"}}>
                    <Popover placement="bottom" content={'刷新'}>
                        <ReloadOutlined
                            onClick={getUserList}
                            style={{fontSize: '16px', margin: '0 20px', cursor: "pointer"}}/>
                    </Popover>
                </div>
            </div>
            <Divider/>
            <Table dataSource={data} rowKey="id" loading={loading} onChange={handleTableChange} pagination={pagination}
                   style={{borderRadius: 10, overflow: "hidden"}}>
                <Column title="编号" align="center" render={(_: any, _r: any, index: number): number => index + 1}/>
                <Column title="用户昵称" align="center" dataIndex="userName"/>
                <Column title="学号" align="center" dataIndex="studentId" render={value => value || "-"}/>
                <Column title="姓名" align="center" dataIndex="name" render={value => value || "-"}/>
                <Column title="组别" align="center" dataIndex="team" render={value => value?.teamName || "-"}/>
                <Column title="邮箱" align="center" dataIndex="email"/>
                <Column title="手机号" align="center" dataIndex="phone" render={value => value || "-"}/>
                <Column title="注册时间" align="center" dataIndex="createTime"/>
                <Column title="更新时间" align="center" dataIndex="updateTime"/>
                <Column
                    title="操作"
                    align="center"
                    dataIndex="id"
                    render={() => (
                        <>
                            <Button type="primary" onClick={() => {
                                // setUpdateUseTag(record)
                                // setUpdateUserModal(true)
                            }}
                                    style={{marginRight: 20}}>修改</Button>
                            <Button type="primary" danger>删除</Button>
                        </>
                    )}
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

export default User;