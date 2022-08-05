import React, { useEffect } from "react";
import Styles from '../css/web.module.css'
import AOS from "aos";
import "aos/dist/aos.css"

function Home3 () {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  })

  return (
    <div
      id="download"
      className={Styles.downloadbg}
    >
      <div className={Styles.content} data-aos="zoom-in">
        <span
          style={{
            fontSize: '80px',
            fontWeight: 'bolder',
            color: '#FF6F61',
          }}
        >나와</span>
        <span>우리 모두를 위한</span>
        <span>새로운 연결 수단</span>
      </div>
    </div>
  )
}

export default Home3