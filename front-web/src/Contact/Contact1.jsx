import React from "react";
import Styles from '../css/contact.module.css';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useMediaQuery } from "@mui/material";

function Contact1 () {
  const isMobile = useMediaQuery("(max-width: 1279px)");

  const mobileBg = {
    width: 'auto',
    height: '50vh',
  }

  const titleFont = {
    web: {
      fontSize: '50px'
    },
    mobile: {
      fontSize: '10vw'
    }
  }

  const contentFont = {
    web: {
      fontSize: '25px'
    },
    mobile: {
      fontSize: '4vw'
    }
  }

  const mobileMid = {
    textAlign: 'center'
  }
  
  return (
    <div className={Styles.contactbackground} style={ isMobile ? mobileBg : {}}>
      <Container
        className={Styles.content}
        style={ isMobile ? mobileMid : {}}
      >
        <div
          style={ isMobile ? titleFont.mobile : titleFont.web}
        >Contact</div>
        <span
          style={ isMobile ? contentFont.mobile : contentFont.web}
        >저희 제품에 대해 제안할 아이디어나</span>
        <br />
        <span
          style={ isMobile ? contentFont.mobile : contentFont.web}
        >불편 사항, 기타 사항 등을 언제든지 문의해주세요</span>
        <div style={{ padding: '10px'}}></div>
        <Stack spacing={2} direction="row" justifyContent={ isMobile ? 'center' : 'flex-start'}>
          <div>
            <Button
              href="#contact"
              variant="contained"
              size={ !isMobile ? "large" : 'middle'}
              style={ !isMobile ? { fontSize: '20px'} : {fontSize: '3vw'}}
            >CONTACT</Button>
          </div>
          <Link to="/">
            <Button
              variant="contained"
              color="secondary"
              size={ !isMobile ? "large" : 'middle'}
              style={ !isMobile ? { fontSize: '20px'} : {fontSize: '3vw'}}
            >BACK TO HOMEPAGE</Button>
          </Link>
        </Stack>
      </Container>
    </div>
  )
}

export default Contact1