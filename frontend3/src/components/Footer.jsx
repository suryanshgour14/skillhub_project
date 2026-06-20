import { FaGraduationCap } from "react-icons/fa";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <FaGraduationCap className="footer-icon" />
          <span>SkillHub</span>
        </div>
        <p className="footer-copy">© {year} SkillHub. All rights reserved.</p>
        <p className="footer-tech">Built with React · Node.js · MongoDB</p>
      </div>
    </footer>
  );
}

export default Footer;
