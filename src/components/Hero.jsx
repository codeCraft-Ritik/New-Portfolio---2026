import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, Terminal, Github, Linkedin, Mail, Download, ChevronDown } from 'lucide-react';
import resumePdf from '../assets/Ritik_Kumar_CV_Final.pdf';

const Hero = ({ liteMode = false }) => {
  const roles = ["Full-Stack Developer", "MERN Stack Developer", "Data Analytics Student"];
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const [compactMode, setCompactMode] = useState(liteMode);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile
    const checkMobile = () => setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    checkMobile();
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    mobileQuery.addEventListener('change', checkMobile);
    return () => mobileQuery.removeEventListener('change', checkMobile);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      setCompactMode(liteMode);
      return undefined;
    }

    const mediaQuery = window.matchMedia('(max-width: 820px), (pointer: coarse), (hover: none), (prefers-reduced-motion: reduce)');
    const syncCompactMode = () => setCompactMode(liteMode || mediaQuery.matches || isMobile);

    syncCompactMode();
    mediaQuery.addEventListener('change', syncCompactMode);
    return () => mediaQuery.removeEventListener('change', syncCompactMode);
  }, [liteMode, isMobile]);

  // DISABLED: 3D mouse tracking effects for performance - causes jank on scroll
  const allow3D = false;

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const nameLetter = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  const nameContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
  };

  return (
    <section
      id="home"
      className="min-h-[100dvh] pt-32 pb-24 lg:pt-0 lg:pb-0 flex flex-col items-center justify-center relative overflow-hidden px-4 sm:px-6 w-full"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(56,189,248,0.15),transparent_70%)]" />
      </div>

      <motion.div
        className="relative z-10 text-center w-full max-w-full flex flex-col items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-cyan-500/30 mb-6 backdrop-blur-sm"
        >
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">Available for Work</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="text-base sm:text-lg md:text-xl text-gray-300 font-medium mb-4 tracking-wide"
        >
          Hello, I'm
        </motion.p>

        <motion.h1
          initial="hidden"
          animate="show"
          variants={nameContainer}
          className="relative text-6xl xs:text-7xl sm:text-8xl md:text-9xl font-black mb-6 leading-[1.1] sm:leading-[0.95] flex flex-col items-center justify-center w-full z-20"
        >
          <span className="relative inline-flex text-white" style={{ perspective: allow3D ? 700 : 'none' }}>
            {Array.from('Ritik').map((letter, idx) => (
              <motion.span key={`ritik-${idx}`} variants={nameLetter} className="inline-block" style={{ transformOrigin: '50% 90%' }}>
                {letter}
              </motion.span>
            ))}
          </span>
          
          <span className="relative inline-flex mt-2 sm:mt-0">
            {Array.from('Kumar').map((letter, idx) => (
              <motion.span
                key={`kumar-${idx}`}
                variants={nameLetter}
                className="inline-block bg-linear-to-r from-cyan-300 via-sky-400 to-emerald-400 bg-clip-text text-transparent pb-2"
                style={{ transformOrigin: '50% 90%' }}
              >
                {letter}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        <div className="h-12 sm:h-16 flex items-center justify-center mb-8 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={roles[index]}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 sm:gap-4 px-2 sm:px-6 w-full max-w-[95vw] sm:max-w-none justify-center"
            >
              <div className="w-6 xs:w-8 sm:w-16 h-0.5 bg-linear-to-r from-transparent to-orange-400 shrink-0" />
              <p className="text-[11px] xs:text-[13px] sm:text-xl md:text-3xl font-bold uppercase tracking-[0.08em] sm:tracking-[0.2em] text-gray-200 text-center shrink">
                {roles[index]}
              </p>
              <div className="w-6 xs:w-8 sm:w-16 h-0.5 bg-linear-to-l from-transparent to-cyan-400 shrink-0" />
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-gray-400 text-xs sm:text-sm md:text-base max-w-[90%] sm:max-w-xl mx-auto mb-10 leading-relaxed px-2"
        >
          Crafting scalable web applications with modern technologies. Passionate about creating seamless user experiences and robust backend systems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 w-full max-w-xs sm:max-w-none mx-auto"
        >
          <a href="#projects" className="group w-full sm:w-auto flex justify-center px-8 py-4 bg-cyan-600 rounded-xl font-bold uppercase text-xs tracking-widest text-white transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-105">
            <span className="flex items-center gap-2">
              View Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>

          <div className="flex gap-3 w-full sm:w-auto">
            <a href="#contact" className="group flex-1 sm:w-auto flex justify-center px-6 py-4 bg-white/5 border border-white/10 rounded-xl font-bold uppercase text-xs tracking-widest text-white hover:bg-white/10 transition-all">
              <span className="flex items-center gap-2"><Mail className="w-4 h-4" /> Contact</span>
            </a>
            <a href={resumePdf} target="_blank" rel="noopener noreferrer" className="group flex-1 sm:w-auto flex justify-center px-6 py-4 bg-white/5 border border-white/10 rounded-xl font-bold uppercase text-xs tracking-widest text-white hover:bg-white/10 transition-all">
              <span className="flex items-center gap-2"><Download className="w-4 h-4" /> Resume</span>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="flex items-center justify-center gap-4 opacity-80"
        >
          {[
            { Icon: Github, href: "https://github.com/codeCraft-Ritik" },
            { Icon: Linkedin, href: "https://www.linkedin.com/in/ritikkumar-21dec" },
            { Icon: Mail, href: "mailto:kritik2131@gmail.com" }
          ].map((item, i) => (
            <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-cyan-500/20 hover:text-cyan-400 transition-all hover:scale-110">
              <item.Icon className="w-5 h-5" />
            </a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;