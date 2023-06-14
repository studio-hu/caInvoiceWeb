import {lazy} from "react";
import * as React from "react";
import Loading from "../components/Loading/Loading.tsx";
import NeedUserToken from "../components/NeedUserToken/NeedUserToken.tsx";

const Container = lazy(() => import("../components/Container/Container.tsx"))
const Login = lazy(() => import("../pages/Login/Login.tsx"))
const Register = lazy(() => import("../pages/Register/Register.tsx"))
const Menu = lazy(() => import("../pages/Menu/Menu.tsx"))
const PersonalCenter = lazy(() => import("../pages/PersonalCenter/PersonalCenter.tsx"))
const InvoiceForReimbursement = lazy(() => import("../pages/InvoiceForReimbursement/InvoiceForReimbursement.tsx"))
const Admin = lazy(() => import("../components/Admin/Admin.tsx"))
const Home = lazy(() => import("../pages/adminPages/Home/Home.tsx"))
const InvoiceAll = lazy(() => import("../pages/adminPages/InvoiceList/InvoiceList.tsx"))
const InvoiceReview = lazy(() => import("../pages/adminPages/InvoiceReview/InvoiceReview.tsx"))
const User = lazy(() => import("../pages/adminPages/User/User.tsx"))
const TagUser = lazy(() => import("../pages/adminPages/TagUser/TagUser.tsx"))
const TagInvoice = lazy(() => import("../pages/adminPages/TagInvoice/TagInvoice.tsx"))


type RoutersItems = {
    index?: boolean,
    path?: string;
    element?: React.ReactElement | React.LazyExoticComponent<any>;
    children?: RoutersItems[];
};
const routers: RoutersItems[] = [
    {
        path: "/",
        element: <NeedUserToken><Container/></NeedUserToken>,
        children: [
            {
                index: true,
                // path:'menu',
                element: <Menu/>
            },
            {
                path: 'PersonalCenter',
                element: <PersonalCenter/>
            },
            {
                path: 'InvoiceForReimbursement',
                element: <InvoiceForReimbursement/>
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
        path:"/admin",
        element:<Admin/>,
        children:[
            {
                index: true,
                element: <Home/>
            },
            {
                path: "invoiceAll",
                element: <InvoiceAll/>
            },
            {
              path: "InvoiceReview",
              element: <InvoiceReview/>
            },
            {
                path: "user",
                element: <User/>
            },
            {
                path: "tagUser",
                element: <TagUser/>
            },
            {
                path: "tagInvoice",
                element: <TagInvoice/>
            }
        ]
    },
    {
        path: "/loading",
        element: <Loading/>
    }

]

export default routers