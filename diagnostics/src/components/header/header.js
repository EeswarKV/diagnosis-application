import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import "./header.css";
import Hamburger from 'hamburger-react'
import {
  BrowserRouter as Router,
  Link,
  Route,
} from "react-router-dom";

export default function Header() {
  const [click, setClick] = useState(false);
  const closeMobileMenu = () => setClick(false);

  return (
    <div className="header">
      <div className="logo-nav">
        <div className="logo-container">
            <Link to="/"><img src={logo} className="logo" alt="logo" onClick={closeMobileMenu}/> </Link>
        </div>
      </div>
      <ul className={click ? "nav-options active" : "nav-options"}>
        <li className="sign-in" onClick={closeMobileMenu}>
          <Link to="/">Home </Link>
        </li>
        <li className="sign-in" onClick={closeMobileMenu}>
          <Link to="/history">History </Link>
        </li>
      </ul>
      <Hamburger toggled={click} toggle={setClick} />
    </div>
  );
}
