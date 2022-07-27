import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbartop from './pages/Navbar';
import Home from './pages/Home';
import Intro from "./pages/Intro";
import Issue from "./pages/Issue";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import SignUp from './pages/Signup'

function App() {
    return (
        <BrowserRouter>
            <Navbartop />
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/intro' element={<Intro />} />
                <Route exact path='/issue' element={<Issue />} />
                <Route exact path='/contact' element={<Contact />} />
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/signup' element={<SignUp />} />
            </Routes>
        </BrowserRouter>

    )
}

export default App;