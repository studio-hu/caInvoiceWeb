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
    return request.post(`/email/checkVerificationCode`, data, {headers: {'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'}})
}