import React from "react";
import Styles from "../css/intro.module.css"

function Intro1() {
  return (
    <div 
      className={Styles.introbackground}
      style={{
        marginBottom: "100px",
      }}
    >
      <div className={Styles.content}>Intro</div>
    </div>
  )
}

export default Intro1