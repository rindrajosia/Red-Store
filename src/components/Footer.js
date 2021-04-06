import React from 'react';
import Logo from '../assets/images/logo-white.png';

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-col-2">
        <img src={Logo} alt="logo" />
        <p>
          Our Purpose Is To Sustainably Make the Pleasure
          and Benefits of Sports Accessible to the Many.
        </p>
      </div>
    </div>
    <hr />
    <p className="copyright">Copyright 2021 - Rindra Josia</p>
  </footer>
);

export default Footer;
