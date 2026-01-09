import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">
          © {currentYear} sebastian raducha.
        </p>
        <div className="footer-links">
          <a 
            href="https://github.com/xsebby" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            GitHub
          </a>
          <a 
            href="https://linkedin.com/in/sebby" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            LinkedIn
          </a>
          <a 
            href="https://twitter.com/xsebby" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            Twitter
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
