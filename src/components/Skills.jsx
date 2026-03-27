import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

/* ── Categorized skill data ── */
const skillCategories = {
  all: { label: 'All', icon: '⚡' },
  frontend: { label: 'Frontend', icon: '🎨' },
  backend: { label: 'Backend', icon: '⚙️' },
  database: { label: 'Database', icon: '🗄️' },
  tech: { label: 'Tech', icon: '🔧' },
  languages: { label: 'Languages', icon: '💻' },
};

const skills = [
  // Frontend
  { id: 1, name: 'React', color: '#61DAFB', category: 'frontend' },
  { id: 2, name: 'Next.js', color: '#ffffff', category: 'frontend' },
  { id: 3, name: 'Tailwind', color: '#38BDF8', category: 'frontend' },
  { id: 4, name: 'Framer', color: '#BB4B96', category: 'frontend' },
  { id: 5, name: 'Flutter', color: '#02569B', category: 'frontend' },
  { id: 6, name: 'HTML', color: '#E34F26', category: 'frontend' },
  { id: 7, name: 'CSS', color: '#264DE4', category: 'frontend' },

  // Backend
  { id: 8, name: 'Node.js', color: '#68A063', category: 'backend' },
  { id: 9, name: 'Express', color: '#ffffff', category: 'backend' },
  { id: 10, name: 'FastAPI', color: '#009688', category: 'backend' },

  // Database
  { id: 11, name: 'PostgreSQL', color: '#336791', category: 'database' },
  { id: 12, name: 'MongoDB', color: '#4DB33D', category: 'database' },
  { id: 13, name: 'Redis', color: '#DC382D', category: 'database' },
  { id: 14, name: 'Firebase', color: '#FFCA28', category: 'database' },

  // Tech/Tools
  { id: 15, name: 'Docker', color: '#2496ED', category: 'tech' },
  { id: 16, name: 'Git', color: '#F05032', category: 'tech' },
  { id: 17, name: 'GitHub', color: '#ffffff', category: 'tech' },
  { id: 18, name: 'Vercel', color: '#ffffff', category: 'tech' },
  { id: 19, name: 'Figma', color: '#A259FF', category: 'tech' },
  { id: 20, name: 'VS Code', color: '#007ACC', category: 'tech' },

  // Languages
  { id: 21, name: 'JavaScript', color: '#F7DF1E', category: 'languages' },
  { id: 22, name: 'TypeScript', color: '#3178C6', category: 'languages' },
  { id: 23, name: 'Python', color: '#3776AB', category: 'languages' },
  { id: 24, name: 'Java', color: '#ED8B00', category: 'languages' },
  { id: 25, name: 'C++', color: '#00599C', category: 'languages' },
  { id: 26, name: 'C', color: '#0175C2', category: 'languages' },
];

/* ── Draws the wireframe sphere on a <canvas> ── */
function drawGlobe(ctx, w, h, time) {
  const cx = w / 2;
  const cy = h / 2;
  const r = Math.min(w, h) * 0.42;

  ctx.clearRect(0, 0, w, h);
  ctx.strokeStyle = 'rgba(100,140,220,0.15)';
  ctx.lineWidth = 1;

  // horizontal latitude lines
  for (let i = -4; i <= 4; i++) {
    const lat = (i / 4) * (Math.PI / 2);
    const ry = r * Math.cos(lat);
    const py = cy - r * Math.sin(lat);
    ctx.beginPath();
    ctx.ellipse(cx, py, ry, ry * 0.25, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  // vertical longitude lines that rotate
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI + time * 0.15;
    ctx.beginPath();
    for (let t = 0; t <= 64; t++) {
      const phi = (t / 64) * Math.PI * 2;
      const x3 = r * Math.cos(phi) * Math.sin(angle);
      const z3 = r * Math.cos(phi) * Math.cos(angle);
      const y3 = r * Math.sin(phi);
      const scale = 1 / (1 + z3 * 0.0008);
      const sx = cx + x3 * scale;
      const sy = cy - y3 * scale;
      t === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
    }
    ctx.stroke();
  }

  // outer circle
  ctx.strokeStyle = 'rgba(100,140,220,0.22)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();
}

/* ── The globe canvas component ── */
const GlobeCanvas = ({ size }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frame;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const loop = (t) => {
      drawGlobe(ctx, size, size, t / 1000);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{ width: size, height: size }}
    />
  );
};

