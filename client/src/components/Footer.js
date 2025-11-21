import "./Footer.css";
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

     
        <div className="footer-section">
          <h3>About Travel India</h3>
          <p>
            Travel India is your go-to platform to explore famous destinations,
            culture, food, and travel guides across India. Discover beauty,
            history, and places worth visiting!
          </p>
        </div>

    
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/destinations">Destinations</a></li>
            <li><a href="/aboutus">About Us</a></li>
            <li><a href="/contact">Login</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: support@travelindia.com</p>
          <p>Phone: +91 987654321</p>
          <p>Location: Pune, India</p>
        </div>

        
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <FaInstagram />
            <FaFacebook />
            <FaLinkedin />
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © 2025 Travel India — Made with ❤️ using React
      </div>
    </footer>
  );
};

export default Footer;
