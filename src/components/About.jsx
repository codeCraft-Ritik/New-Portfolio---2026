import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Github, Linkedin, Code2, Briefcase } from 'lucide-react';

const About = () => {
  // Tech stack with colors
  const techStackRow1 = [
    { name: 'React', color: '#61DAFB' },
    { name: 'Node.js', color: '#68A063' },
    { name: 'MongoDB', color: '#4DB33D' },
    { name: 'Express', color: '#ffffff' },
    { name: 'JavaScript', color: '#F7DF1E' },
  ];

  const techStackRow2 = [
    { name: 'Tailwind', color: '#38BDF8' },
    { name: 'Python', color: '#3776AB' },
    { name: 'Git', color: '#F05032' },
    { name: 'Postman', color: '#FF6C37' },
    { name: 'VS Code', color: '#007ACC' },
  ];

  const techStack = [...techStackRow1, ...techStackRow2];

  return (
    <section id="about" className="py-16 md:py-20">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-gray-400 mb-4">
          Get To Know
        </p>
        <h2 className="text-5xl md:text-7xl font-black">
          About{' '}
          <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Me
          </span>
        </h2>
      </motion.div>

      {/* Main About Content - Two Column Layout */}
      <div className="grid lg:grid-cols-3 gap-8 mb-20 px-4 sm:px-0">
        {/* Left Column - About Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="lg:col-span-2 space-y-8"
        >
          {/* About Card */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black">Ritik Kumar</h3>
                <p className="text-cyan-400 font-medium text-sm sm:text-base">Full-Stack MERN Developer</p>
              </div>
            </div>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
              I'm a passionate <span className="text-cyan-400 font-semibold">Full-Stack MERN Developer</span> and
              <span className="text-purple-400 font-semibold"> BCA (Data Analytics)</span> student with hands-on
              experience building scalable web applications, secure authentication systems, and payment workflows.
              Proficient in React, Node.js, and MongoDB with real-world projects used by <span className="text-green-400 font-semibold">100+ users</span>.
            </p>

            <p className="text-gray-400 leading-relaxed mb-6 text-sm sm:text-base">
              Currently pursuing my Bachelor's degree at Amity University Noida, I'm actively seeking
              internships and entry-level software development roles to apply my skills in a professional environment
              and contribute to meaningful projects.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-white/5 rounded-xl p-3 sm:p-4 text-center border border-white/5">
                <p className="text-xl sm:text-3xl font-black text-cyan-400">8.40</p>
                <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider mt-1">CGPA</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3 sm:p-4 text-center border border-white/5">
                <p className="text-xl sm:text-3xl font-black text-purple-400">100+</p>
                <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider mt-1">Users</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3 sm:p-4 text-center border border-white/5">
                <p className="text-xl sm:text-3xl font-black text-green-400">4+</p>
                <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider mt-1">Projects</p>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
          >
            <div className="flex items-center gap-2 px-4 py-3 sm:py-2 bg-green-500/10 border border-green-500/30 rounded-full w-full sm:w-auto justify-center">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs sm:text-sm font-medium">Open to Internships</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-3 sm:py-2 bg-blue-500/10 border border-blue-500/30 rounded-full w-full sm:w-auto justify-center">
              <Briefcase className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 text-xs sm:text-sm font-medium">Seeking Entry-Level Roles</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column - Profile Picture Card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="lg:col-span-1"
        >
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl lg:sticky lg:top-24">
            {/* Profile Image */}
            <div className="relative mb-6">
              <div className="w-full aspect-square rounded-2xl bg-linear-to-br from-cyan-500 via-blue-600 to-purple-600 p-1">
                <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center overflow-hidden">
                  <img
                    src="/profile.jpg"
                    alt="Ritik"
                    className="w-full h-full object-cover rounded-2xl"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full rounded-2xl bg-linear-to-br from-cyan-500/20 to-purple-500/20 items-center justify-center hidden">
                    <span className="text-8xl font-black bg-linear-to-br from-cyan-400 to-purple-500 bg-clip-text text-transparent">RK</span>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-slate-900 flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
              </div>
            </div>

            <div className="text-center mb-6">
              <h4 className="text-xl font-black mb-1">Ritik Kumar</h4>
              <p className="text-sm text-gray-400">MERN Stack Developer</p>
            </div>

            <div className="space-y-3 mb-6">
              <a href="mailto:ritik2131@gmail.com" className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group">
                <Mail className="w-5 h-5 text-cyan-400 shrink-0" />
                <span className="text-xs sm:text-sm text-gray-300 group-hover:text-white transition-colors truncate">ritik2131@gmail.com</span>
              </a>
              <a href="tel:+919113779159" className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group">
                <Phone className="w-5 h-5 text-green-400 shrink-0" />
                <span className="text-xs sm:text-sm text-gray-300 group-hover:text-white transition-colors">+91-9113779159</span>
              </a>
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                <MapPin className="w-5 h-5 text-purple-400 shrink-0" />
                <span className="text-xs sm:text-sm text-gray-300">Noida, Uttar Pradesh</span>
              </div>
            </div>

            <div className="flex gap-3">
              <a href="https://github.com/codeCraft-Ritik" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-cyan-500/50 transition-all">
                <Github className="w-5 h-5" />
                <span className="text-xs sm:text-sm font-medium">GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/ritikkumar-21dec" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-blue-500/50 transition-all">
                <Linkedin className="w-5 h-5" />
                <span className="text-xs sm:text-sm font-medium">LinkedIn</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tech Stack Section - COMPLETELY TRANSPARENT */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative mt-24"
      >
        <div className="text-center mb-12 sm:mb-16 px-4">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-full mb-6"
          >
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-cyan-400">Tech Arsenal</span>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
          </motion.div>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
            Technologies I{' '}
            <span className="inline sm:block md:inline bg-linear-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Master
            </span>
          </h3>
        </div>

        {/* Ambient Glows (Behind the text) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden hidden sm:block z-0">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px]" />
        </div>

        {/* --- 100% TRANSPARENT MARQUEE (ABSOLUTELY NO BOXES OR FADES) --- */}
        <div className="relative w-full overflow-hidden py-10 flex items-center z-10">
          
          {/* The Animated Track */}
          <motion.div
            className="flex w-max items-center gap-12 sm:gap-24"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 25, ease: "linear", repeat: Infinity }}
            style={{ transform: "translateZ(0)" }}
          >
            {[0, 1].map((loopIndex) => (
              <div key={`loop-${loopIndex}`} className="flex shrink-0 items-center gap-12 sm:gap-24 pr-12 sm:pr-24">
                {techStack.map((tech, index) => (
                  <motion.div
                    key={`tech-${loopIndex}-${index}`}
                    whileHover={{ scale: 1.15, y: -4 }}
                    className="flex items-center gap-3 min-w-max cursor-pointer opacity-75 hover:opacity-100 transition-all duration-300"
                  >
                    <div
                      className="flex items-center justify-center font-black text-3xl sm:text-5xl shrink-0"
                      style={{
                        color: tech.color,
                        textShadow: `0 0 20px ${tech.color}80`,
                      }}
                    >
                      {tech.name.slice(0, 2).toUpperCase()}
                    </div>
                    <span
                      className="font-black text-xl sm:text-4xl tracking-wider"
                      style={{ 
                        color: tech.color, 
                        textShadow: `0 0 20px ${tech.color}80` 
                      }}
                    >
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center gap-6 sm:gap-12 mt-12 sm:mt-16"
        >
          <div className="text-center">
            <p className="text-3xl sm:text-5xl font-black bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">12+</p>
            <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest mt-2">Tech</p>
          </div>
          <div className="w-px bg-white/10" />
          <div className="text-center">
            <p className="text-3xl sm:text-5xl font-black bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">2+</p>
            <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest mt-2">Years Learning</p>
          </div>
          <div className="w-px bg-white/10" />
          <div className="text-center">
            <p className="text-3xl sm:text-5xl font-black bg-linear-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">100%</p>
            <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest mt-2">Passion</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;