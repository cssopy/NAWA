import React from "react";
import Stack from '@mui/material/Stack';
import { Container, useMediaQuery } from "@mui/material";

function Intro3 () {
  const isMobile = useMediaQuery("(max-width: 1279px)")

  const styles = {
    web: {
      width: "200px",
      height: "200px",
    },

    mobile: {
      width: '15vw',
      height: '15vw',
    }
  }
  
  return (
    <Container
      style={{
        marginBottom: '100px'
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        style={{
          justifyContent: 'center',
        }}
      >
        <img
          style={ isMobile ? styles.mobile : styles.web}
          src={`${process.env.PUBLIC_URL}/img/Intro/tech_stack/java.png`} alt="java" />

        <img
          style={ isMobile ? styles.mobile : styles.web}
          src={`${process.env.PUBLIC_URL}/img/Intro/tech_stack/spring.png`} alt="java" />
        
        <img
        style={ isMobile ? styles.mobile : styles.web}
        src={`${process.env.PUBLIC_URL}/img/Intro/tech_stack/tomcat.png`} alt="java" />
        
        <img
        style={ isMobile ? styles.mobile : styles.web}
        src={`${process.env.PUBLIC_URL}/img/Intro/tech_stack/mysql.png`} alt="java" />
      </Stack>
      <br />
      <Stack
        direction="row"
        spacing={2}
        style={{
          justifyContent: 'center',
        }}
      >
        <img
        style={ isMobile ? styles.mobile : styles.web}
        src={`${process.env.PUBLIC_URL}/img/Intro/tech_stack/react.png`} alt="react & react-native" />
        
        <img
        style={ isMobile ? styles.mobile : styles.web}
        src={`${process.env.PUBLIC_URL}/img/Intro/tech_stack/js.png`} alt="javascript" />
        
        <img
        style={ isMobile ? styles.mobile : styles.web}
        src={`${process.env.PUBLIC_URL}/img/Intro/tech_stack/ts.png`} alt="typescript" />
      </Stack>
    </Container>
  )
}

export default Intro3