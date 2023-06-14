import {Button, Divider, Input, message, Modal, Popover, Table, Typography} from 'antd';
import {ReloadOutlined, ExclamationCircleFilled} from "@ant-design/icons";
import {addTeam, deleteTeam, getTeam, updateTeam} from "../../../utils/api";
import React, {useEffect, useState} from "react";

const {Column} = Table;

interface DataType {
    id: string,
    teamName: string
}

function TagUser() {
    const [data, setData] = useState<DataType | []>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [useTag, setUseTag] = useState<string>('');
    const [updateUseTag, setUpdateUseTag] = useState<DataType>({id: "", teamName: ""});
    const [addUserModal, setAddUserModal] = useState<boolean>(false);
    const [updateUserModal, setUpdateUserModal] = useState<boolean>(false);
    const [addUserLoading, setAddUserLoading] = useState<boolean>(false);
    const [updateUserLoading, setUpdateUserLoading] = useState<boolean>(false);
    useEffect(() => {
        getTag()
    }, [])
    const getTag = async () => {
        setLoading(v => !v)
        try {
            let res: any = await getTeam()
            if (res.code === 200) {
                setData(res.data)
            }
            setLoading(v => !v)
        } catch (e) {
            message.error("出错了")
            setLoading(v => !v)
            throw e;
        }
    }
    const handleAddChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUseTag(e.target.value)
    }
    const confirmAddUser = async () => {
        if (useTag === '') {
            message.error("请输入用户类型")
            return
        }
        setAddUserLoading(true)
        try {
            let res: any = await addTeam({teamName: useTag})
            if (res.code !== 200) {
                message.error(res.message)
                setAddUserLoading(false)
                return
            }
            message.success(res.message)
            setAddUserLoading(false)
            setAddUserModal(false)
            setUseTag('')
            getTag()
        } catch (e) {
            setAddUserLoading(v => !v)
            throw e
        }


    }
    const deleteConfirm = (value: string) => {
        Modal.confirm({
            title: '确定要删除此组吗?',
            icon: <ExclamationCircleFilled/>,
            // content: 'Some descriptions',
            cancelText: "取消",
            okText: "确定",
            okType: "danger",
            onOk: () => new Promise((resolve, reject) => {
                deleteTeam(value).then((res: any) => {
                    if (res.code !== 200) {
                        return reject(message.error(res.message))
                    }
                    message.success(res.message)
                    return resolve(getTag())
                }).catch(error => {
                    console.log(error)
                    return reject(message.error("出错了"))
                })
            })
        })
    }
    const confirmUpdateUser = async () => {
        if (updateUseTag?.teamName === '') {
            message.error("请输入用户类型")
            return
        }
        setUpdateUserLoading(true)
        try {
            let res: any = await updateTeam(updateUseTag)
            if (res.code !== 200) {
                message.error(res.message)
                setUpdateUserLoading(false)
                return
            }
            message.success(res.message)
            setUpdateUserLoading(false)
            setUpdateUserModal(false)
            getTag()
        } catch (e) {
            setUpdateUserLoading(v => !v)
            throw e
        }
    }
    const handleUpdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdateUseTag(prevState => ({...prevState, teamName: e.target.value}))
    }

    return (
        <div>
            <Typography.Title level={4}>
                用户标签
            </Typography.Title>
            <div>
                <div style={{float: "right", marginBottom: "25px", display: "flex", alignItems: "center"}}>
                    <Popover placement="bottom" content={'刷新'}>
                        <ReloadOutlined onClick={getTag}
                                        style={{fontSize: '16px', margin: '0 20px', cursor: "pointer"}}/>
                    </Popover>
                    <Button type={"primary"} onClick={() => setAddUserModal(true)}>添加标签</Button>
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
                    render={(value, record: DataType) => (
                        <>
                            <Button type="primary" onClick={() => {
                                setUpdateUseTag(record)
                                setUpdateUserModal(true)
                            }}
                                    style={{marginRight: 20}}>修改</Button>
                            <Button type="primary" danger onClick={() => deleteConfirm(value)}>删除</Button>
                        </>
                    )}
                />
            </Table>
            {/*    添加标签对话框*/}
            <Modal
                title="用户标签添加"
                open={addUserModal}
                onOk={confirmAddUser}
                confirmLoading={addUserLoading}
                onCancel={() => setAddUserModal(false)}
            >
                <div style={{display: "flex", alignItems: "center"}}>
                    <span style={{width: 100}}>用户标签：</span>
                    <Input type="text" placeholder="用户标签" width={200} value={useTag} onChange={handleAddChange}
                           onKeyDown={event => event.key === 'Enter' && confirmAddUser()}/>
                </div>
            </Modal>
            {/*    修改标签对话框*/}
            <Modal
                title="用户标签修改"
                open={updateUserModal}
                onOk={confirmUpdateUser}
                confirmLoading={updateUserLoading}
                onCancel={() => setUpdateUserModal(false)}
            >
                <div style={{display: "flex", alignItems: "center"}}>
                    <span style={{width: 100}}>用户标签：</span>
                    <Input type="text" placeholder="用户标签" width={200} value={updateUseTag.teamName}
                           onChange={handleUpdateChange}
                           onKeyDown={event => event.key === 'Enter' && confirmUpdateUser()}/>
                </div>
            </Modal>
        </div>
    );
}

export default TagUser;