import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Background from './components/Background';
import Lenis from 'lenis';

const BootLoader = ({ progress, liteMode = false }) => {
  const phase =
    progress < 35 ? 'Initializing Core' : progress < 70 ? 'Syncing Modules' : 'Finalizing Experience';
  
  // Reduce particles dramatically on mobile
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
  const particleCount = liteMode || isMobile ? 8 : 15;
  
  // High-performance background particles with memoization
  const particles = useMemo(() => 
    Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2
    })), [liteMode, particleCount]);

  return (
    <motion.div
      // Fixed position and overflow-hidden are critical for stopping mobile jitters
      className="boot-loader fixed inset-0 z-[9999] bg-[#020617] flex flex-col items-center justify-center overflow-hidden touch-none"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 1.1, 
        filter: "blur(10px)", 
        transition: { duration: 0.8, ease: "easeInOut" } 
      }}
    >
      {/* 1. Animated Tech Background Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.05),transparent_70%)]" />
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute bg-cyan-500/20 rounded-full"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
            animate={{ opacity: [0, 1, 0], y: [0, -50] }}
            transition={{ duration: p.duration, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>

      {/* 2. Central Animated Core with SVG Geometry */}
      <div className="relative flex items-center justify-center">
        {/* Outer Rotating SVG Ring */}
        <motion.div
          className="absolute w-48 h-48 sm:w-56 sm:h-56"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{ transform: 'translateZ(0)' }} 
        >
          <svg viewBox="0 0 100 100" className="w-full h-full opacity-20">
            <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" className="text-cyan-500" />
          </svg>
        </motion.div>

        {/* Mid Pulsing Ring */}
        <motion.div
          className="absolute w-40 h-40 border-t-2 border-b-2 border-cyan-500/30 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          style={{ transform: 'translateZ(0)' }} 
        />
        
        {/* Inner Counter-Rotating Ring */}
        <motion.div
          className="absolute w-32 h-32 border-l-2 border-r-2 border-purple-500/30 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{ transform: 'translateZ(0)' }}
        />

        {/* Interactive Brand Core */}
        <motion.div 
          className="relative w-24 h-24 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-full flex flex-col items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.25)]"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-3xl font-black text-white tracking-tighter">RK</span>
          <div className="h-[1px] w-10 bg-linear-to-r from-transparent via-cyan-500 to-transparent my-1" />
          <span className="text-[7px] uppercase tracking-[0.4em] text-cyan-400 font-bold">System</span>
        </motion.div>
      </div>

      {/* 3. Responsive Progress Interface */}
      <div className="mt-20 w-[85vw] max-w-xs flex flex-col items-center">
        <div className="w-full flex justify-between items-end mb-3">
          <div className="flex flex-col">
            <motion.span 
              key={phase}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[9px] uppercase tracking-[0.25em] text-slate-500 font-black"
            >
              {phase}
            </motion.span>
            <span className="text-[8px] text-cyan-500/60 font-mono">STATUS_OK // NO_ERR</span>
          </div>
          <span className="text-3xl font-black text-white italic tabular-nums">
            {Math.round(progress)}%
          </span>
        </div>

        {/* High-Tech Progress Bar with Shimmer Effect */}
        <div className="relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
          <motion.div
            className="absolute inset-y-0 left-0 bg-linear-to-r from-cyan-500 via-blue-600 to-purple-600"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 40, damping: 15 }}
          />
          <motion.div 
            className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent w-24"
            animate={{ x: ['-100%', '400%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="mt-5 flex gap-3 opacity-40">
          {[0, 1, 2, 3].map((i) => (
            <motion.div 
              key={i}
              className="w-6 h-1 bg-cyan-500 rounded-full"
              animate={{ 
                opacity: [0.3, 1, 0.3],
                scaleY: [1, 1.5, 1]
              }}
              transition={{ delay: i * 0.15, duration: 1.2, repeat: Infinity }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ScrollDepthSection = ({ children, className = '', intensity = 70, direction = 1, disabled = false, ...rest }) => {
  const targetRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    checkMobile();
    const query = window.matchMedia('(max-width: 768px)');
    query.addEventListener('change', checkMobile);
    return () => query.removeEventListener('change', checkMobile);
  }, []);
  
  const shouldAnimate = !disabled && !prefersReducedMotion && !isMobile;

  if (!shouldAnimate) {
    return (
      <div ref={targetRef} className={`scroll-depth-section ${className}`.trim()} style={{ position: 'relative' }} {...rest}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={targetRef}
      className={`scroll-depth-section ${className}`.trim()}
      style={{ position: 'relative' }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [liteMode, setLiteMode] = useState(false);
  const { scrollYProgress } = useScroll();

  const progressScaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    mass: 0.3,
  });
  const progressGlow = useTransform(scrollYProgress, [0, 1], [0.45, 1]);

  useEffect(() => {
    // Keep full animations on phones/tablets; only honor OS reduced-motion preference.
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isMobile = window.matchMedia('(max-width: 768px) or (pointer: coarse)').matches;
    const syncMode = () => setLiteMode(mediaQuery.matches || isMobile);
    syncMode();
    mediaQuery.addEventListener('change', syncMode);
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    mobileQuery.addEventListener('change', syncMode);
    return () => {
      mediaQuery.removeEventListener('change', syncMode);
      mobileQuery.removeEventListener('change', syncMode);
    };
  }, []);

  useEffect(() => {
    let rafId;
    let startTime = 0;
    const duration = liteMode ? 2000 : 2800;

    const tick = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const currentProgress = Math.min(100, (elapsed / duration) * 100);
      setProgress(currentProgress);

      if (elapsed < duration) {
        rafId = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setIsLoading(false), 400);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [liteMode]);

  useEffect(() => {
    // Disable Lenis on mobile/tablet devices - causes jank
    const isMobile = window.matchMedia('(max-width: 768px) or (pointer: coarse)').matches;
    if (isLoading || liteMode || isMobile) return undefined;
    
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [isLoading, liteMode]);

  useEffect(() => {
    if (isLoading) return undefined;
    const revealElements = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-reveal-delay') || '0';
            entry.target.style.setProperty('--reveal-delay', `${delay}ms`);
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isLoading]);

  useEffect(() => {
    const updateScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener('scroll', updateScroll);
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  return (
    <main className="relative bg-[#020617] min-h-svh overflow-x-clip text-slate-200 selection:bg-cyan-500/30" style={{ backfaceVisibility: 'hidden', WebkitFontSmoothing: 'antialiased' }}>
      <AnimatePresence>
        {isLoading && <BootLoader progress={progress} liteMode={liteMode} />}
      </AnimatePresence>

      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-linear-to-r from-cyan-500 to-purple-500 z-[70] origin-left"
        style={{ scaleX: progressScaleX, opacity: progressGlow }}
      />

      <Background liteMode={liteMode} />

      <div className="relative z-10 w-full">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-20 pb-28 lg:pb-12">
          <ScrollDepthSection direction={1} disabled={liteMode}><Hero liteMode={liteMode} /></ScrollDepthSection>
          <ScrollDepthSection direction={-1} disabled={liteMode}><About /></ScrollDepthSection>
          <ScrollDepthSection direction={1} disabled={liteMode}><Education /></ScrollDepthSection>
          <ScrollDepthSection direction={-1} disabled={liteMode}><Skills /></ScrollDepthSection>
          <ScrollDepthSection direction={1} disabled={liteMode}><Projects /></ScrollDepthSection>
          <ScrollDepthSection direction={-1} disabled={liteMode}><Contact /></ScrollDepthSection>
        </div>

        <footer className="py-20 border-t border-white/5 text-center">
          <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.5em]">
            Ritik Kumar // 2026 // Portfolio
          </p>
        </footer>
      </div>

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed right-6 bottom-24 lg:bottom-10 z-[60] p-4 bg-slate-900/80 border border-white/10 rounded-2xl text-cyan-400 backdrop-blur-xl shadow-2xl transition-transform active:scale-90"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;