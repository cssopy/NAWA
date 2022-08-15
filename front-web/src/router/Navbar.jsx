import { useMediaQuery } from '@mui/material';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Navbartop() {
  const isMobile = useMediaQuery("(max-width: 1279px)")

  const style = {
    padding: "0 10px",
    textDecorationLine: "none",
    color: "white",
    fontSize: "25px",
  }

  const mobileStyle = {
    padding: "0 2vw",
    textDecorationLine: "none",
    color: "white",
    fontSize: "3vw",
  }

  const imgSize = {
    web: {
      width: '60px',
      height: '40px',
    },
    mobile: {
      width: "6vw",
      height: "4vw",
    }
  }

  return (
  <Navbar
    style={{
        backgroundColor: '#A0A1A4',
    }}
  >
    <Container
      fluid = { isMobile? true : false}
      style={ isMobile ? {margin: 0, display: 'flex', justifyContent: 'flex-end'} : {margin: 'auto'}}
    >
      <Link to="/" style={isMobile? mobileStyle : style}>
        <Navbar.Brand>
          <img
            src="img/nawa_white.png"
            alt="nawalogo"
            style={ isMobile ? imgSize.mobile : imgSize.web }
          />
        </Navbar.Brand>
      </Link>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Link to="/" style={isMobile? mobileStyle : style}>
          <Nav>HOME</Nav>
        </Link>
        <Link to="/intro" style={isMobile? mobileStyle : style}>
          <Nav>ABOUT US</Nav>
        </Link>
        <Link to="/contact" style={isMobile? mobileStyle : style}>
          <Nav>CONTACT</Nav>
        </Link>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}

export default Navbartop;