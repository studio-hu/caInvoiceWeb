import styles from "./Menu.module.scss"
import {AccountBookFilled,CalendarFilled} from "@ant-design/icons"
import {message} from "antd";

function Menu() {
    const developing=():void=>{
        message.warning("此模块开发中...")
    }
    return (
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1 className={styles.title}>菜单</h1>
                    <div className={styles.menu}>
                        <div className={styles.menuItem}>
                            <div className={styles.itemImg}>
                                <div className={styles.itemImgInside}>
                                    <AccountBookFilled />
                                </div>
                            </div>
                            <div className={styles.detail}>
                                <div className={styles.detailTitle}>发票报销</div>
                                <div className={styles.detailDesc}>电子产品、办公用品、活动支出、滴滴打出等</div>
                            </div>
                        </div>
                        <div className={styles.menuItem} onClick={developing}>
                            <div className={styles.itemImg}>
                                <div className={styles.itemImgInside}>
                                    <CalendarFilled />
                                </div>
                            </div>
                            <div className={styles.detail}>
                                <div className={styles.detailTitle}>无课表生成</div>
                                <div className={styles.detailDesc}>可一键生成无课表</div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

    );
}


export default Menu;