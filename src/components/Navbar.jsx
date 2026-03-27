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
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !clickLockedSectionRef.current) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    navLinks.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Desktop Vertical Navigation */}
      <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
        <div className="flex flex-col gap-4 p-3 bg-slate-900/40 border border-white/5 backdrop-blur-xl rounded-2xl shadow-2xl">
          {navLinks.map((link) => (
            <div key={link.id} className="relative group">
              <a
                href={`#${link.id}`}
                onClick={(event) => handleNavClick(event, link.id)}
                className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 ${
                  activeSection === link.id
                    ? 'bg-linear-to-br from-cyan-400 to-blue-500 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.5)]'
                    : 'text-zinc-500 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.icon}
              </a>
              
              <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-900 border border-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                <span className="text-xs font-bold uppercase tracking-widest text-white">
                  {link.label}
                </span>
                <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-900 border-r border-t border-white/10 rotate-45" />
              </div>
            </div>
          ))}
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav
        className="fixed inset-x-0 z-50 px-3 lg:hidden pointer-events-none overflow-hidden"
        style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 0.75rem)' }}
      >
        <div className="mx-auto grid grid-cols-6 items-center gap-1 p-2 bg-slate-950/80 border border-white/10 backdrop-blur-2xl rounded-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] max-w-md pointer-events-auto">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(event) => handleNavClick(event, link.id)}
              className={`h-12 px-1 flex flex-col items-center justify-center rounded-xl transition-all duration-300 ${
                activeSection === link.id
                  ? 'bg-linear-to-br from-cyan-400 via-blue-500 to-purple-500 text-white shadow-[0_0_16px_rgba(34,211,238,0.4)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <div className={`${activeSection === link.id ? 'scale-110' : 'scale-100'} transition-transform duration-300`}>
                {link.icon}
              </div>
              <span className={`text-[8px] mt-1 font-bold uppercase tracking-tighter ${activeSection === link.id ? 'opacity-100' : 'opacity-0 h-0'} transition-all duration-300`}>
                {link.label}
              </span>
            </a>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;