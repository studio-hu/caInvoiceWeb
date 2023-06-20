import {Button, Divider, Input, Modal, Popover, Table, Typography} from "antd";
import {ReloadOutlined} from "@ant-design/icons";
import {useState} from "react";
const {Column} = Table;

function User() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const getUserList=()=>{

   }
    return (
        <div>
            <Typography.Title level={4}>
                用户标签
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
            {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
            {/*@ts-ignore*/}
            <Table dataSource={data} rowKey="id" loading={loading} style={{borderRadius: 10, overflow: "hidden"}}>
                <Column title="编号" align="center" render={(_: any, _r: any, index: number) => index + 1}/>
                <Column title="组名" align="center" dataIndex="teamName"/>
                <Column
                    title="操作"
                    align="center"
                    dataIndex="id"
                    render={(value, record) => (
                        <>
                            <Button type="primary" onClick={() => {
                                // setUpdateUseTag(record)
                                // setUpdateUserModal(true)
                            }}
                                    style={{marginRight: 20}}>修改</Button>
                            <Button type="primary" danger >删除</Button>
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