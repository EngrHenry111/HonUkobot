import "./Footer.css";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaLinkedinIn
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-content">

        <h2>
          HON. NSIKANABASI UKOBOT
        </h2>

        <p className="footer-title">
  Former Transition Chairman & Former Vice Chairman,
  Ibiono Ibom Local Government Area
</p>

        {/* QUICK LINKS */}
        <div className="footer-links">

          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/leadership">Leadership</a>
          <a href="/achievements">Achievements</a>
          <a href="/education">Education</a>
          <a href="/skills">Skills</a>
          <a href="/gallery">Gallery</a>
          <a href="/news">News</a>

        </div>

        {/* SOCIAL ICONS */}
        <div className="social-icons">

          <a href="#" className="icon facebook">
            <FaFacebookF />
          </a>

          <a href="#" className="icon instagram">
            <FaInstagram />
          </a>

          <a href="#" className="icon youtube">
            <FaYoutube />
          </a>

          <a href="#" className="icon tiktok">
            <FaTiktok />
          </a>

          <a href="#" className="icon linkedin">
            <FaLinkedinIn />
          </a>

        </div>

      </div>

      <div className="footer-bottom">

        <p>
          © {new Date().getFullYear()}
          {" "}
          HON. NSIKANABASI UKOBOT
          All Rights Reserved.
        </p>

        <p>
          Developed by
          {" "}
          <span>EngrHenryTech</span>
        </p>

      </div>

    </footer>
  );
};

export default Footer;