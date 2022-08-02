import React from "react";
import Styles from "../css/web.module.css";
import Button from '@mui/material/Button';

function Home1() {
  return (
    <div
      className={Styles.firstbg}
      style={{
        marginBottom: '100px'
      }}
    >
      <div>
        <video
            src="video/HomeVideo.mp4"
            type="video/mp4"
            autoPlay
            muted
            loop
        />
      </div>
      <div className={Styles.text}>
        <span>운동과 만남<br /></span>
        <span>나와에서<br /></span>
        <span
            style={{
                fontSize: '100px',
                color: '#FF6F61 ',
            }}
        >나와 함께 <br /></span>
          <Button
            size="large"
            variant="contained"
            href="#download"
            style={{
                backgroundColor: '#BEA9DF',
                fontSize: '20px'
            }}
          >
              바로 다운로드하기
          </Button>
      </div>
    </div>
  )
}

export default Home1