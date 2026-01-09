import './Skills.css';

function Skills() {
    const skills = [
        {
            name: 'React',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
            learning: true,
            link: 'https://react.dev/'
        },
        {
            name: 'Node.js',
            icon: 'https://nodejs.org/static/images/logo.svg',
            learning: true,
            link: 'https://nodejs.org/'
        },
        {
            name: 'Python',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
            link: 'https://www.python.org/'
        },
        {
            name: 'JavaScript',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-plain.svg',
            link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'
        },
        {
            name: 'HTML',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-plain.svg',
            link: 'https://www.w3.org/html/'
        },
        {
            name: 'CSS',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-plain.svg',
            link: 'https://www.w3.org/Style/CSS/Overview.en.html'
        },
        {   
            name: 'Java',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-plain.svg',
            link: 'https://www.java.com/'
        },
        {
            name: 'C++',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-plain.svg',
            learning: true,
            link: 'https://www.cplusplus.com/'
        },
        {
            name: 'C',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg',
            learning: true,
            link: 'https://www.cprogramming.com/'
        },
        {
            name: 'Figma',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg',
            link: 'https://www.figma.com/'
        }
    ];
    return (
        <section className="skills-section">
          <div className="skills-container">
            <h2 className="skills-title">Skills</h2>
            <div className="skills-grid">
              {skills.map((skill) => (
                <a href={skill.link} target="_blank" rel="noopener noreferrer">
                  <div key={skill.name} className="skill-card">
                  <div className="skill-icon-wrapper">
                    <img 
                      src={skill.icon} 
                      alt={skill.name} 
                      className="skill-icon"
                    />
                    {skill.learning && (
                      <div className="learning-indicator">
                        <svg 
                          className="gear-icon" 
                          width="20" 
                          height="20" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2"
                        >
                          <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <p className="skill-name">{skill.name}</p>
                </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      );
    }
    
export default Skills;