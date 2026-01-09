import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Header.css';

function Header() {
  const location = useLocation();
  const [scrollY, setScrollY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Calculate translateY based on scroll position
  // At scroll 0: translateY = 0 (fully visible)
  // At scroll 100+: translateY = -100% (fully hidden)
  // When hovered: always show
  const translateY = isHovered ? 0 : Math.max(-100, -(scrollY / 100) * 100);

  return (
    <header 
      className="header"
      style={{ transform: `translateY(${translateY}%)` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <nav className="nav">
        <Link to="/" className="nav-brand">
          <span className="brand-text">xsebby</span>
        </Link>
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/projects" 
            className={`nav-link ${isActive('/projects') ? 'active' : ''}`}
          >
            Projects
          </Link>
          <Link 
            to="/updates" 
            className={`nav-link ${isActive('/updates') ? 'active' : ''}`}
          >
            Updates
          </Link>
          <Link 
            to="/contact" 
            className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
          >
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
