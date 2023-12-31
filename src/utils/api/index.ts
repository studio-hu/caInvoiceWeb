import request from "./request.ts";

/**
 * 登录请求
 * @param data
 */
export const login = (data: { userName: string, password: string }) => {
    return request.post(`/login`, data)
}
/**
 * 用户注册
 * @param data
 */
export const register = (data: {
    studentId: string,
    userName: string,
    password: string,
    email: string,
}) => {
    return request.post(`/register`, data)
}
/**
 * 获取邮箱验证码
 * @param email 邮箱
 */
export const getEmailCode = (email: string) => {
    return request.get(`/email/${email}`)
}
/**
 * 校验验证码
 * @param data
 */
export const checkVerificationCode = (data: { code: string, email: string }) => {
    return request.post(
        `/email/checkVerificationCode`,
        data,
        {
            headers: {'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'}
        }
    )
}
/**
 * 根据用户名获取用户信息
 * @param username 用户名
 */
export const getUserInfo = (username: string) => {
    return request.get(`/user/${username}`)
}
/**
 * 更新用户信息
 * @param data
 */
export const updateUserInfo = (data: {
    id: string,
    name: string,
    phone: string,
    studentId: string,
    teamId: string
}) => {
    return request.put(`/user`, data)
}

/**
 * 获取所有组别
 */
export const getTeam = () => {
    return request.get(`/team`)
}
/**
 * 添加组
 * @param data 组名称
 */
export const addTeam = (data: { teamName: string }) => {
    return request.post(`/team`, data)
}
/**
 * 删除组
 * @param id 组id
 */
export const deleteTeam = (id: string) => {
    return request.delete(`/team/${id}`)
}
/**
 * 更新组
 * @param data 组名称
 */
export const updateTeam = (data: { id: string, teamName: string }) => {
    return request.put(`/team`, data)
}
/**
 * 添加发票
 * @param data 发票数据
 */
export const addInvoice = (data: {
    description: string,
    imgUrl: string,
    amount: number,
    type: string,
    userId: string
}) => {
    return request.post(`/bill`, data)
}
/**
 * 文件上传
 * @param file 文件
 */
export const uploadFile = (file: any) => {
    return request.post(`/oss/uploadFile`, file, {
        headers: {'Content-Type': 'multipart/form-data'}
    })
}
/**
 * 分页获取账单
 * @param currentPage 当前页
 * @param pageSize 每页显示的条数
 */
export const getInvoice = (currentPage: number, pageSize: number) => {
    return request.get(`/bill/${currentPage}/${pageSize}`)
}
/**
 * 获取待审核的账单
 */
export const getPendingInvoice = () => {
    return request.get(`/bill/pendingReview`)
}
/**
 * 根据id获取账单信息
 * @param id 账单id
 */
export const getBillById = (id: string) => {
    return request.get(`/bill/${id}`)
}
/**
 * 更新账单信息
 * @param data 对象，id：账单id，status：账单审核状态，remarks：账单备注
 */
export const updateBillInfo = (data: { id: string, status: number, remarks?: string }) => {
    return request.put(`/bill`, data)
}
/**
 * 分页获取用户
 * @param currentPage 当前页
 * @param pageSize 每页显示的条数
 */
export const getUser = (currentPage: number, pageSize: number) => {
    return request.get(`/user/${currentPage}/${pageSize}`)
}

