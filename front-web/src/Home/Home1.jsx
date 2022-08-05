import React from "react";
import Styles from "../css/web.module.css";
import Button from '@mui/material/Button';
import { useMediaQuery } from "@mui/material";

function Home1() {
  const isMobile = useMediaQuery("(max-width: 1279px)")

  return (
    <div
      className={Styles.firstbg}
      style={!isMobile ? {
        marginBottom: '350px'
      } : {
        marginBottom: '30vh'
      }}
    >
      <div>
        <video
            src="video/HomeVideo2.mp4"
            type="video/mp4"
            autoPlay
            muted
            loop
        />
      </div>
      <div className={Styles.text} >
        <span
          style={!isMobile? {} : {fontSize: '6vw'}}
        >
          운동과 만남<br />
          </span>
        <span
          style={!isMobile? {} : {fontSize: '6vw'}}
        >
          나와에서<br />
          </span>
        <span
          style={!isMobile ? {
            fontSize: '100px',
            color: '#FF6F61 ',
          } : {
            color: 'FF6F61',
            fontSize: '10vw',
          }}
        >나와 함께 <br /></span>
          <Button
            size="large"
            variant="contained"
            href="#download"
            style={!isMobile ? {
              backgroundColor: '#BEA9DF',
              fontSize: '20px'
            } : {
              backgroundColor: 'BEA9DF',
              fontSize: '2vw'
            }}
          >
              바로 다운로드하기
          </Button>
      </div>
    </div>
  )
}

export default Home1