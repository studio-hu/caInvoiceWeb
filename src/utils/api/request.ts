import axios from "axios";
import config from "./config.ts";

const instance = axios.create({
    baseURL: config.BASE_URL,
    timeout: config.TIMEOUT,
});
instance.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    // console.log(token)
    config.headers.Authorization = token;
    return config;
}, err => {
    // 请求失败的时候执行
    return Promise.reject(err)
})
instance.interceptors.response.use(response => {
        // console.log("response", response)
        // 后端返回数据的时候执行
        // res:是本次的响应对象
        // res.data：是后端给我们的真正数据
        //console.log("响应拦截器中的res", res);
        // 以后拿数据就可以直接获取到res.data了，不需要每次拿数据都写res.data
        return response.data
    }, error => {
        console.log("error", error)
        return Promise.reject(error);
    }
)


export default instance