import React from 'react';
import { motion } from 'framer-motion';
import { useLenis } from '../context/LenisContext';

const Hero = () => {
  const lenis = useLenis();

  const scrollTo = (id) => {
    if (lenis) {
      lenis.scrollTo(`#${id}`, { offset: -80, duration: 1.4, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1760246964044-1384f71665b9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNzl8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb3Jwb3JhdGUlMjBvZmZpY2UlMjBleHRlcmlvciUyMGFyY2hpdGVjdHVyZXxlbnwwfHx8fDE3NzYxOTIxOTR8MA&ixlib=rb-4.1.0&q=85"
          alt="Modern corporate building exterior"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-slate-900/65" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-5 sm:px-8 max-w-4xl mx-auto flex flex-col items-center pt-24 sm:pt-28 pb-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-slate-300 font-semibold mb-5"
        >
          Innovation Across Industries
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl xs:text-5xl sm:text-7xl lg:text-8xl tracking-tighter font-black text-white mb-2 leading-none"
        >
          KAPIT INDIA
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xl sm:text-3xl lg:text-5xl tracking-tight font-light text-slate-200 mb-7 sm:mb-8"
        >
          PRIVATE LIMITED
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed font-plex max-w-xl sm:max-w-2xl mx-auto mb-8 sm:mb-10"
        >
          From kiosk manufacturing and IT solutions to agarbatti production and hackathon organisation — we drive growth across diverse sectors from Bangalore, India.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col xs:flex-row gap-3 sm:gap-4 w-full xs:w-auto"
        >
          <button
            onClick={() => scrollTo('services')}
            className="w-full xs:w-auto px-7 sm:px-8 py-3.5 bg-blue-900/90 backdrop-blur-sm hover:bg-blue-800 text-white font-semibold rounded-sm transition-colors uppercase tracking-wider text-sm"
          >
            Our Services
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="w-full xs:w-auto px-7 sm:px-8 py-3.5 border border-slate-300/50 backdrop-blur-sm hover:bg-white/10 text-white font-semibold rounded-sm transition-colors uppercase tracking-wider text-sm"
          >
            Get In Touch
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest text-slate-400">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-slate-400 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
};

export default Hero;



