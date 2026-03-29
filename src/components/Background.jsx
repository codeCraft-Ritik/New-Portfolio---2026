import { useEffect, useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

// Animated particle canvas
const ParticleCanvas = ({ disabled = false }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Disable canvas animations on mobile for better performance
    if (disabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    let streaks = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    // Particle class
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.hue = Math.random() * 170 + 160; // Teal, sky, violet, and amber accents
        this.pulseSpeed = Math.random() * 0.03 + 0.01;
        this.pulseOffset = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        const pulse = 0.65 + Math.sin(Date.now() * this.pulseSpeed + this.pulseOffset) * 0.35;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 82%, 62%, ${this.opacity * pulse})`;
        ctx.fill();
      }
    }

    class LightStreak {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.length = Math.random() * 110 + 80;
        this.x = Math.random() * canvas.width;
        this.y = initial ? Math.random() * canvas.height : -this.length;
        this.speedY = Math.random() * 1.3 + 1.2;
        this.opacity = Math.random() * 0.28 + 0.12;
        this.hue = Math.random() > 0.5 ? 192 : 26;
      }

      update() {
        this.y += this.speedY;
        this.x += Math.sin(this.y * 0.01) * 0.25;
        if (this.y > canvas.height + this.length) this.reset();
      }

      draw() {
        const gradient = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.length);
        gradient.addColorStop(0, `hsla(${this.hue}, 90%, 70%, 0)`);
        gradient.addColorStop(0.4, `hsla(${this.hue}, 90%, 70%, ${this.opacity})`);
        gradient.addColorStop(1, `hsla(${this.hue}, 90%, 70%, 0)`);

        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.2;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + 8, this.y + this.length);
        ctx.stroke();
      }
    }

    const buildScene = () => {
      particles = [];
      streaks = [];

      const particleCount = Math.min(95, Math.floor((canvas.width * canvas.height) / 14000));
      const streakCount = Math.min(14, Math.max(6, Math.floor(canvas.width / 230)));

      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }

      for (let i = 0; i < streakCount; i++) {
        streaks.push(new LightStreak());
      }
    };

    // Create particles
    buildScene();

    // Draw connections between nearby particles
    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `hsla(${(particles[i].hue + particles[j].hue) / 2}, 85%, 60%, ${0.12 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      streaks.forEach(streak => {
        streak.update();
        streak.draw();
      });

      drawConnections();
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      resize();
      buildScene();
    };

    window.removeEventListener('resize', resize);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
};

// Main Background Component
const Background = ({ liteMode = false }) => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const reducedFX = prefersReducedMotion || liteMode;
  const layerNearRaw = useTransform(scrollYProgress, [0, 1], reducedFX ? [0, 0] : [0, -130]);
  const layerMidRaw = useTransform(scrollYProgress, [0, 1], reducedFX ? [0, 0] : [0, -82]);
  const layerFarRaw = useTransform(scrollYProgress, [0, 1], reducedFX ? [0, 0] : [0, -46]);
  const auroraRaw = useTransform(scrollYProgress, [0, 1], reducedFX ? [0, 0] : [0, -72]);
  const horizonRaw = useTransform(scrollYProgress, [0, 1], reducedFX ? [0, 0] : [0, -95]);
  const noiseOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.012, 0.018, 0.024]);

  const layerNear = useSpring(layerNearRaw, { stiffness: 65, damping: 18, mass: 0.7 });
  const layerMid = useSpring(layerMidRaw, { stiffness: 70, damping: 20, mass: 0.75 });
  const layerFar = useSpring(layerFarRaw, { stiffness: 72, damping: 22, mass: 0.8 });
  const auroraY = useSpring(auroraRaw, { stiffness: 58, damping: 18, mass: 0.8 });
  const horizonY = useSpring(horizonRaw, { stiffness: 62, damping: 20, mass: 0.86 });

  const pointerXSmooth = useSpring(pointerX, { stiffness: 85, damping: 20, mass: 0.5 });
  const pointerYSmooth = useSpring(pointerY, { stiffness: 85, damping: 20, mass: 0.5 });
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${pointerXSmooth}px ${pointerYSmooth}px, rgba(56, 189, 248, 0.14), rgba(249, 115, 22, 0.08) 40%, transparent 74%)`;

  useEffect(() => {
    if (reducedFX) return;

    const setCenter = () => {
      pointerX.set(window.innerWidth * 0.5);
      pointerY.set(window.innerHeight * 0.38);
    };

    setCenter();

    const handleMove = event => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('resize', setCenter);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('resize', setCenter);
    };
  }, [pointerX, pointerY, reducedFX]);

  const holoRings = [
    { size: 'min(62vw, 660px)', delay: '0s', border: 'rgba(34, 211, 238, 0.24)' },
    { size: 'min(52vw, 560px)', delay: '-2.2s', border: 'rgba(249, 115, 22, 0.24)' },
    { size: 'min(42vw, 460px)', delay: '-4.4s', border: 'rgba(16, 185, 129, 0.22)' },
  ];
  const mobileHoloRings = [
    { size: 'min(84vw, 420px)', border: 'rgba(34, 211, 238, 0.22)' },
    { size: 'min(70vw, 340px)', border: 'rgba(249, 115, 22, 0.2)' },
  ];

  const dataNodes = [
    { top: '16%', left: '18%', delay: '0s', color: 'rgba(34, 211, 238, 0.4)' },
    { top: '30%', left: '72%', delay: '-1.1s', color: 'rgba(249, 115, 22, 0.4)' },
    { top: '52%', left: '12%', delay: '-2.7s', color: 'rgba(16, 185, 129, 0.42)' },
    { top: '64%', left: '74%', delay: '-3.4s', color: 'rgba(167, 139, 250, 0.38)' },
    { top: '78%', left: '36%', delay: '-4.1s', color: 'rgba(56, 189, 248, 0.38)' },
  ];

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-slate-950" />

      {/* Pointer-reactive glow */}
      {!reducedFX && <motion.div className="absolute inset-0" style={{ background: spotlight }} />}

      {/* Animated gradient orbs */}
      <motion.div className="absolute inset-0" style={{ y: layerNear }}>
        {/* Warm amber orb */}
        <div className="absolute top-[-20%] left-[-10%] w-150 h-150 rounded-full bg-orange-500/20 blur-[120px] animate-float-slow" />

        {/* Sky orb */}
        <div className="absolute top-[30%] right-[-15%] w-125 h-125 rounded-full bg-sky-500/15 blur-[100px] animate-float-medium" />

        {/* Emerald orb */}
        <div className="absolute bottom-[-10%] left-[20%] w-175 h-175 rounded-full bg-emerald-500/12 blur-[150px] animate-float-reverse" />

        {/* Rose accent */}
        <div className="absolute top-[60%] right-[30%] w-75 h-75 rounded-full bg-rose-500/10 blur-[80px] animate-pulse-slow" />

        {/* Indigo accent */}
        <div className="absolute top-[10%] right-[40%] w-62.5 h-62.5 rounded-full bg-indigo-400/10 blur-[60px] animate-float-slow" />
      </motion.div>

      <motion.div
        className="absolute inset-0"
        style={{
          y: layerMid,
          background:
            'radial-gradient(ellipse 50% 36% at 60% 30%, rgba(56,189,248,0.14), transparent 70%), radial-gradient(ellipse 34% 30% at 30% 68%, rgba(16,185,129,0.1), transparent 75%)',
        }}
      />

      {/* Grid pattern overlay */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          y: layerFar,
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Horizon matrix lines */}
      {!liteMode && <motion.div className="absolute inset-x-0 bottom-[-8%] h-[58%]" style={{ y: horizonY }}>
        <div className="bg-horizon-grid absolute inset-0" />
      </motion.div>}

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(249, 115, 22, 0.14), transparent),
            radial-gradient(ellipse 60% 40% at 100% 100%, rgba(14, 165, 233, 0.12), transparent),
            radial-gradient(ellipse 50% 30% at 0% 50%, rgba(16, 185, 129, 0.09), transparent)
          `
        }}
      />

      {/* Noise texture */}
      <motion.div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          opacity: noiseOpacity,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Aurora effect at top */}
      <motion.div className="absolute top-0 left-0 right-0 h-125 overflow-hidden" style={{ y: auroraY }}>
        <div className="aurora-container">
          <div className="aurora aurora-1" />
          <div className="aurora aurora-2" />
          <div className="aurora aurora-3" />
        </div>
      </motion.div>

      {/* Particle canvas */}
      {!liteMode && <ParticleCanvas disabled={liteMode} />}

      {/* Holographic rings */}
      <motion.div className="absolute inset-0 flex items-center justify-center" style={{ y: layerFar }}>
        {(liteMode ? mobileHoloRings : holoRings).map((ring, index) => (
          <div
            key={`${ring.size}-${index}`}
            className={`${liteMode ? '' : 'animate-holo-ring'} absolute rounded-full`}
            style={{
              width: ring.size,
              height: ring.size,
              border: `1px solid ${ring.border}`,
              animationDelay: liteMode ? undefined : ring.delay,
              boxShadow: `inset 0 0 28px ${ring.border.replace('0.24', '0.14').replace('0.22', '0.12').replace('0.2', '0.1')}, 0 0 32px rgba(15, 23, 42, 0.35)`,
              opacity: liteMode ? 0.65 : 1,
            }}
          />
        ))}
      </motion.div>

      {/* Orbiting data nodes */}
      {!liteMode && <motion.div className="absolute inset-0" style={{ y: layerNear }}>
        {dataNodes.map(node => (
          <div
            key={`${node.top}-${node.left}`}
            className="animate-data-node absolute h-2.5 w-2.5 rounded-full"
            style={{
              top: node.top,
              left: node.left,
              background: node.color,
              boxShadow: `0 0 20px ${node.color}, 0 0 34px ${node.color}`,
              animationDelay: node.delay,
            }}
          />
        ))}
      </motion.div>}

      {/* Cinematic light streaks */}
      {!liteMode && <div className="absolute inset-0">
        <div className="animate-scan-streak absolute top-[18%] -left-[25%] h-px w-[45%]" />
        <div className="animate-scan-streak-reverse absolute top-[68%] -right-[30%] h-px w-[52%]" />
        <div className="animate-scan-streak absolute top-[86%] -left-[30%] h-px w-[36%] [animation-delay:-2.8s]" />
      </div>}

      {/* Floating geometric shapes */}
      <motion.div className="absolute inset-0 overflow-hidden" style={{ y: layerMid }}>
        {/* Rotating square top-left */}
        <div className="absolute top-[8%] left-[5%] w-28 h-28 border-2 border-cyan-500/25 animate-rotate-square" />

        {/* Rotating square reverse top-right */}
        <div className="absolute top-[12%] right-[8%] w-24 h-24 border-2 border-purple-500/25 animate-rotate-square-reverse" />

        {/* Hexagon shape middle-left */}
        <div
          className="absolute top-[35%] left-[12%] w-20 h-20 animate-hex-bounce"
          style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            border: '2px solid rgba(34, 211, 238, 0.35)',
            background: 'rgba(34, 211, 238, 0.08)',
          }}
        />

        {/* Morphing square middle-right */}
        <div
          className="absolute top-[40%] right-[10%] w-32 h-32 animate-morph-shape"
          style={{
            border: '2px solid rgba(249, 115, 22, 0.3)',
            background: 'rgba(249, 115, 22, 0.06)',
          }}
        />

        {/* Kinetic path shape bottom-left */}
        <div
          className="absolute bottom-[15%] left-[8%] w-16 h-16 animate-kinetic-path"
          style={{
            border: '2px solid rgba(16, 185, 129, 0.4)',
            background: 'rgba(16, 185, 129, 0.08)',
            borderRadius: '8px',
          }}
        />

        {/* Glow pulse circle bottom-right */}
        <div
          className="absolute bottom-[20%] right-[7%] w-36 h-36 rounded-full animate-glow-pulse"
          style={{
            border: '1.5px solid rgba(99, 102, 241, 0.25)',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, rgba(99, 102, 241, 0) 70%)',
          }}
        />

        {/* Perspective tilt square top-center */}
        <div
          className="absolute top-[28%] left-[45%] w-20 h-20 animate-perspective-tilt"
          style={{
            border: '2px solid rgba(139, 92, 246, 0.3)',
            background: 'rgba(139, 92, 246, 0.08)',
            transform: 'translateX(-50%)',
          }}
        />

        {/* Floating card shape center-right */}
        <div
          className="absolute top-[55%] right-[5%] w-40 h-32 animate-float-card rounded-3xl"
          style={{
            border: '2px solid rgba(34, 211, 238, 0.2)',
            background: 'rgba(34, 211, 238, 0.05)',
            boxShadow: '0 8px 32px rgba(34, 211, 238, 0.1)',
          }}
        />

        {/* Quantum flicker small square */}
        <div
          className="absolute top-[62%] left-[8%] w-12 h-12 animate-quantum-flicker"
          style={{
            border: '1.5px solid rgba(249, 115, 22, 0.4)',
            borderRadius: '4px',
          }}
        />

        {/* Rotating diamond bottom-center */}
        <div
          className="absolute bottom-[8%] left-1/2 w-24 h-24 animate-rotate-square-slow"
          style={{
            border: '2px solid rgba(16, 185, 129, 0.3)',
            background: 'rgba(16, 185, 129, 0.06)',
            transform: 'translateX(-50%) rotate(45deg)',
          }}
        />

        {/* Glow accent shape */}
        <div
          className="absolute top-[75%] right-[25%] w-14 h-14 animate-glow-pulse rounded-lg"
          style={{
            border: '1.5px solid rgba(99, 102, 241, 0.35)',
            background: 'rgba(99, 102, 241, 0.1)',
          }}
        />
      </motion.div>

      {/* Vignette effect */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(2, 6, 23, 0.4) 100%)'
        }}
      />

      {/* Scanline effect (subtle) */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.3) 2px, rgba(0, 0, 0, 0.3) 4px)',
        }}
      />
    </div>
  );
};

export default Background;
