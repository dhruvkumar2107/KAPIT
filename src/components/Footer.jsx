import React from 'react';
import { useLenis } from '../context/LenisContext';

const NAV_LINKS = [
  { label: 'Home',     id: 'hero' },
  { label: 'About Us', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Contact',  id: 'contact' },
];

const Footer = () => {
  const lenis = useLenis();

  const scrollTo = (id) => {
    if (lenis) {
      lenis.scrollTo(`#${id}`, { offset: -80, duration: 1.2 });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 sm:pt-20 pb-8 px-5 sm:px-12 lg:px-24 border-t border-slate-800">
      <div className="container mx-auto">
        {/* Main grid — stacks on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 mb-12">

          {/* Brand block */}
          <div className="sm:col-span-2 lg:col-span-5 flex flex-col gap-5 lg:pr-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-sm flex items-center justify-center p-1 shrink-0">
                <img
                  src="https://customer-assets.emergentagent.com/job_d681ca81-3231-4823-8242-2aa95c411a0f/artifacts/uuwracsf_WhatsApp%20Image%202026-04-15%20at%2000.08.34.jpeg"
                  alt="KAPIT INDIA Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-outfit font-bold text-lg leading-none tracking-tight text-white">KAPIT INDIA</span>
                <span className="font-plex text-[10px] uppercase tracking-widest text-slate-400 font-semibold mt-1">Private Limited</span>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
              Delivering innovative solutions across manufacturing, technology, and consumer goods from Bangalore, India.
            </p>

            <div className="bg-slate-800/60 border border-slate-700 rounded-sm px-4 py-3 inline-block">
              <p className="text-[10px] tracking-widest uppercase text-slate-500 font-semibold mb-1">Corporate Identification Number</p>
              <p className="font-outfit font-semibold text-slate-200 text-sm">U28290KA2026PTC215872</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-outfit font-semibold text-base sm:text-lg mb-5">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map(({ label, id }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    className="text-slate-400 hover:text-white transition-colors text-sm text-left"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4">
            <h4 className="text-white font-outfit font-semibold text-base sm:text-lg mb-5">Contact Details</h4>
            <address className="not-italic text-slate-400 flex flex-col gap-3 text-sm">
              <p className="leading-relaxed">
                No 710, 2nd Rd, 4th Main, BEML Layout,<br />
                Rajarajeshwari Nagar, Bangalore South,<br />
                Karnataka, India 560098
              </p>
              <a
                href="mailto:kapitindiapvtltd@gmail.com"
                className="hover:text-white transition-colors break-all"
              >
                kapitindiapvtltd@gmail.com
              </a>
              <div className="flex flex-col gap-1">
                <a href="tel:+916364680456" className="hover:text-white transition-colors">+91 6364680456</a>
                <a href="tel:+918861422587" className="hover:text-white transition-colors">+91 8861422587</a>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="text-slate-500 text-xs sm:text-sm">
            © 2026 KAPIT INDIA PRIVATE LIMITED. All rights reserved.
          </p>
          <div className="flex bg-black px-4 py-2 rounded-sm border border-slate-800 items-center gap-2 text-xs font-semibold text-white shrink-0">
            <svg fill="currentColor" viewBox="0 0 24 24" className="w-3.5 h-3.5">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
            Bank Verified Entity
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
