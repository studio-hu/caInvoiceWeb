import {lazy} from "react";
import * as React from "react";
import Loading from "../components/Loading/Loading.tsx";

const Container = lazy(() => import("../components/Container/Container.tsx"))
const Login = lazy(() => import("../pages/Login/Login.tsx"))
const Register = lazy(() => import("../pages/Register/Register.tsx"))
const Menu = lazy(() => import("../pages/Menu/Menu.tsx"))


type RoutersItems = {
    index?: boolean,
    path?: string;
    element?: React.ReactElement | React.LazyExoticComponent<any>;
    children?: RoutersItems[];
};
const routers: RoutersItems[] = [
    {
        path:"/",
        element:<Container/>,
        children:[
            {
                index:true,
                element:<Menu/>
            }
        ]
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/register",
        element: <Register/>
    },
    {
        path:"/loading",
        element:<Loading/>
    }

]

export default routers