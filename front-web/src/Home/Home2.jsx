import React, { useEffect } from "react";
import { Grid, Container, useMediaQuery } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";

function Home2() {  
  const isMobile = useMediaQuery("(max-width: 1279px)")

  const subtitle = {
    subTitle: {
      textAlign: 'center',
      fontSize: '100px',
      wordBreak: 'keep-all', 
      marginBottom: '350px'
    },

    mobileSubTitle: {
      textAlign: 'center',
      fontSize: '7vw',
      wordBreak: 'keep-all', 
      marginBottom: '30vh'
    }
  }

  const image = {
    web: {
      maxWidth: '400px',
      maxHeight: '300px',
    },

    mobile: {
      width: '100%',
      height: '100%',
    }
  }

  const content = {
    web: {
      marginLeft: '0',
      marginRight: '0',
      marginBottom: '40px',
    },
    mobile: {
      marginLeft: '0',
      marginRight: '0',
      marginBottom: '10vw'
    }
  }

  const context = {
    web: {
      fontSize: '20px',
      textAlign: 'start',
      marginLeft: '0',
      height: '300px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },

    mobile: {
      fontSize: '20px',
      textAlign: 'center',
      marginLeft: '0',
      margin: '0',
    }
  }  

  const contextText = {
    web: {
      fontSize: '30px',
    },

    mobile: {
      fontSize: '5vw',
    }
  }

  const contextBold = {
    web: {
      fontSize: '40px',
      fontWeight: 'bolder',
    },

    mobile: {
      fontSize: '6vw',
      fontWeight: 'bolder',
    }
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
        style={ isMobile? subtitle.mobileSubTitle :  subtitle.subTitle }
      >
        우리는 이런 생각을 했습니다
      </div>
      <Grid container
        style={!isMobile ? content.web : content.mobile }
        justifyContent='space-between'
        data-aos="fade-right"
        direction={ !isMobile ? 'row' : 'column'}
        alignItems='center'
        spacing={ !isMobile ? 2 : 0 }
      >
        <Grid
          style={{
            paddingLeft: 0,
            display: 'inline-block',
          }}
        >
          <img
          style={ !isMobile ? image.web : image.mobile }
          src={`${process.env.PUBLIC_URL}/img/HomeTalk.jpg`} alt="" />
        </Grid>

        <Grid
          item
          style={ !isMobile ? context.web : context.mobile }
          spacing={ !isMobile ? 0 : 2}
        >
          <div
            style={ !isMobile ? contextText.web : contextText.mobile }
          >
            <div
              style={ !isMobile ? contextBold.web : contextBold.mobile }
            >
              우리는 사회적 동물입니다
            </div>
            <span>우리는 언제나 공통된 관심사에 대해<br /></span>
            <span>다른 사람과 정보를공유하고 싶어합니다 <br /></span>
            <span
              style={ !isMobile ? contextBold.web : contextBold.mobile }
            >이번에는 운동입니다</span>
          </div>
        </Grid>
      </Grid>
      
      <Grid container
        style={!isMobile ? content.web : content.mobile }
        justifyContent='space-between'
        data-aos="fade-left"
        direction={ !isMobile ? 'row' : 'column-reverse'}
        alignItems='center'
        spacing={ !isMobile ? 2 : 0 }
      >

        <Grid
          item
          style={ !isMobile ? context.web : context.mobile }
        >
          <div
            style={ !isMobile ? contextText.web : contextText.mobile }
          >
            <div
              style={ !isMobile ? contextBold.web : contextBold.mobile }
            >
              우리는 함께 할 때 더 성장합니다
            </div>
            <span>혼자 운동하다 보면 지루하거나<br /></span>
            <span>다른 사람의 도움이 필요한 순간이 존재합니다 <br /></span>
            <span
              style={ !isMobile ? contextBold.web : contextBold.mobile }
            >나와에서 나와 메이트를 찾아보세요</span>
          </div>
        </Grid>
        
        <Grid
          style={{
            paddingLeft: 0,
            display: 'inline-block',
          }}
        >
          <img
          style={ !isMobile ? image.web : image.mobile }
          src={`${process.env.PUBLIC_URL}/img/HomeTalk2.jpg`} alt="" />
        </Grid>

      </Grid>

      <Grid container
        style={!isMobile ? content.web : content.mobile }
        justifyContent='space-between'
        data-aos="fade-right"
        direction={ !isMobile ? 'row' : 'column'}
        alignItems='center'
        spacing={ !isMobile ? 2 : 0 }
      >

        <img
        style={ !isMobile ? image.web : image.mobile }
        src={`${process.env.PUBLIC_URL}/img/HomeTalk3.jpg`} alt="" />


        <Grid
          item
          style={ !isMobile ? context.web : context.mobile }
        >
          <div
            style={ !isMobile ? contextText.web : contextText.mobile }
          >
            <div
              style={ !isMobile ? contextBold.web : contextBold.mobile }
            >
              운동은 땀만 흘리는 것만이 {isMobile ? <br/> : <></>} 운동이 아닙니다
            </div>
            <span>혼자 다니던 산책, 러닝 경로를<br /></span>
            <span>새로운 사람들과 함께 공유해보세요 <br /></span>
            <span
              style={ !isMobile ? contextBold.web : contextBold.mobile }
            >인연을 만나고 즐거운 시간을 보내세요</span>
          </div>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home2