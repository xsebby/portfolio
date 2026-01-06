import './FeaturedProject.css';

function FeaturedProject() {
  const project = {
    title: 'Project Name',
    description: 'A brief description of your featured project. Explain what it does, the technologies used, and what problem it solves.',
    technologies: ['React', 'Python', 'TensorFlow'],
    githubUrl: 'https://github.com/xsebby',
    liveUrl: 'https://example.com'
  };

  return (
    <section className="project-section">
      <div className="project-container">
        <h2 className="project-title">Featured Project</h2>
        <div className="project-card">
          <h3 className="project-name">{project.title}</h3>
          <p className="project-description">{project.description}</p>
          <div className="project-tech">
            {project.technologies.map((tech, index) => (
              <span key={index} className="tech-tag">
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
      </div>
    </section>
  );
}

export default FeaturedProject;
