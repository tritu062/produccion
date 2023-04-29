import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as Icons from "react-icons/fa";
import "./Navbar.css";
import { navItems } from "./NavItems";
import Button from "./Button";
import Dropdowns from "./Dropdowns";
import Dropdownc from "./Dropdownc";
import Dropdowna from "./Dropdowna";
import "./main.css";

function Navbar() {
  const [dropdownc, setDropdownc] = useState(false);
  const [dropdowns, setDropdowns] = useState(false);
  const [dropdowna, setDropdowna] = useState(false);
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header>
      <Link to="/" className="navbarr-logo">
        Reportes
        <Icons.FaDesktop />
      </Link>
      <nav ref={navRef}>
        <ul className="nav-itemss">
          {navItems.map((item) => {
            if (item.title === "Conexiones") {
              return (
                <li
                  key={item.id}
                  className={item.cName}
                  onMouseEnter={() => setDropdownc(true)}
                  onMouseLeave={() => setDropdownc(false)}
                >
                  <Link to={item.path}>{item.title}</Link>
                  {dropdownc && <Dropdowns />}
                </li>
              );
            } else if (item.title === "Evaluación Docente") {
              return (
                <li
                  key={item.id}
                  className={item.cName}
                  onMouseEnter={() => setDropdowns(true)}
                  onMouseLeave={() => setDropdowns(false)}
                >
                  <Link to={item.path}>{item.title}</Link>
                  {dropdowns && <Dropdownc />}
                </li>
              );
            } else if (item.title === "Accesos a Moodle") {
              return (
                <li
                  key={item.id}
                  className={item.cName}
                  onMouseEnter={() => setDropdowna(true)}
                  onMouseLeave={() => setDropdowna(false)}
                >
                  <Link to={item.path}>{item.title}</Link>
                  {dropdowna && <Dropdowna />}
                </li>
              );
            }
            return (
              <li key={item.id} className={item.cName}>
                <Link to={item.path}>{item.title}</Link>
              </li>
            );
          })}
        </ul>
        <Button />
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}

export default Navbar;
