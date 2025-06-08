import { Link } from 'react-router-dom';
import './Footer.css';
import { APP_NAME} from '../config/constants';

const Footer = () => {
  return (
    <footer className="FO-footer">
      <div className="FO-container">
        <div className="FO-footer-grid">
          <div className="FO-footer-col">
            <h3 className="FO-footer-title">{APP_NAME}</h3>
            <p className="FO-footer-description">
              Bridging the gap between talented students and top companies worldwide.
            </p>
            <div className="FO-social-links">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>

          <div className="FO-footer-col">
            <h4 className="FO-footer-heading">For Students</h4>
            <ul className="FO-footer-links">
              <li><Link to="/Student_connect/login?role=student">Dashboard</Link></li>
              <li><Link to="/Student_connect/jobs">Find Jobs</Link></li>
              <li><Link to="/Student_connect/jobs">Internships</Link></li>
              <li><Link to="/Student_connect/resources">Career Resources</Link></li>
            </ul>
          </div>

          <div className="FO-footer-col">
            <h4 className="FO-footer-heading">For Recruiters</h4>
            <ul className="FO-footer-links">
              <li><Link to="/Student_connect/login?role=recruiter">Dashboard</Link></li>
              <li><Link to="/Student_connect/create-job">Post a Job</Link></li>
              <li><Link to="/Student_connect/pricing">Pricing</Link></li>
              <li><Link to="/Student_connect/recruiter-resources">Recruiter Resources</Link></li>
            </ul>
          </div>

          <div className="FO-footer-col">
            <h4 className="FO-footer-heading">Company</h4>
            <ul className="FO-footer-links">
              <li><Link to="/Student_connect/about-us">About Us</Link></li>
              <li><Link to="/Student_connect/blog">Blog</Link></li>
              <li><Link to="/Student_connect/careers">Careers</Link></li>
              <li><Link to="/Student_connect/contact">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="FO-footer-bottom">
          <div className="FO-copyright">
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </div>
          <div className="FO-legal-links">
            <Link to="/Student_connect/privacy-policy">Privacy Policy</Link>
            <Link to="/Student_connect/terms-of-service">Terms of Service</Link>
            <Link to="/Student_connect/cookies-policy">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;