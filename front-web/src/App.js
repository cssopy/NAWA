import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbartop from './router/Navbar';
import Home from './router/Home';
import Intro from "./router/Intro";
import Contact from "./router/Contact";
import Login from "./router/Login";
import Sigup from './router/Signup'
import ScrollToTop from "react-scroll-to-top";
import { useMediaQuery } from "@mui/material";

function App() {
  const isMobile = useMediaQuery("(max-width: 1279px)")

  // 새로고침 시 스크롤을 맨 위로 올리게 하는 effect
  // 추후 새로고침해도 변경이 일어나지 않게 하려면 여길 없애면 된다
  useEffect(() => {
    window.onbeforeunload = function pushRefresh() {
      window.scrollTo(0, 0);
    };
  }, []);

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
          style={ isMobile ? {display: 'none'} : { backgroundColor: 'violet' }}
        />
    </BrowserRouter>
  )
}

export default App;