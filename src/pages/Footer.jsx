import "./Footer.css";
import { FaFacebookF, FaTwitter, FaYoutube, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Left Section */}
        <div className="footer-brand">
          <h2 className="logo">StudyNotion</h2>
          <ul>
            <li>About</li>
            <li>Careers</li>
            <li>Affiliates</li>
          </ul>

          <div className="social-icons">
            <FaFacebookF />
            <FaTwitter />
            <FaYoutube />
            <FaGithub />
          </div>
        </div>

        {/* Links Columns */}
        <div className="footer-columns">

          <div>
            <h4>Resources</h4>
            <ul>
              <li>Articles</li>
              <li>Blog</li>
              <li>Docs</li>
              <li>Projects</li>
            </ul>
          </div>

          <div>
            <h4>Plans</h4>
            <ul>
              <li>Paid Memberships</li>
              <li>For Students</li>
              <li>Business Solutions</li>
            </ul>
          </div>

          <div>
            <h4>Subjects</h4>
            <ul>
              <li>AI</li>
              <li>Cloud Computing</li>
              <li>Cybersecurity</li>
              <li>Web Development</li>
            </ul>
          </div>

          <div>
            <h4>Languages</h4>
            <ul>
              <li>JavaScript</li>
              <li>Python</li>
              <li>Java</li>
              <li>C++</li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p>Privacy Policy | Cookie Policy | Terms</p>
        <p>Made with ❤️ CodeHelp © 2026 StudyNotion</p>
      </div>
    </footer>
  );
}

export default Footer;
