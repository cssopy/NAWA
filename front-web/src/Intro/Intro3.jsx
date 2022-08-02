import React from "react";
import Stack from '@mui/material/Stack';
import { Container } from "@mui/material";

function Intro3 () {
  const styles = {
    width: "200px",
    height: "200px",
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
          style={styles}
          src={`${process.env.PUBLIC_URL}/img/Intro/tech_stack/java.png`} alt="java" />

        <img
          style={styles}
          src={`${process.env.PUBLIC_URL}/img/Intro/tech_stack/spring.png`} alt="java" />
        
        <img
        style={styles}
        src={`${process.env.PUBLIC_URL}/img/Intro/tech_stack/tomcat.png`} alt="java" />
        
        <img
        style={styles}
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
          style={styles}
          src={`${process.env.PUBLIC_URL}/img/Intro/tech_stack/react.png`} alt="react & react-native" />

        
        <img
        style={styles}
        src={`${process.env.PUBLIC_URL}/img/Intro/tech_stack/js.png`} alt="javascript" />
        
        <img
        style={styles}
        src={`${process.env.PUBLIC_URL}/img/Intro/tech_stack/ts.png`} alt="typescript" />
      </Stack>
    </Container>
  )
}

export default Intro3