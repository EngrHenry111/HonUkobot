import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/ukobotphoto.png";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">

      {/* BRAND SECTION */}
      <div className="brand">

        <img
          className="brand-logo"
          src={logo}
          alt="RT. HON. ASUAKAK UDO UMOH"
        />

        <div className="brand-text">
          <h3>HON. NSIKANABASI UKOBOT</h3>
          <span>
            Former Transition Chairman & Former Vice Chairman,
            Ibiono Ibom LGA
          </span>
        </div>

      </div>

      {/* HAMBURGER */}
      <div
        className={`hamburger ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* NAVIGATION */}
      <div className={`links ${isOpen ? "open" : ""}`}>

        <NavLink to="/" onClick={closeMenu}>
          Home
        </NavLink>

        <NavLink to="/about" onClick={closeMenu}>
          About
        </NavLink>

        <NavLink to="/leadership" onClick={closeMenu}>
          Leadership
        </NavLink>

        <NavLink to="/achievements" onClick={closeMenu}>
          Achievements
        </NavLink>

        <NavLink to="/education" onClick={closeMenu}>
          Education
        </NavLink>

        <NavLink to="/skills" onClick={closeMenu}>
          Skills
        </NavLink>

        <NavLink to="/gallery" onClick={closeMenu}>
          Gallery
        </NavLink>

        <NavLink to="/news" onClick={closeMenu}>
          News
        </NavLink>

      </div>

    </nav>
  );
};

export default Navbar;