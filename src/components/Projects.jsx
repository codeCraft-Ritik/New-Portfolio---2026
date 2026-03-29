import { motion } from 'framer-motion';
import { ExternalLink, Github, Star } from 'lucide-react';
import elevateImg from '../assets/Elevate.png';
import quickWheels1 from '../assets/Screenshot-Qucik-Wheels.png';
import quickWheels2 from '../assets/Screenshot-Quick-Wheels.png';
import hostelBuddyImg from '../assets/Hostel-Buddy.jpeg';
import zeroBucksImg from '../assets/Zero-Bugs (1).png';
import iplImg1 from '../assets/IPL-1 (1).png';
import iplImg2 from '../assets/IPL-2.png';

const Projects = () => {
  const projects = [
    {
      id: "01",
      type: "Responsive Desktop App",
      title: "Elevate AI",
      description: "Elevate AI is an AI-powered placement preparation platform.",
      technologies: ["REACT", "NODE.JS", "EXPRESS", "MONGODB", "OPENAI API"],
      githubUrl: "https://github.com/codeCraft-Ritik/Elevate-AI",
      image: elevateImg,
    },
    {
      id: "02", 
      type: "Responsive Site",
      title: "Quick Wheels",
      description: "Quick Wheels — A next-gen MERN car rental platform.",
      technologies: ["REACT", "NODE.JS", "EXPRESS", "MONGODB"],
      githubUrl: "https://github.com/codeCraft-Ritik/Quick-Wheels",
      image: "",
      screenshots: [quickWheels2, quickWheels1]
    },
    {
      id: "03",
      type: "For College", 
      title: "Hostel Buddy",
      description: "A full-stack web app that transforms hostel living into a smart, connected community",
      technologies: ["REACT", "NODE.JS", "EXPRESS", "MONGODB", "VITE", "CLOUDINARY"],
      githubUrl: "https://github.com/codeCraft-Ritik/Hostel-Buddy",
      image: hostelBuddyImg
    },
    {
      id: "04",
      type: "Analysis & Visualization",
      title: "IPL 2025 Data Analysis", 
      description: "Performance Analytics Dashboard built using Python and Streamlit..",
      technologies: ["Python", "Pandas", "Matplotlib", "Seaborn", "Streamlit"],
      githubUrl: "https://github.com/codeCraft-Ritik/IPL-2025-Performance-Analytics",
      screenshots: [iplImg1, iplImg2]
    },
    {
      id: "05",
      type: "Agency", 
      title: "The Zero Bucks Agency",
      description: "The Zero Bucks Agency is a Web3 development and creative collective that merges code with design to craft futuristic dApps, smart contracts, and digital experiences.",
      technologies: ["REACT", "NODE.JS", "EXPRESS", "MONGODB", "VITE"],
      githubUrl: "https://github.com/codeCraft-Ritik/The-Zero-Bucks-Agency",
      image: zeroBucksImg
    },

  ];

  return (
    <section id="projects" className="py-16 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-24"
      >
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl md:text-8xl font-black uppercase tracking-tight md:tracking-tighter mb-6 md:mb-8"
        >
          Featured Projects
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed"
        >
          A curated selection of projects that made me confident in building software.
        </motion.p>
      </motion.div>

      <div className="space-y-12 md:space-y-24">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-start md:items-center group ${index % 2 === 1 ? 'md:grid-flow-col-dense' : ''}`}
          >
            {/* Project Content */}
            <div className={`space-y-4 md:space-y-8 order-2 md:order-1 ${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
              <div className="flex flex-col items-start gap-2 sm:gap-3">
                <motion.span 
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  viewport={{ once: true }}
                  className="text-3xl sm:text-5xl md:text-8xl font-black text-gray-700/50 leading-none"
                >
                  {project.id}
                </motion.span>
                <div className="flex-1">
                  <motion.p 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-xs sm:text-sm font-bold text-blue-400 uppercase tracking-wider mb-2"
                  >
                    {project.type}
                  </motion.p>
                  <motion.h3 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                    className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white hover:text-cyan-300 transition-colors duration-300 wrap-break-word"
                  >
                    {project.title}
                  </motion.h3>
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-wrap items-center gap-2 sm:gap-3"
              >
                <a 
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 sm:gap-3 bg-linear-to-r from-white/10 to-white/5 hover:from-cyan-500/20 hover:to-emerald-500/20 border border-white/20 hover:border-cyan-400/60 px-4 sm:px-6 py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-500 shadow-lg hover:shadow-cyan-500/25 hover:scale-105"
                >
                  <Star className="w-4 h-4 group-hover:text-yellow-400 transition-colors" />
                  <span>Star on GitHub</span>
                </a>
              </motion.div>

              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                viewport={{ once: true }}
                className="text-gray-200 text-base sm:text-lg leading-relaxed font-light"
              >
                {project.description}
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                viewport={{ once: true }}
                className="flex flex-wrap gap-3"
              >
                {project.technologies.map((tech, i) => (
                  <motion.span 
                    key={`${project.id}-tech-${i}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + (i * 0.1) }}
                    viewport={{ once: true }}
                    className="px-4 py-2 bg-linear-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-full text-xs font-bold uppercase tracking-wider text-blue-200 hover:border-blue-300/50 hover:text-white transition-all duration-300"
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* Project Image */}
            <div className={`relative group order-1 md:order-2 w-full max-w-full overflow-hidden ${index % 2 === 1 ? 'md:col-start-1' : ''}`}>
              {project.screenshots ? (
                <div className={`flex ${project.screenshots.length === 2 ? 'flex-col sm:flex-row' : 'flex-wrap sm:flex-nowrap'} gap-2 sm:gap-3 justify-center items-stretch w-full max-w-full overflow-hidden`}>
                  {project.screenshots.map((screenshot, i) => (
                    <motion.div
                      key={`${project.id}-screenshot-${i}`}
                      whileHover={{ y: -3, scale: 1.01 }}
                      className={`${project.screenshots.length === 2 ? 'w-full sm:w-56 md:w-64' : i === 2 ? 'w-full sm:w-48 md:w-56' : 'w-full sm:w-32 md:w-40'} bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-500 group-hover:scale-105 flex-shrink-0`}
                    >
                      <img
                        src={screenshot}
                        alt={`${project.title} screenshot ${i + 1}`}
                        className={`${project.screenshots.length === 2 ? 'h-40 sm:h-52 md:h-72' : i === 2 ? 'h-40 sm:h-52 md:h-64' : 'h-32 sm:h-36 md:h-48'} w-full object-cover`}
                      />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-500"
                >
                  {project.image
                    ? <img src={project.image} alt={project.title} className="w-full h-64 object-cover" />
                    : <div className="h-64 bg-linear-to-br from-blue-500/20 to-purple-500/20" />}
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">App screenshot</span>
                      <ExternalLink className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="text-center mt-20"
      >
        <a 
          href="https://github.com/codeCraft-Ritik"
          target="_blank"
          rel="noopener noreferrer" 
          className="inline-flex items-center gap-2 sm:gap-3 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold uppercase tracking-wider text-xs sm:text-sm transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
        >
          <Github className="w-5 h-5" />
          Explore all projects on GitHub
        </a>
      </motion.div>
    </section>
  );
};

export default Projects;
