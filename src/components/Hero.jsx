import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, Terminal, Github, Linkedin, Mail, Download, ChevronDown } from 'lucide-react';
import resumePdf from '../assets/Ritik_Kumar_CV_Final.pdf';

const Hero = ({ liteMode = false }) => {
  const roles = ["Full-Stack Developer", "MERN Stack Developer", "Data Analytics Student"];
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const [compactMode, setCompactMode] = useState(liteMode);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      setCompactMode(liteMode);
      return undefined;
    }

    const mediaQuery = window.matchMedia('(max-width: 820px), (pointer: coarse), (hover: none), (prefers-reduced-motion: reduce)');
    const syncCompactMode = () => setCompactMode(liteMode || mediaQuery.matches);

    syncCompactMode();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', syncCompactMode);
      return () => mediaQuery.removeEventListener('change', syncCompactMode);
    }

    mediaQuery.addListener(syncCompactMode);
    return () => mediaQuery.removeListener(syncCompactMode);
  }, [liteMode]);

  const allow3D = !reduceMotion && !compactMode;

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const smoothX = useSpring(mouseX, { stiffness: 110, damping: 18, mass: 0.7 });
  const smoothY = useSpring(mouseY, { stiffness: 110, damping: 18, mass: 0.7 });

  const rotateY = useTransform(smoothX, [0, 1], allow3D ? [-10, 10] : [0, 0]);
  const rotateX = useTransform(smoothY, [0, 1], allow3D ? [8, -8] : [0, 0]);
  const glowX = useTransform(smoothX, [0, 1], ['20%', '80%']);
  const glowY = useTransform(smoothY, [0, 1], ['10%', '70%']);

  const ambientDots = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: `${8 + ((i * 9) % 84)}%`,
        top: `${9 + ((i * 17) % 74)}%`,
        size: 2 + (i % 3),
        delay: i * 0.16,
        duration: 2.8 + (i % 5) * 0.5,
      })),
    []
  );

  const nameContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.07,
        delayChildren: 0.28,
      },
    },
  };

  const nameLetter = {
    hidden: !allow3D
      ? { opacity: 0, y: 18 }
      : reduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 54, rotateX: -85, filter: 'blur(8px)' },
    show: !allow3D
      ? {
          opacity: 1,
          y: 0,
          transition: {
            type: 'spring',
            stiffness: 240,
            damping: 24,
            mass: 0.75,
          },
        }
      : reduceMotion
      ? { opacity: 1 }
      : {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: 'blur(0px)',
          transition: {
            type: 'spring',
            stiffness: 260,
            damping: 23,
            mass: 0.75,
          },
        },
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handlePointerMove = (event) => {
    if (!allow3D) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    mouseX.set(Math.min(1, Math.max(0, x)));
    mouseY.set(Math.min(1, Math.max(0, y)));
  };

  const resetPointer = () => {
    if (!allow3D) return;
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6"
      onMouseMove={handlePointerMove}
      onMouseLeave={resetPointer}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(62% 50% at 50% 15%, rgba(56,189,248,0.20), transparent 70%), radial-gradient(42% 35% at 8% 20%, rgba(249,115,22,0.16), transparent 72%), radial-gradient(45% 35% at 90% 16%, rgba(99,102,241,0.15), transparent 75%), radial-gradient(80% 60% at 50% 100%, rgba(16,185,129,0.10), transparent 75%)',
          }}
        />

        {allow3D && (
          <motion.div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(300px 220px at var(--gx) var(--gy), rgba(255,255,255,0.18), transparent 70%)',
              '--gx': glowX,
              '--gy': glowY,
            }}
          />
        )}

        {allow3D && (
          <>
            <motion.div
              className="absolute -left-28 top-16 w-80 h-80 rounded-full border border-cyan-400/15"
              animate={{ rotate: 360 }}
              transition={{ duration: 34, ease: 'linear', repeat: Infinity }}
            />
            <motion.div
              className="absolute -left-22 top-22 w-64 h-64 rounded-full border border-orange-400/15"
              animate={{ rotate: -360 }}
              transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
            />
            <motion.div
              className="absolute right-16 bottom-28 w-24 h-24 border border-emerald-400/20 rotate-45"
              animate={{ rotate: [45, 405] }}
              transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
            />
          </>
        )}

        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[80%] h-40 blur-3xl opacity-50"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(56,189,248,0.18), rgba(16,185,129,0.1) 45%, transparent 75%)',
          }}
        />

        {allow3D && ambientDots.map((dot) => (
          <motion.span
            key={dot.id}
            className="absolute rounded-full"
            style={{
              left: dot.left,
              top: dot.top,
              width: dot.size,
              height: dot.size,
              background: dot.id % 2 ? '#22d3ee' : '#f97316',
              boxShadow: dot.id % 2 ? '0 0 14px rgba(34,211,238,0.7)' : '0 0 14px rgba(249,115,22,0.7)',
            }}
            animate={{ opacity: [0.15, 0.85, 0.15], y: [0, -12, 0] }}
            transition={{ duration: dot.duration, delay: dot.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        {/* Geometric Accent Glitch Shapes */}
        {allow3D && (
          <>
            <motion.div
              className="absolute top-8 right-12 w-16 h-16 border-2 border-cyan-500/40"
              style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }}
              animate={{ rotate: 360, opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            />

            <motion.div
              className="absolute bottom-24 left-12 w-20 h-20 border-2 border-purple-500/35"
              animate={{ rotate: -360, scale: [1, 1.15, 1] }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
            />

            <motion.div
              className="absolute top-1/3 left-8 w-24 h-24 border border-orange-500/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />

            <motion.div
              className="absolute top-1/4 right-16 w-12 h-12 border border-emerald-500/40"
              animate={{ x: [0, 20, 0], y: [0, -20, 0], rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              style={{ clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' }}
            />
          </>
        )}
      </div>

      <motion.div
        className="relative z-10 text-center"
        style={{
          rotateX,
          rotateY,
          transformStyle: allow3D ? 'preserve-3d' : 'flat',
          perspective: allow3D ? 1400 : undefined,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-cyan-500/10 via-blue-500/10 to-orange-500/10 border border-cyan-500/30 mb-8 backdrop-blur-sm"
          style={{ transform: 'translateZ(40px)' }}
        >
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">Available for Work</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg md:text-xl text-gray-300 font-medium mb-4"
          style={{ transform: 'translateZ(26px)' }}
        >
          Hello, I'm
        </motion.p>

        <motion.h1
          initial="hidden"
          animate="show"
          variants={nameContainer}
          className="relative text-[3.2rem] sm:text-6xl md:text-8xl lg:text-9xl font-black mb-6 leading-[0.95]"
          style={{ transform: 'translateZ(80px)' }}
        >
          <span className="relative inline-flex text-white" style={{ perspective: 700 }}>
            {Array.from('Ritik').map((letter, idx) => (
              <motion.span
                key={`ritik-${idx}`}
                variants={nameLetter}
                className="inline-block"
                style={{ transformOrigin: '50% 90%' }}
              >
                {letter}
              </motion.span>
            ))}
            {allow3D && (
              <span
                aria-hidden="true"
                className="absolute inset-0 text-white/20 blur-md"
                style={{ transform: 'translate3d(0, 9px, -1px) scale(1.01)' }}
              >
                Ritik
              </span>
            )}
          </span>
          <br />
          <motion.span
            className="relative inline-flex"
            variants={nameContainer}
          >
            {Array.from('Kumar').map((letter, idx) => (
              <motion.span
                key={`kumar-${idx}`}
                variants={nameLetter}
                className="inline-block bg-linear-to-r from-cyan-300 via-sky-400 to-violet-500 bg-clip-text text-transparent"
                style={{
                  transformOrigin: '50% 90%',
                  backgroundSize: '220% 220%',
                  backgroundPosition: '50% 50%',
                }}
                animate={
                  reduceMotion
                    ? undefined
                    : { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }
                }
                transition={
                  reduceMotion
                    ? undefined
                    : { duration: 6.8, repeat: Infinity, ease: 'easeInOut' }
                }
              >
                {letter}
              </motion.span>
            ))}
            {allow3D && (
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-r from-cyan-300 via-sky-400 to-violet-500 bg-clip-text text-transparent blur-xl opacity-45"
                style={{ transform: 'translate3d(0, 9px, -1px) scale(1.01)' }}
              >
                Kumar
              </span>
            )}
          </motion.span>
        </motion.h1>

        <div className="h-16 sm:h-16 md:h-20 flex items-center justify-center mb-8" style={{ transform: 'translateZ(56px)' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={roles[index]}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2"
            >
              <div className="w-6 sm:w-12 h-0.5 bg-linear-to-r from-transparent to-orange-400 shrink-0" />
              <p className="text-base sm:text-xl md:text-3xl font-bold uppercase tracking-[0.08em] sm:tracking-[0.15em] text-gray-200 text-center">
                {roles[index]}
              </p>
              <div className="w-6 sm:w-12 h-0.5 bg-linear-to-l from-transparent to-cyan-400 shrink-0" />
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto mb-10 leading-relaxed"
          style={{ transform: 'translateZ(32px)' }}
        >
          Crafting scalable web applications with modern technologies.
          Passionate about creating seamless user experiences and robust backend systems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12"
          style={{ transform: 'translateZ(50px)' }}
        >
          <a
            href="#projects"
            className="group relative w-full sm:w-auto justify-center px-6 sm:px-8 py-3.5 sm:py-4 bg-linear-to-r from-cyan-500 to-blue-600 rounded-xl font-bold uppercase text-sm tracking-wider text-white overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:scale-105 inline-flex"
          >
            <span className="relative z-10 flex items-center gap-2">
              View Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-linear-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>

          <a
            href="#contact"
            className="group w-full sm:w-auto justify-center px-6 sm:px-8 py-3.5 sm:py-4 bg-white/5 border border-white/10 rounded-xl font-bold uppercase text-sm tracking-wider text-white hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300 inline-flex"
          >
            <span className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Contact Me
            </span>
          </a>

          <a
            href={resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="group w-full sm:w-auto justify-center px-6 sm:px-8 py-3.5 sm:py-4 bg-white/5 border border-white/10 rounded-xl font-bold uppercase text-sm tracking-wider text-white hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 inline-flex"
          >
            <span className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Resume
            </span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex items-center justify-center gap-4"
          style={{ transform: 'translateZ(24px)' }}
        >
          <a
            href="https://github.com/codeCraft-Ritik"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300 hover:scale-110"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/ritikkumar-21dec"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300 hover:scale-110"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="mailto:kritik2131@gmail.com"
            className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 hover:scale-110"
          >
            <Mail className="w-5 h-5" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-4 sm:bottom-10 left-1/2 -translate-x-1/2"
        >
          <a href="#about" className="flex flex-col items-center gap-2 text-gray-500 hover:text-cyan-400 transition-colors">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </a>
        </motion.div>
      </motion.div>

    </section>
  );
};

export default Hero;
