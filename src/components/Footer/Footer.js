
import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} The Compiler Corporation. All Rights Reserved.</p>
      <p>
        <a href="/about">About</a> | 
        <a href="/contact">Contact</a> | 
        <a href="/projects">Projects</a>
      </p>
    </footer>
  );
}

export default Footer;
