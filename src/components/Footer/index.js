import { FaFacebookF } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaLinkedinIn } from 'react-icons/fa';
import './index.css';

const Footer = () => {
  return (
    <div className="footer-container">
      <img
        src="https://i.postimg.cc/Gt9YRkS2/logo-Short-Black-3.png"
        alt="nav-logo"
        className="nav-image"
      />

      <p className="copyright">All right reserved. Copyright @Snapper</p>

      <div className="foo-icons-container">
        <div className="footer-icon-container">
          <FaFacebookF className="footer-icon" />
        </div>

        <div className="footer-icon-container">
          <FaTwitter className="footer-icon" />
        </div>

        <div className="footer-icon-container">
          <FaLinkedinIn className="footer-icon" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
