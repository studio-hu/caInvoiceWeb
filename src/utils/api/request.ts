import axios from "axios";
import config from "./config.ts";

const instance = axios.create({
    baseURL: config.BASE_URL,
    timeout: config.TIMEOUT,
});

export default instance