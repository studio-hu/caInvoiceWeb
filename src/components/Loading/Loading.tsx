import "./Loading.css"

function Loading() {
    return (
        <div className="loading">
            {/*<div>加载中。。。。</div>*/}
            <div>
                <div className="multi-spinner-container">
                    <div className="multi-spinner">
                        <div className="multi-spinner">
                            <div className="multi-spinner">
                                <div className="multi-spinner">
                                    <div className="multi-spinner">
                                        <div className="multi-spinner">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Loading;