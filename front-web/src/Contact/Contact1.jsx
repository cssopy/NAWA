import React from "react";
import Styles from '../css/contact.module.css';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function Contact1 () {
  
  return (
    <div className={Styles.contactbackground}>
      <Container className={Styles.content}>
        <div>Contact</div>
        <br />
        <span>저희 제품에 대해 제안할 아이디어나</span>
        <br />
        <span>불편 사항, 기타 사항 등을 언제든지 문의해주세요</span>
        <div style={{ padding: '10px'}}></div>
        <Stack spacing={2} direction="row">
          <div>
            <Button href="#contact" variant="contained" size="large" style={{ fontSize: '20px'}}>CONTACT</Button>
          </div>
          <Link to="/">
            <Button variant="contained" color="secondary" size="large" style={{ fontSize: '20px'}}>BACK TO HOMEPAGE</Button>
          </Link>
        </Stack>
      </Container>
    </div>
  )
}

export default Contact1