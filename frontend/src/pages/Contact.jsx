import './Contact.css';
import { motion } from 'framer-motion';

function Contact() {
  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1 className="page-title">
          {'Contact'.split('').map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.03,
                ease: "easeOut"
              }}
              style={{ display: 'inline-block' }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </h1>
        <p className="page-subtitle">Feel free to reach out if you'd like to collaborate or just say hi!</p>
        
        <div className="contact-content">
          <div className="contact-info">
            <h2 className="section-title">Get in Touch</h2>
            <p className="contact-text">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            
            <div className="contact-methods">
              <a 
                href="mailto:your.email@example.com" 
                className="contact-method"
              >
                <span className="method-label">Email</span>
                <span className="method-value">your.email@example.com</span>
              </a>
              
              <a 
                href="https://linkedin.com/in/sebby" 
                target="_blank" 
                rel="noopener noreferrer"
                className="contact-method"
              >
                <span className="method-label">LinkedIn</span>
                <span className="method-value">linkedin.com/in/sebby</span>
              </a>
              
              <a 
                href="https://github.com/xsebby" 
                target="_blank" 
                rel="noopener noreferrer"
                className="contact-method"
              >
                <span className="method-label">GitHub</span>
                <span className="method-value">github.com/xsebby</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
