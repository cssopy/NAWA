import React, { useEffect } from "react";
import { Grid, Container } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";

function Home2() {
  const style = {
    width: '400px',
    height: '300px',
  }

  const style2 = {
    marginBottom: '100px',
    paddingLeft: '0',
    marginRight: 'auto',
  }

  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  })

  return (
    <Container
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '100px',
      }}
    >
      <div
        // eslint-disable-next-line
        style={style2, {textAlign: 'center', fontSize: '80px', marginBottom: '50px'}}
      >
        우리는 이런 생각을 했습니다
      </div>
      <Grid container
        style={style2}
        data-aos="fade-right"
      >
        <Grid
          item
          xs={5}
          style={{
            paddingLeft: 0,
            display: 'inline-block',
          }}
          >
          <img
          style={style}
          src={`${process.env.PUBLIC_URL}/img/HomeTalk.jpg`} alt="" />
        </Grid>

        <Grid
          item
          style={{
            fontSize: '20px',
            textAlign: 'start',
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
            height: '300px'
          }}
        >
          <div
          >
            <div
              style={{
                fontSize: '50px',
                fontWeight: 'bolder',
              }}
            >
              우리는 사회적 동물입니다
            </div>
            <br />
            <span>우리는 언제나 공통된 관심사에 대해<br /></span>
            <span>다른 사람과 정보를공유하고 싶어합니다 <br /></span>
            <span
              style={{
                fontWeight: 'bolder',
                fontSize: '30px'
              }}
            >이번에는 운동입니다</span>
          </div>
        </Grid>
      </Grid>
      
      <Grid container
        style={style2}
        data-aos="fade-left"
      >
        <Grid
          item
          xs={6}
          style={{
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 0,
            height:'300px',
          }}
        >
          <div
            style={{
              textAlign: 'end'
            }}
          >
            <div
              style={{
                fontSize: '50px',
                fontWeight: 'bolder',
              }}
            >
              우리는 함께 할 때 <br />더 성장합니다
            </div>
            <br />
            <span>혼자 운동하다 보면 지루하거나<br /></span>
            <span>다른 사람의 도움이 필요한 순간이 존재합니다<br /></span>
            <span
              style={{
                fontWeight: 'bolder',
                fontSize: '30px'
              }}
            >나와에서 나와 메이트를 찾아보세요</span>
          </div>
        </Grid>
        <Grid
          item
          xs={6}
          style={{
            paddingLeft: 0,
            display: 'flex',
            justifyContent: 'end',
          }}
        >
          <img
          style={style}
          src={`${process.env.PUBLIC_URL}/img/HomeTalk2.jpg`} alt="" />
        </Grid>
      </Grid>

      <Grid container
        style={style2}
        data-aos="fade-right"
      >
        <Grid
          item
          xs={5}
          style={{
            paddingLeft: 0,
            display: 'inline-block',
          }}
          >
          <img
          style={style}
          src={`${process.env.PUBLIC_URL}/img/HomeTalk3.jpg`} alt="" />
        </Grid>

        <Grid
          item
          style={{
            fontSize: '20px',
            textAlign: 'start',
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
            height: '300px'
          }}
        >
          <div
          >
            <div
              style={{
                fontSize: '50px',
                fontWeight: 'bolder',
              }}
            >
              운동은 땀만 흘리는 것만이 <br />운동이 아닙니다
            </div>
            <br />
            <span>혼자 다니던 산책, 러닝 경로를<br /></span>
            <span>새로운 사람들과 함께 공유해보세요<br /></span>
            <span
              style={{
                fontWeight: 'bolder',
                fontSize: '30px'
              }}
            >인연을 만나고 즐거운 시간을 보내세요</span>
          </div>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home2