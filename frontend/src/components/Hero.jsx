import './Hero.css';

function Hero() {
  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/sebby',
      icon: '/icons/linkedin-logo.svg',
      className: 'linkedin'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/xsebby',
      icon: '/icons/github-mark-white.svg',
      className: 'github'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/xsebby',
      icon: '/icons/X.svg',
      className: 'x',
      iconClass: 'x-icon'
    }
  ];

  return (
    <div className="container">
      <main className="hero">
        <h1 className="greeting">hi i'm sebby</h1>
        <p className="subtitle">student at rutgers aspiring to be a software engineer</p>
        <div className="social-links">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`social-btn ${link.className}`}
            >
              <img
                src={link.icon}
                alt={link.name}
                className={`social-icon ${link.iconClass || ''}`}
              />
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Hero;
