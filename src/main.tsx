import ReactDOM from 'react-dom/client'
// 样式格式化
import "rest-css";
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import zhCN from 'antd/locale/zh_CN';
import {ConfigProvider} from "antd";
import {Provider} from "react-redux";
import store from "./store";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
        <ConfigProvider locale={zhCN}>
            <Provider store={store}>
            <App/>
            </Provider>
        </ConfigProvider>
    </BrowserRouter>
)
