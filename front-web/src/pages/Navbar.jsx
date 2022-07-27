import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Navbartop() {
    const style = {
        padding: "0 5px",
        textDecorationLine: "none",
        color: "black",
        fontSize: "20px",
    }

    return (
    <Navbar style={{ border: "1px solid black" }}>
        <Container>
        <Navbar.Brand
            style={{ fontSize: "30px" }}
        >나와</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
            <Link to="/" style={style}>
                <Nav>HOME</Nav>
            </Link>
            <Link to="/intro" style={style}>
                <Nav>ABOUT US</Nav>
            </Link>
            <Link to="/issue" style={style}>
                <Nav>ISSUE</Nav>
            </Link>
            <Link to="/contact" style={style}>
                <Nav>CONTACT</Nav>
            </Link>
            <Link to="/login" style={style}>
                <Nav>LOGIN</Nav>
            </Link>
            <Link to="/signup" style={style}>
                <Nav>SIGNUP</Nav>
            </Link>
        </Navbar.Collapse>
        </Container>
    </Navbar>
    );
}

export default Navbartop;