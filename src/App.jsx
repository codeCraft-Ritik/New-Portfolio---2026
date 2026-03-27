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
    progress < 35 ? 'Booting visual engine' : progress < 70 ? 'Loading creative modules' : 'Polishing final pixels';
  const activeStep = progress < 34 ? 0 : progress < 68 ? 1 : 2;
  const statusCode = progress < 25 ? 'SYS-CAL-01' : progress < 55 ? 'VFX-LINK-72' : progress < 85 ? 'HUD-MESH-33' : 'READY-000';
  const etaSeconds = Math.max(0, Math.ceil((100 - progress) * 0.032));
  const stageSteps = ['Initialize', 'Render Systems', 'Launch Experience'];
  const dataStreams = ['GPU Sync', 'Motion Core', 'UI Matrix'];
  const briefings = ['Shaders', 'Typography', 'Interactions', 'Narrative', 'Polish'];
  const sparks = useMemo(
    () =>
      Array.from({ length: liteMode ? 10 : 18 }, (_, idx) => ({
        id: idx,
        x: `${6 + ((idx * 11) % 88)}%`,
        y: `${8 + ((idx * 17) % 80)}%`,
        delay: `${-(idx * 0.22)}s`,
        duration: `${3 + (idx % 5) * 0.45}s`,
      })),
    [liteMode]
  );
  const starfield = useMemo(
    () =>
      Array.from({ length: liteMode ? 12 : 26 }, (_, idx) => ({
        id: idx,
        x: `${2 + ((idx * 17) % 94)}%`,
        y: `${4 + ((idx * 13) % 90)}%`,
        delay: `${-(idx * 0.18)}s`,
        size: `${1.2 + (idx % 3) * 1.1}px`,
      })),
    [liteMode]
  );
  const binaryColumns = useMemo(
    () =>
      Array.from({ length: liteMode ? 4 : 9 }, (_, idx) => ({
        id: idx,
        x: `${6 + idx * 10.5}%`,
        delay: `${-(idx * 0.85)}s`,
        duration: `${6.8 + (idx % 4) * 1.1}s`,
      })),
    [liteMode]
  );
  const equalizer = useMemo(
    () => Array.from({ length: liteMode ? 10 : 18 }, (_, idx) => ({ id: idx, delay: `${idx * 0.09}s` })),
    [liteMode]
  );
  const shards = [
    { x: '8%', y: '20%', delay: '0s', color: 'cyan' },
    { x: '18%', y: '76%', delay: '-1.4s', color: 'amber' },
    { x: '31%', y: '34%', delay: '-0.8s', color: 'emerald' },
    { x: '42%', y: '12%', delay: '-2.2s', color: 'cyan' },
    { x: '58%', y: '83%', delay: '-1.8s', color: 'amber' },
    { x: '71%', y: '28%', delay: '-2.8s', color: 'emerald' },
    { x: '84%', y: '64%', delay: '-0.4s', color: 'cyan' },
    { x: '92%', y: '18%', delay: '-3.1s', color: 'amber' },
  ];

  return (
    <motion.div
      className="boot-loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
    >
      <div className="boot-loader__noise" />
      <div className="boot-loader__grid" />
      <div className="boot-loader__scanline" />
      <div className="boot-loader__halo" />
      <div className="boot-loader__vignette" />
      <div className="boot-loader__beam boot-loader__beam--cyan" />
      <div className="boot-loader__beam boot-loader__beam--amber" />

      <div className="boot-loader__starfield" aria-hidden="true">
        {starfield.map((star) => (
          <span
            key={`star-${star.id}`}
            className="boot-loader__star"
            style={{ '--sx': star.x, '--sy': star.y, '--sd': star.delay, '--ss': star.size }}
          />
        ))}
      </div>

      {!liteMode && <div className="boot-loader__binary" aria-hidden="true">
        {binaryColumns.map((column) => (
          <span
            key={`binary-${column.id}`}
            className="boot-loader__binary-col"
            style={{ '--bx': column.x, '--bd': column.delay, '--bt': column.duration }}
          >
            101101001011011010010110
          </span>
        ))}
      </div>}

      {!liteMode && <div className="boot-loader__radar" aria-hidden="true">
        <span className="boot-loader__radar-sweep" />
      </div>}

      {!liteMode && <div className="boot-loader__sparks">
        {sparks.map((spark) => (
          <span
            key={`spark-${spark.id}`}
            className="boot-loader__spark"
            style={{ '--px': spark.x, '--py': spark.y, '--pd': spark.delay, '--pt': spark.duration }}
          />
        ))}
      </div>}

      {!liteMode && <div className="boot-loader__shards">
        {shards.map((shard, index) => (
          <span
            key={`shard-${index}`}
            className={`boot-loader__shard boot-loader__shard--${shard.color}`}
            style={{ '--sx': shard.x, '--sy': shard.y, '--sd': shard.delay }}
          />
        ))}
      </div>}

      <div className="boot-loader__center">
        <div className="boot-loader__pulse" style={{ '--progress': progress / 100 }} />
        <div className="boot-loader__orbiter boot-loader__orbiter--outer" />
        <div className="boot-loader__orbiter boot-loader__orbiter--inner" />
        <div className="boot-loader__orbiter boot-loader__orbiter--dash" />

        <div className="boot-loader__rings">
          <span />
          <span />
          <span />
        </div>

        <div className="boot-loader__core">
          <span className="boot-loader__brand">RK</span>
          <span className="boot-loader__sub">Portfolio Experience</span>
        </div>

        <span className="boot-loader__ticker" aria-hidden="true">
          SYSTEM ONLINE
        </span>
      </div>

      <div className="boot-loader__hud">
        <AnimatePresence mode="wait">
          <motion.p
            key={phase}
            className="boot-loader__phase"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28 }}
          >
            {phase}
          </motion.p>
        </AnimatePresence>
        <div className="boot-loader__progress-track">
          <motion.div
            className="boot-loader__progress-fill"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 20, mass: 0.6 }}
          />
        </div>
        <div className="boot-loader__meta">
          <span>Starting portfolio...</span>
          <span className="boot-loader__percent">{Math.round(progress)}%</span>
        </div>

        <div className="boot-loader__telemetry" aria-hidden="true">
          <span>Code: {statusCode}</span>
          <span>ETA: {etaSeconds}s</span>
          <span>FPS: 120</span>
        </div>

        <div className="boot-loader__streams" aria-hidden="true">
          {dataStreams.map((stream, idx) => (
            <span key={stream} className="boot-loader__stream" style={{ '--stream-delay': `${idx * 0.12}s` }}>
              {stream}
            </span>
          ))}
        </div>

        <div className="boot-loader__steps" aria-hidden="true">
          {stageSteps.map((step, index) => (
            <div
              key={step}
              className={`boot-loader__step ${index <= activeStep ? 'is-active' : ''} ${index === activeStep ? 'is-current' : ''}`}
            >
              <span className="boot-loader__step-dot" />
              <span>{step}</span>
            </div>
          ))}
        </div>

        {!liteMode && <div className="boot-loader__equalizer" aria-hidden="true">
          {equalizer.map((bar) => (
            <span key={`bar-${bar.id}`} className="boot-loader__bar" style={{ '--bar-delay': bar.delay }} />
          ))}
        </div>}

        {!liteMode && <div className="boot-loader__briefings" aria-hidden="true">
          {briefings.map((item, idx) => (
            <span key={item} style={{ '--brief-delay': `${idx * 0.08}s` }}>
              {item}
            </span>
          ))}
        </div>}
      </div>
    </motion.div>
  );
};

