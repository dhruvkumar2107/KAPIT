import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import { LenisContext } from './context/LenisContext';

// ── Lightweight path/hash router ─────────────────────────────────────────────
function useRoute() {
  const [route, setRoute] = useState(() => {
    const p = window.location.pathname;
    const h = window.location.hash;
    return p === '/admin' || h === '#admin' ? 'admin' : 'main';
  });

  useEffect(() => {
    const onChange = () => {
      const p = window.location.pathname;
      const h = window.location.hash;
      setRoute(p === '/admin' || h === '#admin' ? 'admin' : 'main');
    };
    window.addEventListener('popstate', onChange);
    window.addEventListener('hashchange', onChange);
    return () => {
      window.removeEventListener('popstate', onChange);
      window.removeEventListener('hashchange', onChange);
    };
  }, []);

  return route;
}

// ── Seed demo data (only on first visit) ─────────────────────────────────────
function seedDemoData() {
  const KEY = 'kapit_inquiries';
  if (localStorage.getItem(KEY)) return;
  const demos = [
    {
      id: 'demo_1',
      name: 'Ramesh Kumar',
      email: 'ramesh.kumar@infrabuild.in',
      phone: '+91 9845012345',
      message: 'We are looking for engineering consultancy for our new manufacturing plant in Tumkur. Please share your capabilities and a tentative quote.',
      status: 'new',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'demo_2',
      name: 'Priya Nair',
      email: 'priya.nair@greenfields.co',
      phone: '+91 9611223344',
      message: 'Interested in your technology solutions for smart facility management. Can we schedule a call this week?',
      status: 'in_progress',
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'demo_3',
      name: 'Arjun Sharma',
      email: 'arjun@startupventures.io',
      phone: '',
      message: 'Hi, I came across KAPIT India and would like to explore a potential partnership. Please reach out at your earliest convenience.',
      status: 'resolved',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];
  localStorage.setItem(KEY, JSON.stringify(demos));
}

function App() {
  const route = useRoute();
  const lenisRef = useRef(null);
  const [lenisInstance, setLenisInstance] = useState(null);

  // Seed demo data once
  useEffect(() => { seedDemoData(); }, []);

  // Lenis smooth scroll — only active on main site
  useEffect(() => {
    if (route !== 'main') return;

    const lenis = new Lenis({
      lerp: 0.08,           // Lower = smoother/slower (0.05–0.15 is ideal)
      syncTouch: false,     // Let native momentum scrolling work on touch devices
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
    };
  }, [route]);

  if (route === 'admin') return <AdminPanel />;

  return (
    <LenisContext.Provider value={lenisInstance}>
      <div className="bg-background min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Hero />
          <About />
          <Services />
          <Contact />
        </main>
        <Footer />
      </div>
    </LenisContext.Provider>
  );
}

export default App;
