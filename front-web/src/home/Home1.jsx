import React from "react";
import Styles from "../css/header.module.css";

function Home1() {
    // const homeImg = 'img/HomeImg.png'

    return (
        <div className={Styles.backgroundWrap}>
            {/* <img className={Styles.backgroundWrap} src={homeImg} alt="운동" /> */}
            <div className={Styles.content}>
                <span>운동과 만남</span>
                <span>나와에서 나와 함께</span>
            </div>
        </div>
    )
}

export default Home1