import React, { useState, useEffect } from 'react';
import { useLenis } from '../context/LenisContext';
import { List, X } from '@phosphor-icons/react';

const NAV_LINKS = [
  { label: 'Home',     id: 'hero' },
  { label: 'About',    id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Contact',  id: 'contact' },
];

const Header = () => {
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Tighten the header shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileOpen(false);
    if (lenis) {
      // Use Lenis for buttery-smooth animated scroll
      lenis.scrollTo(`#${id}`, { offset: -80, duration: 1.4, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      // Fallback if Lenis hasn't initialised yet
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-white/80 transition-all duration-300 ${
          scrolled ? 'py-3 border-b border-slate-200/70 shadow-md' : 'py-4 border-b border-slate-200/30 shadow-sm'
        }`}
      >
        <div className="container mx-auto px-6 sm:px-12 flex justify-between items-center">
          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-3 focus:outline-none"
            aria-label="Back to top"
          >
            <img
              src="https://customer-assets.emergentagent.com/job_d681ca81-3231-4823-8242-2aa95c411a0f/artifacts/uuwracsf_WhatsApp%20Image%202026-04-15%20at%2000.08.34.jpeg"
              alt="KAPIT INDIA Logo"
              className="h-10 w-10 object-contain"
            />
            <div className="flex flex-col">
              <span className="font-outfit font-bold text-lg leading-none tracking-tight text-slate-900">KAPIT INDIA</span>
              <span className="font-plex text-[10px] uppercase tracking-widest text-slate-500 font-semibold mt-1">Private Limited</span>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-8" aria-label="Primary navigation">
            {NAV_LINKS.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="relative text-sm font-semibold text-slate-600 hover:text-blue-900 transition-colors uppercase tracking-wider group"
              >
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-900 transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            className="md:hidden p-2 rounded-md text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setMobileOpen(false)}
          className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {/* Panel */}
        <nav
          className={`absolute top-0 right-0 h-full w-64 bg-white shadow-2xl flex flex-col pt-24 pb-8 px-8 gap-2 transition-transform duration-300 ease-in-out ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          aria-label="Mobile navigation"
        >
          {NAV_LINKS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-left text-base font-semibold text-slate-700 hover:text-blue-900 py-3 border-b border-slate-100 uppercase tracking-wider transition-colors"
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Header;