/* ── A single floating skill icon perfectly placed on the sphere ── */
const SkillIcon = ({ skill, index, total, globeSize }) => {
  // Fibonacci sphere distribution for perfect even spacing
  const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle ~2.39996
  const y = 1 - (index / Math.max(total - 1, 1)) * 2; // y goes from 1 to -1
  const radiusAtY = Math.sqrt(1 - y * y);
  const theta = phi * index;

  const x = Math.cos(theta) * radiusAtY;
  const z = Math.sin(theta) * radiusAtY;

  const spread = Math.max(105, globeSize * 0.34);
  const baseX = x * spread;
  const baseY = y * spread;
  const baseZ = z * spread;

  const duration = 25; // uniform rotation speed
  const delay = -(index / total) * duration;
  const isCompact = globeSize < 420;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      className="skill-orbit-item absolute top-1/2 left-1/2"
      style={{
        '--bx': `${baseX}px`,
        '--by': `${baseY}px`,
        '--bz': `${baseZ}px`,
        animation: `orbitSkill ${duration}s linear ${delay}s infinite`,
      }}
    >
      <div
        className={`flex flex-col items-center ${isCompact ? 'gap-0.5' : 'gap-1'} select-none transition-transform duration-300 hover:scale-125 cursor-pointer`}
        title={skill.name}
      >
        <div
          className={`${isCompact ? 'w-8 h-8 text-[8px] rounded-lg' : 'w-11 h-11 text-[10px] rounded-xl'} flex items-center justify-center font-black tracking-wide shadow-lg backdrop-blur-md border border-white/20`}
          style={{
            background: `linear-gradient(135deg, ${skill.color}33, ${skill.color}11)`,
            boxShadow: `0 0 20px ${skill.color}44, inset 0 0 20px ${skill.color}11`,
          }}
        >
          <span style={{ color: skill.color, textShadow: `0 0 10px ${skill.color}` }}>
            {skill.name.slice(0, 2).toUpperCase()}
          </span>
        </div>
        <span className={`${isCompact ? 'text-[7px]' : 'text-[9px]'} font-bold uppercase tracking-wider text-gray-400 whitespace-nowrap`}>
          {skill.name}
        </span>
      </div>
    </motion.div>
  );
};

/* ── Filter Button Component ── */
const FilterButton = ({ category, label, icon, isActive, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    aria-pressed={isActive}
    className={`
      px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300
      flex items-center gap-2 border relative overflow-hidden
      ${isActive
        ? 'bg-linear-to-r from-cyan-500 via-sky-500 to-emerald-500 text-slate-950 border-transparent shadow-lg shadow-cyan-500/35'
        : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:text-white hover:border-cyan-400/35'
      }
    `}
  >
    {isActive ? <span className="absolute inset-0 bg-linear-to-r from-white/25 to-transparent opacity-30" /> : null}
    <span>{icon}</span>
    <span>{label}</span>
  </motion.button>
);

/* ── Main section ── */
const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [globeSize, setGlobeSize] = useState(520);

  useEffect(() => {
    const resizeGlobe = () => {
      const nextSize = Math.min(Math.max(window.innerWidth - 40, 300), 580);
      setGlobeSize(nextSize);
    };

    resizeGlobe();
    window.addEventListener('resize', resizeGlobe);
    return () => window.removeEventListener('resize', resizeGlobe);
  }, []);

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter(skill => skill.category === activeCategory);

  return (
    <section id="skills" className="py-16 md:py-20 overflow-hidden">
      {/* heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-gray-400 mb-4">
          Tech Stack
        </p>
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black">
          My{' '}
          <span className="bg-linear-to-r from-cyan-300 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
            Skills
          </span>
        </h2>
        <p className="mt-5 text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
          Interactive 3D skill sphere with category filters and live orbit motion.
        </p>
      </motion.div>

      {/* Filter buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="flex flex-wrap justify-center gap-3 mb-8 px-4"
      >
        {Object.entries(skillCategories).map(([key, { label, icon }]) => (
          <FilterButton
            key={key}
            category={key}
            label={label}
            icon={icon}
            isActive={activeCategory === key}
            onClick={() => setActiveCategory(key)}
          />
        ))}
      </motion.div>

      {/* Skills count indicator */}
      <motion.p
        key={activeCategory}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-gray-500 text-sm mb-4"
      >
        Showing {filteredSkills.length} {filteredSkills.length === 1 ? 'skill' : 'skills'}
      </motion.p>

      {/* globe container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="relative mx-auto"
        style={{ width: globeSize, height: globeSize }}
      >
        {/* wireframe globe */}
        <GlobeCanvas size={globeSize * 0.9} />

        {/* radial glow behind globe */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-600/12 blur-[100px]"
            style={{ width: globeSize * 0.66, height: globeSize * 0.66 }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-600/14 blur-[60px]"
            style={{ width: globeSize * 0.45, height: globeSize * 0.45 }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/20"
            style={{ width: globeSize * 0.74, height: globeSize * 0.74 }}
          />
        </div>

        {/* orbiting skill icons */}
        <div className="absolute inset-0 globe-scene" style={{ height: globeSize }}>
          <AnimatePresence mode="sync">
            {filteredSkills.map((skill, i) => (
              <SkillIcon
                key={`skill-${skill.id}`}
                skill={skill}
                index={i}
                total={filteredSkills.length}
                globeSize={globeSize}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Geometric accent shapes around globe */}
        <motion.div
          className="absolute -top-20 -right-16 w-32 h-32 border-2 border-cyan-500/30"
          style={{ clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' }}
          animate={{ rotate: 360, opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        />
        
        <motion.div
          className="absolute -bottom-12 -left-20 w-28 h-28 border border-purple-500/25"
          animate={{ rotate: -360, scale: [1, 1.2, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
          style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }}
        />

        <motion.div
          className="absolute top-0 left-1/4 w-16 h-16 border-2 border-emerald-500/35 rounded-full"
          animate={{ y: [-20, 20, -20], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Bottom accent shapes */}
      <motion.div
        className="absolute bottom-8 right-16 w-20 h-20 border border-orange-500/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
      />
    </section>
  );
};

export default Skills;
