import React, { useState, useEffect, useRef } from 'react';
import { Layers, Mail, Code, Smartphone, Cpu, Braces, User, MessageSquare, Sun, Moon, Github, Linkedin, Instagram, ArrowUpRight, Home, Lock, ArrowRight, ChevronUp, Award, X, Zap, CheckCircle, AlertCircle } from 'lucide-react';

// --- DADOS E CONSTANTES (Links Atualizados) ---
const SOCIAL_LINKS = [
  { id: 'gh', icon: Github, link: "https://github.com/Ort1zz", label: "Github" },
  { id: 'li', icon: Linkedin, link: "https://www.linkedin.com/in/lucas-ortiz-3043a7284/", label: "Linkedin" },
  { id: 'in', icon: Instagram, link: "https://www.instagram.com/ortlabs/", label: "Instagram" }
];

const NAV_ITEMS = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'sobre', icon: User, label: 'Sobre Mim' },
  { id: 'portfolio', icon: Code, label: 'Projetos' },
  { id: 'contato', icon: MessageSquare, label: 'Contato' }
];

const PROJECTS = [
  { id: 1, title: "VitaeSenior", category: "Health Tech", year: "2024", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80", description: "Plataforma de cuidado e gestão para saúde sênior.", tech: ["React", "Tailwind", "Node.js"], link: "https://www.vitaesenior.com.br", comingSoon: false },
  { id: 2, title: "ORTLabs", category: "Design & Dev", year: "2025", image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&q=80", description: "Portfólio imersivo com design de vidro e performance.", tech: ["React", "Vite", "Tailwind"], link: "https://www.ortzstudios.com.br", comingSoon: false },
  { id: 3, title: "Frizzo Corretora", category: "Fintech", year: "2023", image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?w=800&q=80", description: "Soluções inteligentes em seguros e gestão de apólices.", tech: ["HTML", "Tailwind", "React"], link: "#", comingSoon: true },
  { id: 4, title: "Luana Dias", category: "Portfólio", year: "2024", image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80", description: "Portfólio minimalista para marca pessoal.", tech: ["HTML", "CSS", "JS"], link: "#", comingSoon: true }
];

// --- STYLES ---
const getStyles = (isDark) => `
  :root {
    --glass-bg: ${isDark ? 'linear-gradient(145deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)' : 'linear-gradient(145deg, rgba(109, 40, 217, 0.05) 0%, rgba(109, 40, 217, 0.02) 100%)'};
    --glass-border: ${isDark ? 'rgba(216, 180, 254, 0.1)' : 'rgba(109, 40, 217, 0.2)'};
    --glass-shadow: ${isDark ? '0 15px 35px rgba(0, 0, 0, 0.5)' : '0 15px 35px rgba(109, 40, 217, 0.1)'};
    --glass-highlight: ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(109, 40, 217, 0.1)'};
    
    --text-primary: ${isDark ? '#e9d5ff' : '#581c87'};
    --text-secondary: ${isDark ? '#94a3b8' : '#475569'};
    --accent: ${isDark ? '#d8b4fe' : '#7c3aed'};
    
    --nav-bg: ${isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)'};
    --nav-border: ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(109, 40, 217, 0.1)'};
    --nav-text: ${isDark ? '#94a3b8' : '#64748b'};
    --nav-text-active: ${isDark ? '#ffffff' : '#581c87'};
    --glider-bg: ${isDark ? '#d8b4fe' : '#ddd6fe'};
  }

  ::view-transition-old(root), ::view-transition-new(root) { animation: none; mix-blend-mode: normal; }
  ::view-transition-new(root) { z-index: 9999; }

  @keyframes fadeInUp { 0% { opacity: 0; transform: translateY(40px); } 100% { opacity: 1; transform: translateY(0); } }
  @keyframes widthFull { from { width: 0%; } to { width: 100%; } }
  @keyframes liquidFlow { 0% { background-position: 100% 0; } 100% { background-position: -100% 0; } }
  @keyframes exitLoading { from { opacity: 1; transform: scale(1); filter: blur(0px); } to { opacity: 0; transform: scale(1.1); filter: blur(20px); } }
  @keyframes enterContent { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
  @keyframes slideFromBottom { from { opacity: 0; transform: translateY(100%); } to { opacity: 1; transform: translateY(0); } }
  @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }

  .animate-shake { animation: shake 0.3s ease-in-out; }

  .cursor-blink { display: inline-block; width: 3px; height: 1em; background-color: var(--accent); margin-left: 4px; vertical-align: middle; animation: blink 1s infinite; }
  .loading-letter { display: inline-block; opacity: 0; color: white; text-shadow: 0 0 10px rgba(255, 255, 255, 0.3); animation: fadeInUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
  
  .loading-bar-container { width: 300px; height: 12px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 9999px; overflow: hidden; margin-top: 3rem; position: relative; backdrop-filter: blur(10px); box-shadow: inset 0 2px 4px rgba(0,0,0,0.3); }
  .loading-bar { height: 100%; background: linear-gradient(90deg, #a855f7, #d8b4fe, #a855f7); background-size: 200% 100%; box-shadow: 0 0 20px rgba(168, 85, 247, 0.6); width: 0%; border-radius: 9999px; animation: widthFull 2.5s cubic-bezier(0.22, 1, 0.36, 1) forwards, liquidFlow 2s linear infinite; animation-delay: 0.2s; position: relative; }
  .loading-bar::after { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 50%; background: linear-gradient(to bottom, rgba(255,255,255,0.4), transparent); border-radius: 9999px; }

  .loading-exit { animation: exitLoading 1s cubic-bezier(0.7, 0, 0.3, 1) forwards; pointer-events: none; }
  .site-content-enter { animation: enterContent 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
  .fixed-ui-enter { animation: fadeInUp 1.5s ease-out forwards; }
  .legal-panel-enter { animation: slideFromBottom 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }

  .glass-container { position: relative; display: flex; justify-content: center; align-items: center; padding: 40px 0; flex-wrap: wrap; gap: 20px; }
  .glass-container .glass { position: relative; width: 140px; height: 180px; background: var(--glass-bg); border: 1px solid var(--glass-border); box-shadow: var(--glass-shadow); display: flex; justify-content: center; align-items: center; transition: 0.5s; border-radius: 16px; margin: 0 -20px; backdrop-filter: blur(10px); transform: rotate(calc(var(--r) * 1deg)); cursor: pointer; }
  .glass-container:hover .glass { transform: rotate(0deg); margin: 0 10px; border-color: var(--accent); background: var(--glass-highlight); }
  .glass-container .glass::before { content: attr(data-text); position: absolute; bottom: 0; width: 100%; height: 40px; background: var(--glass-highlight); display: flex; justify-content: center; align-items: center; color: var(--text-primary); font-family: monospace; font-weight: bold; font-size: 0.8rem; letter-spacing: 1px; border-bottom-left-radius: 16px; border-bottom-right-radius: 16px; }
  .glass-container .glass svg { font-size: 3em; color: var(--text-primary); filter: drop-shadow(0 0 5px rgba(216, 180, 254, 0.1)); transition: 0.3s; }
  .glass-container .glass:hover svg { transform: scale(1.1); filter: drop-shadow(0 0 15px rgba(216, 180, 254, 0.4)); color: var(--accent); }
  @media (max-width: 640px) { .glass-container .glass { margin: 0; transform: none; } .glass-container { gap: 15px; } }

  .nav-pill-wrapper { position: fixed; bottom: 2rem; left: 0; right: 0; margin-left: auto; margin-right: auto; z-index: 100; width: fit-content; max-width: 95vw; display: flex; justify-content: center; }
  .dock-container { display: flex; align-items: center; background: var(--nav-bg); border-radius: 24px; backdrop-filter: blur(40px); -webkit-backdrop-filter: blur(40px); border: 1px solid var(--nav-border); box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.1); padding: 6px 12px; height: 64px; transform: translate3d(0,0,0); -webkit-transform: translate3d(0,0,0); }
  
  .nav-section { position: relative; display: flex; align-items: center; height: 100%; }
  .nav-section input[type="radio"] { display: none; }
  .nav-section label { display: flex; align-items: center; justify-content: center; width: 50px; height: 100%; cursor: pointer; color: var(--nav-text); position: relative; z-index: 2; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
  .nav-section label:hover { color: ${isDark ? 'white' : '#1e293b'}; transform: translateY(-2px); }
  .nav-section input:checked + label { color: var(--nav-text-active); }
  .glass-glider { position: absolute; top: 50%; transform: translateY(-50%); left: 0; width: 50px; height: 40px; border-radius: 12px; z-index: 1; transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1); background: var(--glider-bg); box-shadow: 0 0 15px rgba(216, 180, 254, 0.4); }
  #nav-home:checked ~ .glass-glider { transform: translate(0px, -50%); }
  #nav-sobre:checked ~ .glass-glider { transform: translate(50px, -50%); }
  #nav-portfolio:checked ~ .glass-glider { transform: translate(100px, -50%); }
  #nav-contato:checked ~ .glass-glider { transform: translate(150px, -50%); }

  .dock-separator { width: 1px; height: 24px; background-color: ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'}; margin: 0 12px; }
  .social-section { display: flex; align-items: center; gap: 8px; }
  .social-link { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 12px; color: var(--nav-text); transition: all 0.3s ease; }
  .social-link:hover { background-color: ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}; color: ${isDark ? 'white' : 'black'}; transform: translateY(-3px); }

  .neu-button { background-color: ${isDark ? '#1e293b' : '#e2e8f0'}; border-radius: 50px; box-shadow: ${isDark ? 'inset 4px 4px 10px #0f172a, inset -4px -4px 10px #334155' : 'inset 4px 4px 10px #cbd5e1, inset -4px -4px 10px #ffffff'}; color: ${isDark ? '#cbd5e1' : '#475569'}; cursor: pointer; font-size: 18px; padding: 15px 40px; transition: all 0.2s ease-in-out; border: 2px solid ${isDark ? '#334155' : '#cbd5e1'}; display: flex; align-items: center; justify-content: center; gap: 10px; font-weight: 600; }
  .neu-button:hover { box-shadow: ${isDark ? 'inset 2px 2px 5px #0f172a, inset -2px -2px 5px #334155' : 'inset 2px 2px 5px #cbd5e1, inset -2px -2px 5px #ffffff, 2px 2px 5px #cbd5e1, -2px -2px 5px #ffffff'}; transform: translateY(-2px); color: ${isDark ? '#fff' : '#1e293b'}; }
  .neu-button.purple-glass { background-color: ${isDark ? 'rgba(168, 85, 247, 0.15)' : 'rgba(124, 58, 237, 0.1)'}; backdrop-filter: blur(8px); color: ${isDark ? '#ffffff' : '#5b21b6'}; border: 2px solid ${isDark ? 'rgba(168, 85, 247, 0.3)' : 'rgba(124, 58, 237, 0.3)'}; box-shadow: ${isDark ? 'inset 4px 4px 10px rgba(0, 0, 0, 0.5), inset -4px -4px 10px rgba(255, 255, 255, 0.1)' : 'inset 4px 4px 10px rgba(124, 58, 237, 0.1), inset -4px -4px 10px rgba(255, 255, 255, 0.5), 0 10px 20px rgba(124, 58, 237, 0.15)'}; }
  .neu-button.purple-glass:hover { background-color: ${isDark ? 'rgba(168, 85, 247, 0.25)' : 'rgba(124, 58, 237, 0.2)'}; box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.3), inset -2px -2px 5px rgba(255, 255, 255, 0.2), 0 0 20px ${isDark ? 'rgba(168, 85, 247, 0.3)' : 'rgba(124, 58, 237, 0.3)'}; }

  .showcase-wrapper { display: flex; gap: 40px; height: 600px; position: relative; }
  .project-list { flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 15px; position: relative; }
  .project-glider { position: absolute; left: 0; width: 100%; background: var(--glass-highlight); border: 1px solid var(--glass-border); border-radius: 100px; transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1); z-index: 0; pointer-events: none; box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); }
  .project-item { font-size: 1.8rem; font-weight: 700; color: ${isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'}; cursor: default; position: relative; padding: 20px 30px; border-radius: 100px; transition: color 0.4s ease; background: transparent; display: flex; align-items: center; justify-content: space-between; z-index: 1; }
  .project-item.active { color: ${isDark ? '#fff' : '#1e293b'}; }
  .project-action-btn { width: 48px; height: 48px; border-radius: 50%; background: ${isDark ? '#d8b4fe' : '#8b5cf6'}; display: flex; align-items: center; justify-content: center; color: ${isDark ? '#1e293b' : '#fff'}; opacity: 0; transform: scale(0.8); transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); cursor: pointer; pointer-events: none; }
  .project-item.active .project-action-btn { opacity: 1; transform: scale(1); pointer-events: auto; }
  .project-action-btn:hover { transform: scale(1.1); box-shadow: 0 0 15px ${isDark ? 'rgba(216, 180, 254, 0.5)' : 'rgba(139, 92, 246, 0.5)'}; }
  .coming-soon-item { font-size: 1.2rem; font-weight: 500; color: ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}; cursor: not-allowed; display: flex; align-items: center; gap: 10px; padding: 20px 30px; }
  
  .project-preview { flex: 2.5; position: relative; border-radius: 32px; border: 1px solid var(--glass-border); background: var(--glass-bg); overflow: hidden; box-shadow: var(--glass-shadow); }
  .portal-frame-wrapper { position: absolute; inset: 0; width: 100%; height: 100%; transition: opacity 0.6s ease; display: flex; justify-content: center; align-items: center; background: ${isDark ? '#0f172a' : '#f8fafc'}; overflow: hidden; }
  .portal-frame-wrapper.active { opacity: 1; z-index: 20; }
  .portal-frame-wrapper.inactive { opacity: 0; z-index: 0; pointer-events: none; }
  .portal-iframe { position: absolute; top: 0; left: 0; width: 200%; height: 200%; border: none; transform: scale(0.5); transform-origin: top left; pointer-events: none; }
  .preview-image { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: top center; opacity: 0; transition: opacity 0.6s ease, transform 0.8s ease; transform: scale(1.1); }
  .preview-image.active { opacity: 1; transform: scale(1); }
  .noise-overlay { position: absolute; inset: 0; opacity: 0.05; background: url('https://grainy-gradients.vercel.app/noise.svg'); pointer-events: none; z-index: 30; }
  .preview-info-minimal { position: absolute; bottom: 0; left: 0; width: 100%; padding: 40px; background: linear-gradient(to top, ${isDark ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.95)'}, transparent); transform: translateY(20px); opacity: 0; transition: all 0.5s ease 0.2s; display: flex; flex-direction: column; gap: 10px; z-index: 40; }
  .preview-info-minimal.active { transform: translateY(0); opacity: 1; }

  @media (max-width: 768px) {
    .showcase-wrapper { flex-direction: column; height: auto; gap: 20px; }
    .project-preview { height: 45vh; min-height: 350px; width: 100%; flex: none; }
    .project-list { flex: none; width: 100%; margin-bottom: 10px; }
    .project-item { font-size: 1.4rem; padding: 15px 20px; }
    .project-action-btn { width: 36px; height: 36px; } 
    .project-action-btn svg { width: 18px; height: 18px; }
  }
`;

// --- COMPONENTS ---
const LoadingScreen = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => { setIsExiting(true); setTimeout(onComplete, 1000); }, 3200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[9999] bg-slate-950 flex flex-col items-center justify-center ${isExiting ? 'loading-exit' : ''}`}>
       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>
       <div className="text-center relative z-10">
         <h1 className="text-6xl md:text-8xl font-semibold text-white mb-6 flex justify-center gap-2 md:gap-4 tracking-normal">
           {"Bem Vindo!".split('').map((char, i) => (
             <span key={i} className="loading-letter" style={{ animationDelay: `${i * 0.1}s` }}>{char}</span>
           ))}
         </h1>
         <div className="loading-bar-container mx-auto"><div className="loading-bar"></div></div>
       </div>
    </div>
  );
};

const TypewriterTitle = ({ isDark, phrases, highlightClassName }) => {
    const [index, setIndex] = useState(0);
    const [text, setText] = useState("");
    const [deleting, setDeleting] = useState(false);
    const [paused, setPaused] = useState(false);
    const fullText = phrases[index].replace('|', '');
    const splitIndex = phrases[index].indexOf('|');
    
    useEffect(() => {
        if (paused) {
            const timeout = setTimeout(() => { setPaused(false); setDeleting(true); }, 2000);
            return () => clearTimeout(timeout);
        }
        const timeout = setTimeout(() => {
            if (!deleting) {
                if (text.length < fullText.length) setText(fullText.slice(0, text.length + 1));
                else setPaused(true);
            } else {
                if (text.length > 0) setText(fullText.slice(0, text.length - 1));
                else { setDeleting(false); setIndex((prev) => (prev + 1) % phrases.length); }
            }
        }, deleting ? 40 : 80);
        return () => clearTimeout(timeout);
    }, [text, deleting, paused, phrases, fullText]);

    const part1 = splitIndex !== -1 ? fullText.slice(0, splitIndex) : fullText;
    const part2 = splitIndex !== -1 ? fullText.slice(splitIndex) : "";
    const showPart2 = text.length > part1.length;
    
    // CORREÇÃO: Use a classe passada ou o padrão
    const highlightColor = highlightClassName ? highlightClassName : (isDark ? "text-purple-300" : "text-violet-700");
    
    return <>{text.slice(0, part1.length)}<br className="hidden md:block"/> <span className={highlightColor}>{showPart2 ? text.slice(part1.length) : ""}</span><span className="cursor-blink"></span></>;
};

const Reveal = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => ref.current && observer.unobserve(ref.current);
  }, []);
  return <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`transition-all duration-1000 ease-out transform ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>{children}</div>;
};

const ThemeToggle = ({ isDark, toggle }) => (
    <div className="fixed top-6 right-6 z-[60] fixed-ui-enter">
        <label htmlFor="theme-checkbox" onClick={toggle} className={`relative h-[3em] w-[3em] rounded-[1.2em] cursor-pointer block transition-colors duration-300 ${isDark ? 'bg-[#2e1065] shadow-[inset_-1px_1px_4px_0px_#581c87,inset_1px_-1px_4px_0px_#000000,-1px_2px_4px_0px_#000000]' : 'bg-[#f3e8ff] shadow-[inset_-1px_1px_4px_0px_#ffffff,inset_1px_-1px_4px_0px_#d8b4fe,-1px_2px_4px_0px_#d8b4fe]'}`}>
        <input type="checkbox" id="theme-checkbox" className="peer appearance-none" checked={!isDark} readOnly />
        <span className={`absolute left-1/2 top-1/2 h-[2em] w-[2em] -translate-x-1/2 -translate-y-1/2 rounded-[0.8em] duration-[200ms] flex items-center justify-center ${isDark ? 'bg-[#4c1d95] shadow-[inset_-1px_1px_4px_0px_#581c87,inset_1px_-1px_4px_0px_#000000,-1px_1px_2px_0px_#000000]' : 'bg-[#faf5ff] shadow-[inset_-1px_1px_4px_0px_#ffffff,inset_1px_-1px_4px_0px_#e9d5ff,-1px_1px_2px_0px_#d8b4fe]'}`}></span>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-200" style={{ opacity: isDark ? 1 : 0 }}><Moon size={20} className="text-purple-300" fill="currentColor" /></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-200" style={{ opacity: isDark ? 0 : 1 }}><Sun size={20} className="text-amber-500" fill="currentColor" /></div>
        </label>
    </div>
);

const ProfileCard = ({ isDark }) => {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isPressed, setIsPressed] = useState(false); // New state for subtle interaction
  
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setRotate({ x: ((e.clientY - rect.top - rect.height / 2) / rect.height) * -10, y: ((e.clientX - rect.left - rect.width / 2) / rect.width) * 10 });
  };

  const handleEasterEgg = (e) => {
      e.stopPropagation();
      setIsPressed(true);
      setTimeout(() => setIsPressed(false), 200); // Quick press effect
  };

  return (
    <div className="perspective-1000 w-full h-full flex items-center justify-center p-4">
      <div 
        ref={cardRef} 
        onMouseMove={handleMouseMove} 
        onMouseLeave={() => setRotate({ x: 0, y: 0 })} 
        onClick={handleEasterEgg} 
        style={{ 
            transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(${isPressed ? 0.95 : 1})`, 
            transition: 'transform 0.1s ease-out', 
            WebkitMaskImage: '-webkit-radial-gradient(white, black)', 
            borderRadius: '1.5rem' 
        }} 
        className={`relative w-[320px] h-[480px] rounded-3xl overflow-hidden shadow-2xl group cursor-pointer backface-hidden will-change-transform ${isPressed ? 'brightness-110' : ''} ${isDark ? 'bg-slate-900 ring-1 ring-slate-800' : 'bg-white ring-1 ring-slate-200'}`}
      >
        <div className="absolute inset-0 h-full w-full bg-slate-800">
            <img src="/img/Lucas.png" alt="Lucas Ortiz" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-transparent opacity-80"></div>
        </div>
        <div className="absolute top-8 left-0 right-0 p-6 text-white z-10 flex flex-col items-center text-center transform translate-z-20">
            <h2 className="text-3xl font-bold tracking-tight leading-none mb-2 drop-shadow-md text-white">Lucas Ortiz</h2>
            <p className="text-xs font-bold tracking-[0.2em] uppercase opacity-90 text-purple-300">Front-End Developer</p>
            <div className="flex items-center gap-1.5 px-3 py-1 mt-3 rounded-full backdrop-blur-md border shadow-sm bg-white/10 border-white/20">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_5px_rgba(74,222,128,0.8)]"></span><span className="text-[10px] font-bold tracking-wide text-white">OPEN TO WORK</span>
            </div>
        </div>
        <div className="absolute bottom-6 left-6 right-6 z-20 transform translate-z-30">
            <div className="py-3 px-4 rounded-xl backdrop-blur-md border shadow-sm flex flex-col items-center justify-center text-center transition-transform duration-300 group-hover:-translate-y-1 bg-white/10 border-white/20">
                <span className="text-[10px] uppercase font-bold tracking-wider mb-0.5 text-white/80">Disponível para</span><span className="text-sm font-bold tracking-wide text-white">Freelance & Jobs</span>
            </div>
        </div>
      </div>
    </div>
  );
};

const ProjectShowcase = ({ isDark }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [gliderStyle, setGliderStyle] = useState({ top: 0, height: 0 });
    const itemsRef = useRef([]);

    useEffect(() => {
        if (itemsRef.current[activeIndex]) setGliderStyle({ top: itemsRef.current[activeIndex].offsetTop, height: itemsRef.current[activeIndex].offsetHeight });
    }, [activeIndex]);

    return (
        <div className="showcase-wrapper">
            <div className="project-list relative">
                <div className="project-glider" style={{ top: gliderStyle.top, height: gliderStyle.height }} />
                {PROJECTS.map((project, index) => (
                    <div key={project.id} ref={el => itemsRef.current[index] = el} className={`project-item ${activeIndex === index ? 'active' : ''}`} onMouseEnter={() => !project.comingSoon && setActiveIndex(index)}>
                        {project.comingSoon ? (
                            <div className="coming-soon-item w-full"><div className="flex items-center gap-3"><Lock size={20} /><span>{project.title}</span></div><span className="text-xs uppercase bg-white/10 px-2 py-0.5 rounded ml-2">Em Breve</span></div>
                        ) : (
                           <div className="flex items-center justify-between w-full relative z-10"><span className="text-xl font-bold">{project.title}</span><button className="project-action-btn" onClick={(e) => { e.stopPropagation(); window.open(project.link, '_blank'); }} title="Ver Projeto"><ArrowUpRight size={20} /></button></div>
                        )}
                    </div>
                ))}
            </div>
            <div className="project-preview">
                {PROJECTS.map((project, index) => !project.comingSoon && (
                    <div key={project.id} className={`absolute inset-0 w-full h-full transition-opacity duration-500 flex items-center justify-center overflow-hidden ${activeIndex === index ? 'opacity-100 z-20' : 'opacity-0 z-0'}`}>
                        {activeIndex === index && project.link && project.link !== '#' ? (
                            <div className="portal-frame-wrapper active"><iframe src={project.link} className="portal-iframe" title={project.title} loading="lazy" /><div className="absolute inset-0 z-10"></div></div>
                        ) : <img src={project.image} alt={project.title} className="preview-image active" />}
                         <div className={`preview-info-minimal active z-20 pointer-events-none`}><h3 className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{project.title}</h3><div className="flex gap-2 mt-2">{project.tech.map(t => (<span key={t} className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-xs font-bold text-white">{t}</span>))}</div></div>
                    </div>
                ))}
                <div className="noise-overlay z-30"></div>
            </div>
        </div>
    );
};

// ==================================================================================
// --- APP PRINCIPAL ---
// ==================================================================================
export default function OrtLabsPortfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [legalContent, setLegalContent] = useState(null); 
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formError, setFormError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 300;
      for (const section of ['home', 'sobre', 'portfolio', 'contato']) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) setActiveSection(section);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = async (e) => {
    e.preventDefault(); 
    if (!document.startViewTransition) { setIsDarkMode(!isDarkMode); return; }
    const endRadius = Math.hypot(Math.max(e.nativeEvent.clientX, window.innerWidth - e.nativeEvent.clientX), Math.max(e.nativeEvent.clientY, window.innerHeight - e.nativeEvent.clientY));
    const transition = document.startViewTransition(() => setIsDarkMode(!isDarkMode));
    await transition.ready;
    document.documentElement.animate({ clipPath: [`circle(0px at ${e.nativeEvent.clientX}px ${e.nativeEvent.clientY}px)`, `circle(${endRadius}px at ${e.nativeEvent.clientX}px ${e.nativeEvent.clientY}px)`] }, { duration: 500, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)' });
  };

  const scrollTo = (id) => { setActiveSection(id); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formError) setFormError(false); // Limpa o erro ao digitar
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
        setFormError(true);
        // Pequena vibração ou feedback visual
        const formBtn = document.getElementById('submit-btn');
        if(formBtn) {
            formBtn.classList.add('animate-shake');
            setTimeout(() => formBtn.classList.remove('animate-shake'), 300);
        }
        return;
    }
    // Lógica de envio aqui (console log por enquanto)
    console.log("Enviando...", formData);
    alert("Mensagem enviada com sucesso! (Simulação)");
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className={`min-h-screen font-sans overflow-x-hidden pb-32 transition-colors duration-500 ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <style>{getStyles(isDarkMode)}</style>
      
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {!isLoading && (
        <>
            <div className="fixed inset-0 z-[-1] site-content-enter"><div className={`absolute inset-0 ${isDarkMode ? 'bg-slate-950' : 'bg-slate-50'}`}><div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 ${isDarkMode ? 'bg-purple-900' : 'bg-purple-200'}`}></div><div className={`absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 ${isDarkMode ? 'bg-indigo-900' : 'bg-indigo-200'}`}></div></div></div>
            <ThemeToggle isDark={isDarkMode} toggle={toggleTheme} />
            <div className="fixed top-6 left-6 z-50 fixed-ui-enter"><div className="flex items-center gap-2 cursor-pointer group" onClick={() => scrollTo('home')}><div className={`w-10 h-10 backdrop-blur-md rounded-full flex items-center justify-center border transition-all ${isDarkMode ? 'bg-slate-800/50 border-slate-700 group-hover:border-purple-300' : 'bg-white/80 border-slate-200 group-hover:border-purple-500 shadow-sm'}`}><Layers className={`transition-colors ${isDarkMode ? 'text-purple-300 group-hover:text-purple-200' : 'text-violet-700 group-hover:text-violet-900'}`} size={20} /></div><span className={`text-xl font-bold tracking-tight transition-colors hidden sm:block ${isDarkMode ? 'text-slate-200 group-hover:text-white' : 'text-slate-800 group-hover:text-slate-900'}`}>ORT<span className={`${isDarkMode ? 'text-purple-300' : 'text-violet-700'}`}>LABS</span></span></div></div>

            <div className="nav-pill-wrapper fixed-ui-enter">
                <div className="dock-container">
                    <div className="nav-section">
                        {NAV_ITEMS.map(item => ( <React.Fragment key={item.id}><input type="radio" name="nav" id={`nav-${item.id}`} checked={activeSection === item.id} onChange={() => scrollTo(item.id)} /><label htmlFor={`nav-${item.id}`} title={item.label}><item.icon size={22} /></label></React.Fragment> ))}
                        <div className="glass-glider" />
                    </div>
                    <div className="dock-separator"></div>
                    <div className="social-section">{SOCIAL_LINKS.map(s => (<a key={s.id} href={s.link} target="_blank" rel="noopener noreferrer" className="social-link" title={s.label}><s.icon size={20} /></a>))}</div>
                </div>
            </div>

            <div className="site-content-enter">
                {/* HERO SECTION - Grid Assimétrico para Mobile/Desktop */}
                <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 md:pt-48 pb-12 md:pb-20"> {/* Reduzi pt e pb para mobile */}
                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>

                        {/* Gap reduzido para mobile: gap-6 em vez de gap-8 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center relative z-10">
                            
                            {/* Bloco de Texto (Ordem 1 no Mobile, Col 1 Row 1 no Desktop) */}
                            <div className="text-center md:text-left order-1 md:col-start-1 md:row-start-1">
                                <Reveal>
                                    <div className={`inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border backdrop-blur-sm ${isDarkMode ? 'border-purple-300/20 bg-purple-400/5' : 'border-purple-200 bg-white/50'}`}>
                                        <span className={`w-2 h-2 rounded-full animate-pulse ${isDarkMode ? 'bg-purple-300' : 'bg-violet-700'}`}></span>
                                        <span className={`text-xs font-bold tracking-wider ${isDarkMode ? 'text-purple-300' : 'text-violet-700'}`}>ORTLABS FRONT-END</span>
                                    </div>
                                </Reveal>
                                <Reveal delay={200}>
                                    {/* min-h-[3.2em] garante espaço para 2 linhas de texto, evitando o "pulo" */}
                                    <h1 className={`text-3xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight min-h-[3.2em] md:min-h-[2.5em] ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                                        <TypewriterTitle isDark={isDarkMode} phrases={["Transformando ideias em | experiências digitais", "Tem um projeto? | Vamos trabalhar?"]} />
                                    </h1>
                                </Reveal>
                                <Reveal delay={400}>
                                    <p className={`mt-4 text-xl mb-4 max-w-lg mx-auto md:mx-0 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                        Me chamo Lucas Ortiz e sou especialista em criar designs e experiências web em HTML, JavaScript e React. Venha transformar sua ideia em realidade.
                                    </p>
                                </Reveal>
                            </div>

                            {/* Bloco do Card (Ordem 2 no Mobile, Col 2 Row 1-2 no Desktop) */}
                            {/* Padding reduzido no container do card */}
                            <div className="order-2 md:col-start-2 md:row-start-1 md:row-span-2 flex justify-center perspective-container py-2 md:py-0">
                                <Reveal delay={300}><ProfileCard isDark={isDarkMode} /></Reveal>
                            </div>

                            {/* Bloco de Botões (Ordem 3 no Mobile, Col 1 Row 2 no Desktop) */}
                            <div className="order-3 md:col-start-1 md:row-start-2 flex flex-col sm:flex-row gap-6 justify-center md:justify-start items-center">
                                <Reveal delay={600}>
                                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                        <button onClick={() => scrollTo('portfolio')} className="neu-button purple-glass w-full sm:w-auto">Ver Projetos</button>
                                        <button onClick={() => scrollTo('contato')} className="neu-button w-full sm:w-auto">Fale Comigo</button>
                                    </div>
                                </Reveal>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="sobre" className={`py-24 relative border-t overflow-hidden ${isDarkMode ? 'border-slate-900' : 'border-slate-100'}`}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-start"> 
                        {/* COLUNA ESQUERDA: VISUAL + STACK TÉCNICA */}
                        <div className="order-2 lg:order-1 flex flex-col gap-10">
                            <Reveal>
                                <div className="glass-container py-10">
                                    <div data-text="HTML / CSS" style={{ '--r': -15 }} className="glass group select-none"><Braces size={48} strokeWidth={1.5} /></div>
                                    <div data-text="JavaScript" style={{ '--r': 5 }} className="glass group select-none"><Cpu size={48} strokeWidth={1.5} /></div>
                                    <div data-text="React / Next" style={{ '--r': 25 }} className="glass group select-none"><Layers size={48} strokeWidth={1.5} /></div>
                                </div>
                            </Reveal>
                            
                            {/* LINGUAGENS (Movia para a esquerda) */}
                            <Reveal delay={200}>
                                <div><h3 className={`text-sm font-bold uppercase tracking-widest mb-4 flex items-center justify-center lg:justify-start gap-2 select-none ${isDarkMode ? 'text-purple-300' : 'text-violet-700'}`}><Code size={16} /> Linguagens</h3><div className="flex flex-wrap gap-3 justify-center lg:justify-start select-none">{['JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3 / SASS'].map((item) => (<div key={item} className={`px-4 py-2 rounded-lg border text-sm font-semibold transition-all hover:-translate-y-1 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300 hover:border-purple-500 hover:text-white' : 'bg-white border-slate-200 text-slate-600 hover:border-violet-500 hover:text-violet-700 shadow-sm'}`}>{item}</div>))}</div></div>
                            </Reveal>
                            
                            {/* FRAMEWORKS (Movia para a esquerda) */}
                             <Reveal delay={300}>
                                <div><h3 className={`text-sm font-bold uppercase tracking-widest mb-4 flex items-center justify-center lg:justify-start gap-2 select-none ${isDarkMode ? 'text-purple-300' : 'text-violet-700'}`}><Layers size={16} /> Frameworks & Libs</h3><div className="flex flex-wrap gap-3 justify-center lg:justify-start select-none">{[{ name: 'React.js', desc: 'Core' }, { name: 'Next.js', desc: 'Fullstack/SEO' }, { name: 'Tailwind CSS', desc: 'Estilização' }, { name: 'Node.js', desc: 'Backend Basics' }, { name: 'Vite', desc: 'Build Tool' }].map((tech) => (<div key={tech.name} className={`group flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all hover:-translate-y-1 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white hover:bg-purple-900/30 hover:border-purple-500' : 'bg-white border-slate-200 text-slate-800 hover:bg-violet-50 hover:border-violet-500 shadow-sm'}`}><span>{tech.name}</span><span className={`text-[10px] uppercase px-1.5 py-0.5 rounded opacity-60 group-hover:opacity-100 transition-opacity ${isDarkMode ? 'bg-slate-700 text-purple-200' : 'bg-slate-100 text-violet-700'}`}>{tech.desc}</span></div>))}</div></div>
                            </Reveal>
                        </div>

                        {/* COLUNA DIREITA: NARRATIVA + CERTIFICAÇÕES */}
                        <div className="order-1 lg:order-2">
                        <Reveal delay={200}>
                            <div className={`inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border ${isDarkMode ? 'border-purple-300/30 bg-purple-400/5' : 'border-violet-200 bg-violet-50'}`}><Code size={14} className={`${isDarkMode ? 'text-purple-300' : 'text-violet-700'}`} /><span className={`text-xs font-bold tracking-wider ${isDarkMode ? 'text-purple-300' : 'text-violet-700'}`}>QUEM SOU</span></div>
                            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}><TypewriterTitle isDark={isDarkMode} phrases={["Lucas Ortiz | Developer", "A Missão da | OrtLabs"]} /></h2>
                            <div className={`space-y-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                <p className="text-lg leading-relaxed">Sou <strong className={isDarkMode ? 'text-slate-200' : 'text-slate-800'}>Lucas Ortiz</strong>, 25 anos, desenvolvedor Front-End e estudante de Gestão de TI. A OrtLabs é meu estúdio de criação digital focado em resultados.</p>
                                <div className="my-6">
                                    <h3 className={`text-sm font-bold uppercase tracking-widest mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>O que eu faço por você:</h3>
                                    <ul className="space-y-3">
                                        <li className="flex gap-3"><span className={`mt-1.5 min-w-[6px] h-1.5 rounded-full ${isDarkMode ? 'bg-purple-400' : 'bg-violet-600'}`}></span><span><strong className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>Landing Pages de Alta Conversão:</strong> Sites rápidos desenhados para transformar visitantes em clientes.</span></li>
                                        <li className="flex gap-3"><span className={`mt-1.5 min-w-[6px] h-1.5 rounded-full ${isDarkMode ? 'bg-purple-400' : 'bg-violet-600'}`}></span><span><strong className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>Dashboards & Sistemas:</strong> Painéis administrativos intuitivos para organizar a gestão do seu negócio.</span></li>
                                        <li className="flex gap-3"><span className={`mt-1.5 min-w-[6px] h-1.5 rounded-full ${isDarkMode ? 'bg-purple-400' : 'bg-violet-600'}`}></span><span><strong className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>Otimização de Performance:</strong> Transformo sites lentos em experiências instantâneas que o Google adora.</span></li>
                                    </ul>
                                </div>
                                <p className="text-lg leading-relaxed">Meu objetivo é tirar a complexidade técnica da frente e entregar soluções que apenas funcionam, elevam sua marca e geram valor real.</p>
                            </div>
                            
                            {/* CERTIFICAÇÕES (Movia para a direita) */}
                            <div className="mt-10">
                                <div><h3 className={`text-sm font-bold uppercase tracking-widest mb-4 flex items-center justify-center lg:justify-start gap-2 select-none ${isDarkMode ? 'text-purple-300' : 'text-violet-700'}`}><Award size={16} /> Certificações</h3>
                                    <div className="flex flex-wrap gap-2 justify-center lg:justify-start select-none">{['Desenvolvimento Web Completo', 'Algoritmos e Lógica', 'React: The Complete Guide', 'UX/UI Fundamentals'].map((cert) => (<div key={cert} className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-bold transition-all hover:scale-105 cursor-default ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white' : 'bg-white border-slate-200 text-slate-600 hover:shadow-sm'}`}><span>{cert}</span></div>))}</div>
                                </div>
                            </div>
                        </Reveal>
                        </div>
                    </div>
                    </div>
                </section>

                <section id="portfolio" className={`py-24 border-t ${isDarkMode ? 'border-slate-900' : 'border-slate-200'}`}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Reveal><div className="mb-16"><span className={`font-bold tracking-widest text-sm uppercase ${isDarkMode ? 'text-purple-300' : 'text-violet-700'}`}>OrtLabs Work</span><h2 className={`text-3xl md:text-5xl font-bold mt-2 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>Projetos Selecionados</h2></div></Reveal>
                    <ProjectShowcase isDark={isDarkMode} />
                    </div>
                </section>

                <section id="contato" className={`pt-32 pb-8 relative overflow-hidden border-t ${isDarkMode ? 'border-slate-900' : 'border-slate-200'}`}>
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-24">
                    <Reveal>
                        <div className={`rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row ${isDarkMode ? 'bg-slate-900/50 border border-slate-800' : 'bg-white border border-slate-200 shadow-xl'}`}>
                            <div className={`md:w-2/5 p-10 md:p-12 flex flex-col justify-between relative overflow-hidden ${isDarkMode ? 'bg-purple-900/20' : 'bg-violet-900/80'}`}> {/* Violeta escuro sólido no light mode */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/30 blur-[80px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
                                <div className="relative z-10">
                                    <h2 className={`text-3xl md:text-4xl font-bold mb-6 leading-tight min-h-[3.2em] md:min-h-[2.5em] ${isDarkMode ? 'text-white' : 'text-white'}`}>
                                        {/* CORREÇÃO: Força a cor roxa clara (purple-300) no destaque, mesmo no modo claro, pois o fundo do card é sempre roxo escuro */}
                                        <TypewriterTitle isDark={isDarkMode} phrases={["Vamos tirar seu | Projeto do Papel?", "Tem uma ideia? | Vamos trabalhar?"]} highlightClassName="text-purple-300" />
                                    </h2>
                                    <p className={`text-lg mb-8 ${isDarkMode ? 'text-slate-300' : 'text-purple-100'}`}>Tem um desafio ambicioso? Vamos conversar e transformar isso em realidade.</p>
                                </div>
                                <div className="space-y-6 relative z-10">
                                     <a href="mailto:ortlabs@gmail.com" className={`flex items-center gap-4 group cursor-pointer`}>
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${isDarkMode ? 'bg-white/10 text-white' : 'bg-white/20 text-white'}`}><Mail size={20} /></div>
                                        <div><p className={`text-xs uppercase tracking-wider font-bold ${isDarkMode ? 'text-slate-400' : 'text-purple-200'}`}>Email</p><p className={`font-medium ${isDarkMode ? 'text-white' : 'text-white'}`}>ortlabs@gmail.com</p></div>
                                     </a>
                                     <a href="https://wa.me/5511994082371" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-4 group cursor-pointer`}>
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${isDarkMode ? 'bg-white/10 text-white' : 'bg-white/20 text-white'}`}><Smartphone size={20} /></div>
                                        <div><p className={`text-xs uppercase tracking-wider font-bold ${isDarkMode ? 'text-slate-400' : 'text-purple-200'}`}>Whatsapp</p><p className={`font-medium ${isDarkMode ? 'text-white' : 'text-white'}`}>(11) 99408-2371</p></div>
                                     </a>
                                </div>
                                {/* Copyright removido daqui conforme solicitado */}
                            </div>
                            <div className={`md:w-3/5 p-10 md:p-12 ${isDarkMode ? 'bg-transparent' : 'bg-white'}`}>
                                <form className="space-y-6" onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="col-span-2 md:col-span-1">
                                            <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Nome</label>
                                            <input name="name" value={formData.name} onChange={handleInputChange} type="text" placeholder="Seu nome" className={`w-full bg-transparent border-b-2 px-0 py-2 focus:outline-none transition-all placeholder:text-slate-600 ${formError && !formData.name ? 'border-red-500 placeholder:text-red-400' : isDarkMode ? 'border-slate-700 text-white focus:border-purple-500' : 'border-slate-200 text-slate-800 focus:border-violet-600'}`} />
                                        </div>
                                        <div className="col-span-2 md:col-span-1">
                                            <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Email</label>
                                            <input name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="seu@email.com" className={`w-full bg-transparent border-b-2 px-0 py-2 focus:outline-none transition-all placeholder:text-slate-600 ${formError && !formData.email ? 'border-red-500 placeholder:text-red-400' : isDarkMode ? 'border-slate-700 text-white focus:border-purple-500' : 'border-slate-200 text-slate-800 focus:border-violet-600'}`} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Mensagem</label>
                                        <textarea name="message" value={formData.message} onChange={handleInputChange} rows="4" placeholder="Conte sobre seu projeto..." className={`w-full bg-transparent border-b-2 px-0 py-2 focus:outline-none transition-all resize-none placeholder:text-slate-600 ${formError && !formData.message ? 'border-red-500 placeholder:text-red-400' : isDarkMode ? 'border-slate-700 text-white focus:border-purple-500' : 'border-slate-200 text-slate-800 focus:border-violet-600'}`}></textarea>
                                    </div>
                                    {formError && <div className="text-red-500 text-sm flex items-center gap-2"><AlertCircle size={16} /> Por favor, preencha todos os campos.</div>}
                                    <div className="pt-4">
                                        <button id="submit-btn" type="submit" className={`group w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 ${isDarkMode ? 'bg-purple-600 text-white hover:bg-purple-500' : 'bg-violet-700 text-white hover:bg-violet-800'}`}>
                                            Enviar Mensagem <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Reveal>
                    </div>

                    <div className="relative pt-12 pb-8">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
                                <div className="text-center md:text-left"><div className={`flex items-center justify-center md:justify-start gap-2 mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}><div className={`p-1.5 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-slate-200'}`}><Layers size={20} className="text-purple-500" /></div><span className="text-lg font-bold tracking-tight">ORT<span className="text-purple-500">LABS</span></span></div><p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Transformando ideias em experiências digitais.</p></div>
                                <div className="flex gap-4">{SOCIAL_LINKS.map(s => (<a key={s.id} href={s.link} target="_blank" rel="noopener noreferrer" className={`p-2 rounded-full transition-all ${isDarkMode ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-slate-200 hover:bg-slate-300 text-slate-800'}`}><s.icon size={18} /></a>))}</div>
                            </div>
                            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                                <p className={`${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>&copy; {new Date().getFullYear()} OrtLabs. Todos os direitos reservados.</p>
                                <div className="flex items-center gap-6">
                                    {legalContent && (<div className={`absolute bottom-20 left-0 w-full p-6 ${isDarkMode ? 'bg-slate-900 border-t border-slate-800' : 'bg-white border-t border-slate-200'} shadow-2xl z-50 legal-panel-enter rounded-t-3xl`}><div className="max-w-4xl mx-auto relative"><button onClick={() => setLegalContent(null)} className="absolute top-0 right-0 p-2 opacity-50 hover:opacity-100"><X size={20}/></button><h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{legalContent === 'privacy' ? 'Política de Privacidade' : 'Termos de Uso'}</h3><p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{legalContent === 'privacy' ? 'Sua privacidade é nossa prioridade. Coletamos apenas os dados essenciais (nome e email) para responder ao seu contato. Não compartilhamos suas informações com terceiros.' : 'Todo o conteúdo deste site é propriedade intelectual da OrtLabs. O uso não autorizado de imagens ou código é proibido.'}</p></div></div>)}
                                    <button onClick={() => setLegalContent(legalContent === 'privacy' ? null : 'privacy')} className={`hover:text-purple-500 transition-colors ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Privacidade</button>
                                    <button onClick={() => setLegalContent(legalContent === 'terms' ? null : 'terms')} className={`hover:text-purple-500 transition-colors ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Termos</button>
                                    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all ${isDarkMode ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-slate-200 hover:bg-slate-300 text-slate-800'}`}>Topo <ChevronUp size={12} /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
      )}
    </div>
  );
}