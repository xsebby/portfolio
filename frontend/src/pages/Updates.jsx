import './Updates.css';
import { motion } from 'framer-motion';

function Updates() {
  const updates = [
    {
      date: '2026-01-08',
      title: 'c++ learning',
      content: 'using learncpp.com to learn c++',
      category: 'learning'
    },
    {
      date: '2026-01-07',
      title: 'started learning react',
      content: 'started learning react, using it to help with portfolio site.',
      category: 'learning'
    },
    {
      date: '2026-01-03',
      title: 'working on portfolio site',
      content: 'started portfolio site, adding more features and improving the design.',
      category: 'project'
    },
  ];

  const getCategoryColor = (category) => {
    const colors = {
      project: '#4a9eff',
      learning: '#9d4edd',
      hobby: '#f77f00',
    };
    return colors[category] || '#ffffff';
  };

  return (
    <div className="updates-page">
      <div className="updates-container">
        <h1 className="page-title">
          {'Updates'.split('').map((letter, index) => (
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
        <p className="page-subtitle">What I've been working on, learning, and thinking about</p>
        
        <div className="updates-list">
          {updates.map((update, index) => (
            <article key={index} className="update-card">
              <div className="update-header">
                <span 
                  className="update-category"
                  style={{ color: getCategoryColor(update.category) }}
                >
                  {update.category}
                </span>
                <span className="update-date">{update.date}</span>
              </div>
              <h2 className="update-title">{update.title}</h2>
              <p className="update-content">{update.content}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Updates;
