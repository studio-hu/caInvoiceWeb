import {useSelector} from "react-redux"
import {Navigate, useLocation} from "react-router-dom";


function NeedUserToken(props: any) {
    const {user}: any = useSelector(state => state)
    const location = useLocation()
    return user.token && user.username ? props.children :
        <Navigate to={'/login'} replace state={{preLocation: location.pathname}}/>
}

export default NeedUserToken;