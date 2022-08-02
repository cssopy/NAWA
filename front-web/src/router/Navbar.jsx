import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Navbartop() {
  const style = {
      padding: "0 10px",
      textDecorationLine: "none",
      color: "white",
      fontSize: "20px",
  }

  return (
  <Navbar
    style={{
        backgroundColor: '#A0A1A4',
    }}
  >
    <Container>
      <Link to="/" style={style}>
        <Navbar.Brand>
          <img
            src="img/nawa_white.png"
            alt="nawalogo"
            style={{
              width: "60px",
              height: "40px",
            }}
          />
        </Navbar.Brand>
      </Link>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Link to="/" style={style}>
          <Nav>HOME</Nav>
        </Link>
        <Link to="/intro" style={style}>
          <Nav>ABOUT US</Nav>
        </Link>
        <Link to="/contact" style={style}>
          <Nav>CONTACT</Nav>
        </Link>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}

export default Navbartop;