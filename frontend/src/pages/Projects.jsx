import './Projects.css';
import { motion } from 'framer-motion';

function Projects() {
  const projects = [
    {
      title: 'Project 1',
      description: 'Description of your first project. What it does, technologies used, and what problem it solves.',
      technologies: ['React', 'Node.js', 'MongoDB'],
      githubUrl: 'https://github.com/xsebby',
      liveUrl: 'https://example.com',
      image: null
    },
    {
      title: 'Project 2',
      description: 'Description of your second project. Explain the key features and your role in building it.',
      technologies: ['Python', 'TensorFlow', 'Flask'],
      githubUrl: 'https://github.com/xsebby',
      liveUrl: null,
      image: null
    },
    {
      title: 'Project 3',
      description: 'Description of your third project. Highlight what makes it unique or interesting.',
      technologies: ['JavaScript', 'Express', 'PostgreSQL'],
      githubUrl: 'https://github.com/xsebby',
      liveUrl: 'https://example.com',
      image: null
    },
  ];

  return (
    <div className="projects-page">
      <div className="projects-container">
        <h1 className="page-title">
          {'Projects'.split('').map((letter, index) => (
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
        <p className="page-subtitle">A collection of my work and side projects</p>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <h3 className="project-name">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-tech">
                {project.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="project-links">
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  GitHub
                </a>
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;
