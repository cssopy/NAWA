import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbartop from './router/Navbar';
import Home from './router/Home';
import Intro from "./router/Intro";
import Contact from "./router/Contact";
import Login from "./router/Login";
import Sigup from './router/Signup'
import ScrollToTop from "react-scroll-to-top";

function App() {
    return (
        <BrowserRouter>
            <Navbartop />
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/intro' element={<Intro />} />
                <Route exact path='/contact' element={<Contact />} />
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/signup' element={<Sigup />} />
            </Routes>
            <ScrollToTop
              smooth
              color="beige"
              style={{
                backgroundColor: 'violet',
              }}
            />
        </BrowserRouter>
    )
}

export default App;