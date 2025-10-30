import "./Footer.css";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Footer Content */}
      <section className="footer-content">
        <div className="footer-grid">
          <div className="footer-col footer-brand">
            <Logo />
            <p className="brand-description">
              Empowering learners with innovative education solutions and
              comprehensive course management tools.
            </p>
            <p className="live-session">
              Join our live sessions every weekday at 3PM WAT
            </p>
          </div>

          <div className="footer-col">
            <h4>About Us</h4>
            <ul>
              <li>
                <a href="#browse-courses">How it Works</a>
              </li>
              <li>
                <a href="#my-learning">Join as a Farmer</a>
              </li>
              <li>
                <a href="#certificates">Shop Products</a>
              </li>
              <li>
                <a href="#instructors">Register</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a href="#blog">Blog</a>
              </li>
              <li>
                <a href="#support">Support Center</a>
              </li>
              <li>
                <a href="#contact">Contact Us</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Connect With Us</h4>
            <ul>
              <li>
                <a href="#facebook">Facebook</a>
              </li>
              <li>
                <a href="#twitter">Twitter</a>
              </li>
              <li>
                <a href="#linkedin">LinkedIn</a>
              </li>
              <li>
                <a href="#instagram">Instagram</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            Copyright © 2025 Fresh Harvest Hub. All rights reserved.
          </p>
          <div className="footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#cookies">Cookie Policy</a>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
