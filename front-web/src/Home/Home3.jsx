import React, { useEffect } from "react";
import Styles from '../css/web.module.css'
import AOS from "aos";
import "aos/dist/aos.css"
import { useMediaQuery } from "@mui/material";

function Home3 () {
  const isMobile = useMediaQuery("(max-width: 1279px)")

  const imgSize = {
    web: {
      width: 'auto',
      height: '700px',
      textAlign: 'center',
    },

    mobile: {
      width: 'auto',
      height: '80vw',
      textAlign: 'center',
    }
  }

  const titleOp = {
    web: {
      fontSize: '80px',
      fontWeight: 'bolder',
      color: '#FF6F61',
    },

    mobile: {
      fontSize: '15vw',
      fontWeight: 'bolder',
      color: '#FF6F61',
    }
  }

  const contentOp = {
    web: {
      fontSize: '60px',
      color: '#F2A1CE',
    },

    mobile: {
      fontSize: '6vw',
      color: '#F2A1CE',
    }
  }

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  })

  return (
    <div
      id="download"
      className={Styles.downloadbg}
      style={ isMobile ? imgSize.mobile : imgSize.web }
    >
      <div className={Styles.content} data-aos="zoom-in">
        <span
          style={ isMobile ? titleOp.mobile : titleOp.web }
        >나와</span>
        <span style={ isMobile ? contentOp.mobile : contentOp.web }>우리 모두를 위한</span>
        <span style={ isMobile ? contentOp.mobile : contentOp.web }>새로운 연결 수단</span>
      </div>
    </div>
  )
}

export default Home3