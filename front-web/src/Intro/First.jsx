import React from "react";
import Styles from "../css/header.module.css"

function First() {
    return (
        <div className={Styles.introbackground}>
            <div className={Styles.content}>
                <span>팀원 소개</span>
            </div>
        </div>
    )
}

export default First