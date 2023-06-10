import ReactDOM from 'react-dom/client'
// 样式格式化
import "rest-css";
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import zhCN from 'antd/locale/zh_CN';
import {ConfigProvider} from "antd";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
        <ConfigProvider locale={zhCN}>
            <App/>
        </ConfigProvider>
    </BrowserRouter>
)
