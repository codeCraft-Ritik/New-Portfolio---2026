import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, BookOpen, Cpu, Layout, MessageSquare, Code2 } from 'lucide-react';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const clickLockedSectionRef = useRef(null);
  const clickLockTimeoutRef = useRef(null);

  const handleNavClick = (event, sectionId) => {
    event.preventDefault();
    const target = document.getElementById(sectionId);
    if (!target) return;

    clickLockedSectionRef.current = sectionId;
    clearTimeout(clickLockTimeoutRef.current);
    clickLockTimeoutRef.current = setTimeout(() => {
      clickLockedSectionRef.current = null;
    }, 1400);

    setActiveSection(sectionId);
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (window.location.hash !== `#${sectionId}`) {
      window.history.replaceState(null, '', `#${sectionId}`);
    }
  };

  const navLinks = [
    { id: 'home', icon: <Home size={20} />, label: 'Home' },
    { id: 'about', icon: <Code2 size={20} />, label: 'About' },
    { id: 'education', icon: <BookOpen size={20} />, label: 'Education' },
    { id: 'skills', icon: <Cpu size={20} />, label: 'Skills' },
    { id: 'projects', icon: <Layout size={20} />, label: 'Projects' },
    { id: 'contact', icon: <MessageSquare size={20} />, label: 'Contact' },
  ];

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter(Boolean);

    if (typeof window.IntersectionObserver !== 'function') {
      setActiveSection(sections[0]?.id || 'home');
      return () => {
        clearTimeout(clickLockTimeoutRef.current);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const lockedSection = clickLockedSectionRef.current;
        if (lockedSection) {
          const lockedEntry = entries.find((entry) => entry.target.id === lockedSection);
          if (lockedEntry?.isIntersecting && lockedEntry.intersectionRatio >= 0.35) {
            setActiveSection(lockedSection);
            clickLockedSectionRef.current = null;
            clearTimeout(clickLockTimeoutRef.current);
          }
          return;
        }

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        threshold: [0.2, 0.45, 0.65],
        rootMargin: '-10% 0px -45% 0px',
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      clearTimeout(clickLockTimeoutRef.current);
    };
  }, []);

  return (
    <>
      <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
        <div className="flex flex-col gap-4 p-3 bg-white/2 border border-white/10 backdrop-blur-2xl rounded-full shadow-2xl">
          {navLinks.map((link) => (
            <div key={link.id} className="relative group flex items-center justify-center">
              {/* Tooltip / Label */}
              <AnimatePresence>
                <div className="absolute right-14 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                  <div className="bg-white/5 border border-white/10 backdrop-blur-md px-4 py-2 rounded-xl">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400 whitespace-nowrap">
                      {link.label}
                    </span>
                  </div>
                </div>
              </AnimatePresence>

              {/* Icon Button */}
              <a
                href={`#${link.id}`}
                onClick={(event) => handleNavClick(event, link.id)}
                className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-500 ${
                  activeSection === link.id
                    ? 'bg-linear-to-br from-cyan-400 to-emerald-400 text-slate-950 shadow-[0_0_22px_rgba(34,211,238,0.5)]'
                    : 'text-zinc-500 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.icon}
              </a>
            </div>
          ))}
        </div>
      </nav>

      <nav
        className="fixed inset-x-0 z-50 px-3 lg:hidden pointer-events-none"
        style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 0.75rem)' }}
      >
        <div className="mx-auto grid grid-cols-6 items-center gap-1 p-2 bg-slate-900/75 border border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl max-w-md pointer-events-auto">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(event) => handleNavClick(event, link.id)}
              className={`h-12 px-1.5 flex flex-col items-center justify-center rounded-xl transition-all duration-300 ${
                activeSection === link.id
                  ? 'bg-linear-to-br from-cyan-400 to-emerald-400 text-slate-950 shadow-[0_0_16px_rgba(34,211,238,0.5)]'
                  : 'text-zinc-300 hover:text-white hover:bg-white/10'
              }`}
              aria-label={link.label}
            >
              <span className="scale-90">{link.icon}</span>
              <span className="text-[8px] font-bold uppercase tracking-wide leading-none mt-0.5">{link.label}</span>
            </a>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;