const ScrollDepthSection = ({ children, className = '', intensity = 70, direction = 1, disabled = false, ...rest }) => {
  const targetRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = !disabled && !prefersReducedMotion;
  const entryY = Math.round(intensity * direction * 0.35);

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
      initial={{ opacity: 0.7, y: entryY, scale: 0.98, rotateX: direction * 2 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      <motion.span
        className="scroll-depth-glint"
        initial={{ opacity: 0, scaleX: 0.86 }}
        whileInView={{ opacity: 0.35, scaleX: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.65, delay: 0.08 }}
      />
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
    stiffness: 120,
    damping: 28,
    mass: 0.45,
  });
  const progressGlow = useTransform(scrollYProgress, [0, 1], [0.45, 1]);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      setLiteMode(true);
      return undefined;
    }

    const mediaQuery = window.matchMedia('(max-width: 1023px), (pointer: coarse), (hover: none), (prefers-reduced-motion: reduce)');

    const syncMode = () => setLiteMode(mediaQuery.matches);
    syncMode();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', syncMode);
      return () => mediaQuery.removeEventListener('change', syncMode);
    }

    mediaQuery.addListener(syncMode);
    return () => mediaQuery.removeListener(syncMode);
  }, []);

  useEffect(() => {
    let rafId;
    let finishTimeout;
    let fallbackFinishTimeout;
    let startTime = 0;
    let pageReady = document.readyState === 'complete';
    let cancelled = false;

    const minLoaderDuration = liteMode ? 900 : 1400;
    const maxLoaderDuration = liteMode ? 2200 : 2800;

    const onPageReady = () => {
      pageReady = true;
    };

    window.addEventListener('load', onPageReady, { once: true });

    // Always guarantee loader exit even if RAF or onload behaves differently on some mobile browsers.
    fallbackFinishTimeout = setTimeout(() => {
      if (cancelled) return;
      setProgress(100);
      setIsLoading(false);
    }, maxLoaderDuration + 600);

    const tick = (timestamp) => {
      if (cancelled) return;

      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      const targetProgress = pageReady
        ? 100
        : Math.min(92, (elapsed / maxLoaderDuration) * 92);

      setProgress((prev) => (targetProgress > prev ? targetProgress : prev));

      const shouldFinish = (pageReady && elapsed >= minLoaderDuration) || elapsed >= maxLoaderDuration;

      if (shouldFinish) {
        setProgress(100);
        finishTimeout = setTimeout(() => {
          if (!cancelled) setIsLoading(false);
        }, 240);
        return;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      window.removeEventListener('load', onPageReady);
      cancelAnimationFrame(rafId);
      clearTimeout(finishTimeout);
      clearTimeout(fallbackFinishTimeout);
    };
  }, [liteMode]);

  useEffect(() => {
    if (isLoading || liteMode) return undefined;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      smoothTouch: false,
    });

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
    const forceReveal = () => {
      revealElements.forEach((el) => {
        el.classList.add('is-visible');
      });
    };

    if (typeof window.IntersectionObserver !== 'function') {
      forceReveal();
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const delay = entry.target.getAttribute('data-reveal-delay') || '0';
          entry.target.style.setProperty('--reveal-delay', `${delay}ms`);
          entry.target.classList.add('is-visible');
          observerInstance.unobserve(entry.target);
        });
      },
      {
        root: null,
        threshold: 0.05,
        rootMargin: '0px 0px 0px 0px',
      }
    );

    revealElements.forEach((el) => observer.observe(el));

    // Fallback: guarantee all sections become visible even if IO callbacks are skipped.
    const fallbackTimer = window.setTimeout(forceReveal, 1800);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallbackTimer);
    };
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) return undefined;

    const updateScrollProgress = () => setShowBackToTop(window.scrollY > 540);

    updateScrollProgress();
    window.addEventListener('scroll', updateScrollProgress, { passive: true });

    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, [isLoading]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="relative bg-slate-950 min-h-svh overflow-x-clip text-slate-200 selection:bg-cyan-500/30">
      <AnimatePresence>{isLoading && <BootLoader progress={progress} liteMode={liteMode} />}</AnimatePresence>

      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 origin-left"
        style={{
          height: 3,
          zIndex: 70,
          scaleX: progressScaleX,
          opacity: progressGlow,
          background:
            'linear-gradient(90deg, rgba(249,115,22,0.95), rgba(34,211,238,0.95), rgba(16,185,129,0.95))',
          boxShadow: '0 0 16px rgba(34,211,238,0.52)',
        }}
      />

      {/* Animated Background */}
      <Background liteMode={liteMode} />

        <div className="relative z-10">
        <Navbar />
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 space-y-12 sm:space-y-16 md:space-y-24 pb-28 md:pb-12 lg:pb-0">
          <ScrollDepthSection data-reveal data-reveal-delay="0" intensity={liteMode ? 24 : 60} direction={1} disabled={liteMode}>
            <Hero liteMode={liteMode} />
          </ScrollDepthSection>
          <ScrollDepthSection data-reveal data-reveal-delay="80" intensity={liteMode ? 26 : 66} direction={-1} disabled={liteMode}>
            <About />
          </ScrollDepthSection>
          <ScrollDepthSection data-reveal data-reveal-delay="100" intensity={liteMode ? 28 : 72} direction={1} disabled={liteMode}>
            <Education />
          </ScrollDepthSection>
          <ScrollDepthSection data-reveal data-reveal-delay="120" intensity={liteMode ? 30 : 76} direction={-1} disabled={liteMode}>
            <Skills />
          </ScrollDepthSection>
          <ScrollDepthSection data-reveal data-reveal-delay="140" intensity={liteMode ? 32 : 82} direction={1} disabled={liteMode}>
            <Projects />
          </ScrollDepthSection>
          <ScrollDepthSection data-reveal data-reveal-delay="160" intensity={liteMode ? 28 : 70} direction={-1} disabled={liteMode}>
            <Contact />
          </ScrollDepthSection>
        </div>

        <footer className="py-20 border-t border-white/5 text-center relative" data-reveal data-reveal-delay="80">
          <div className="absolute inset-0 bg-linear-to-t from-cyan-500/5 to-transparent pointer-events-none" />
          <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.5em] relative z-10">
            Ritik Kumar // 2026 // Portfolio
          </p>
          
        </footer>
      </div>

      <AnimatePresence>
        {showBackToTop && !isLoading ? (
          <motion.button
            key="scroll-top"
            type="button"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 28, scale: 0.86 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            transition={{ duration: 0.25 }}
              className="fixed right-4 md:right-8 z-60 h-12 w-12 rounded-2xl border border-cyan-400/35 bg-slate-900/70 text-cyan-300 backdrop-blur-xl transition-all hover:-translate-y-1 hover:text-white hover:border-cyan-300 hover:shadow-[0_0_22px_rgba(34,211,238,0.35)]"
              style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 5.25rem)' }}
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5 mx-auto" />
          </motion.button>
        ) : null}
      </AnimatePresence>
    </main>
  );
}

export default App;