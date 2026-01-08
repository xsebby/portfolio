import './Hero.css';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

function Hero() {
  const greetingText = "hi i'm sebby";
  const letters = greetingText.split('');
  const greetingRef = useRef(null);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      const letterElements = greetingRef.current?.children;
      if (!letterElements) return;
      
      Array.from(letterElements).forEach((letter) => {
        const rect = letter.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const maxDistance = 150;
        const intensity = Math.max(0, 1 - distance / maxDistance);
        
        // Move up and scale when cursor is near
        const translateY = -intensity * 10; // Move up (negative = up)
        const scale = 1 + intensity * 0.1; // Scale up
        
        letter.style.transform = `translateY(${translateY}px) scale(${scale})`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
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
        <h1 className="greeting" ref={greetingRef}>
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.03,
                ease: "easeOut"
              }}
              className="letter-interactive"
              style={{ display: 'inline-block' }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </h1>
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
