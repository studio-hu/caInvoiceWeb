import {useRoutes} from "react-router-dom";
import routers from "./router";
import {Suspense} from "react";
import Loading from "./components/Loading/Loading.tsx";

function App() {
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
    const routes = useRoutes(routers);
    return (
        <div>
            <Suspense fallback={<Loading/>}>
                {routes}
            </Suspense>
        </div>
    );
}

export default App;